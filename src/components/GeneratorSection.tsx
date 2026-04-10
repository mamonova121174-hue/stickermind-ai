import { useState, useRef } from "react";
import { Upload, Sparkles, X, Check, Coins, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/components/TokenContext";
import PricingModal from "@/components/PricingModal";

// Импорты твоих демо-картинок (оставляем как было)
import demoPixar from "@/assets/demo-pixar-hello-v2.png";
import demoGta from "@/assets/demo-gta-like-v2.png";
import demoGhibli from "@/assets/demo-ghibli-think-v2.png";
import demoCyberpunk from "@/assets/demo-cyberpunk-cool-v2.png";
import demoLineart from "@/assets/demo-lineart-love-v2.png";

const styles = [
  { id: "pixar", name: "3D Pixar", img: demoPixar },
  { id: "gta", name: "GTA Style", img: demoGta },
  { id: "ghibli", name: "Miyazaki", img: demoGhibli },
  { id: "cyberpunk", name: "Cyberpunk", img: demoCyberpunk },
  { id: "lineart", name: "Line Art", img: demoLineart },
];

const reactions = [
  { emoji: "👋", label: "Привет" }, { emoji: "👌", label: "Окей" },
  { emoji: "👍", label: "Лайк" }, { emoji: "❤️", label: "Любовь" },
  { emoji: "🤦‍♂️", label: "Фейспалм" }, { emoji: "💻", label: "Работаю" },
  { emoji: "😤", label: "Злюсь" }, { emoji: "🧐", label: "Думаю" },
  { emoji: "💰", label: "Успех" }, { emoji: "🎉", label: "Ура!" },
  { emoji: "😴", label: "Сплю" }, { emoji: "😱", label: "Шок" },
  { emoji: "⚖️", label: "Закон" }, { emoji: "🚀", label: "Вперёд" },
  { emoji: "👋", label: "Пока" }
];

const GeneratorSection = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("pixar");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
 const { balance, useTokens: subtractTokens } = useTokens();

  // ДИНАМИЧЕСКАЯ ЦЕНА: 5 токенов за каждый выбранный эмодзи
  const PRICE_PER_ITEM = 5;
  const totalCost = selectedEmotions.length * PRICE_PER_ITEM;
  const canAfford = balance >= totalCost;

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev => 
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  const handleCreatePack = async (prompt: string) => {
    // Включаем индикатор загрузки на кнопке
    setLoading(true);
    try {
      // ШАГ А: Отправляем запрос на запуск генерации
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Ошибка при запуске генерации");

      // Получаем ID, который нам выдал наш новый api/generate.ts
      const predictionId = data.id;

      // ШАГ Б: Запускаем цикл "опроса" (polling)
      let status = "starting";
      let finalPrediction = null;

      // Цикл будет работать, пока статус не станет финальным
      while (status !== "succeeded" && status !== "failed" && status !== "canceled") {
        // Делаем паузу 2.5 секунды, чтобы не перегружать сервер запросами
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Проверяем статус через наш новый эндпоинт
        const statusResponse = await fetch(`/api/check-status?id=${predictionId}`);
        finalPrediction = await statusResponse.json();
        
        if (!statusResponse.ok) throw new Error("Ошибка при проверке статуса");
        
        status = finalPrediction.status;
        console.log("Текущий статус генерации:", status); 
      }

      // ШАГ В: Обработка результата
      if (status === "succeeded" && finalPrediction.output) {
        // finalPrediction.output — это массив. Берем первый элемент (URL картинки).
        const imageUrl = finalPrediction.output[0]; 
        setGeneratedImages([imageUrl]); 
      } else {
        throw new Error(`Генерация не удалась. Статус: ${status}`);
      }

    } catch (error: any) {
      console.error("Ошибка в процессе:", error);
      alert(`Произошла ошибка: ${error.message}`);
    } finally {
      // Выключаем индикатор загрузки в любом случае (успех или ошибка)
      setLoading(false);
    }
  };
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: selectedImage,
          prompt: selectedStyle,
        }),
      });

      const data = await response.json();

      if (data.output) {
        subtractTokens(totalCost);
        alert("Магия случилась! Стикер готов.");
      } else {
        alert("Нейросеть ответила, но картинку не прислала. Проверь баланс в Replicate.");
      }
    } catch (error) {
      alert("Ошибка связи с сервером. Но мы пытались!");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="generator" className="py-20 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <div className="bg-card/40 border border-border/50 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1.4fr] gap-12 mb-12 items-start text-left">
            
            {/* 1. ФОТО */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">1. Ваше фото</h3>
              <div 
                onClick={() => !imageUrl && fileInputRef.current?.click()}
                className={`aspect-square border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center transition-all cursor-pointer bg-background/50 ${
                  imageUrl ? "border-primary shadow-glow-sm" : "border-border hover:border-primary/50"
                }`}
              >
                {imageUrl ? (
                  <div className="relative w-full h-full p-4">
                    <img src={imageUrl} className="w-full h-full object-cover rounded-[32px] shadow-2xl" alt="Ваше фото" />
                    <button onClick={(e) => { e.stopPropagation(); setImageUrl(null); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-2 shadow-xl">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-8 opacity-40">
                    <Upload className="w-12 h-12 mx-auto mb-4" />
                    <p className="font-bold text-xs uppercase tracking-widest text-center">Загрузить фото</p>
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && setImageUrl(URL.createObjectURL(e.target.files[0]))} className="hidden" accept="image/*" />
            </div>

            {/* 2. СТИЛЬ */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">2. Выберите стиль</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                      selectedStyle === s.id ? "border-primary bg-primary/5" : "border-primary/10 opacity-70"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-xl overflow-hidden mb-2">
                      <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bold uppercase">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. ЭМОЦИИ */}
          <div className="space-y-6 pt-10 border-t border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-left">3. Выберите эмоции ({selectedEmotions.length})</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
              {reactions.map((r) => (
                <button
                  key={r.label}
                  onClick={() => toggleEmotion(r.label)}
                  className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                    selectedEmotions.includes(r.label) ? "border-primary bg-primary/10" : "border-border bg-background/30"
                  }`}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-[8px] mt-1 font-bold uppercase">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ФИНАЛЬНАЯ КНОПКА С УМНЫМ ЦЕННИКОМ */}
          <div className="mt-12 flex flex-col items-center">
            <Button 
              disabled={!imageUrl || selectedEmotions.length === 0 || isGenerating}
              onClick={handleCreatePack}
              className={`w-full h-24 text-2xl font-bold rounded-[32px] transition-all shadow-2xl ${
                canAfford && selectedEmotions.length > 0 ? "bg-primary text-white" : "bg-secondary text-muted-foreground"
              }`}
            >
              {isGenerating ? <Loader2 className="animate-spin mr-3" /> : <Sparkles className="mr-3" />}
              <div className="flex flex-col items-start text-left">
                <span>{isGenerating ? "НЕЙРОСЕТЬ РИСУЕТ..." : "СОЗДАТЬ СТИКЕРПАК"}</span>
                {!isGenerating && selectedEmotions.length > 0 && (
                  <span className="text-xs font-medium tracking-widest opacity-80 mt-1">
                    ИТОГО: {totalCost} 🪙 ({selectedEmotions.length} шт.)
                  </span>
                )}
              </div>
            </Button>

            {/* ИНДИКАТОР БАЛАНСА */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className={`flex items-center gap-2 px-6 py-2 rounded-full border ${
                !canAfford && selectedEmotions.length > 0 ? "border-red-500 bg-red-500/10 animate-pulse" : "border-white/10 bg-white/5"
              }`}>
                <Coins className={`w-4 h-4 ${!canAfford && selectedEmotions.length > 0 ? "text-red-500" : "text-yellow-500"}`} />
                <span className={`text-[11px] font-bold uppercase tracking-widest ${
                  !canAfford && selectedEmotions.length > 0 ? "text-red-500" : "text-muted-foreground"
                }`}>
                  {selectedEmotions.length > 0 && !canAfford 
                    ? `НЕ ХВАТАЕТ ${totalCost - balance} ТОКЕНОВ` 
                    : `ВАШ БАЛАНС: ${balance} 🪙`}
                </span>
              </div>
              
              {!canAfford && selectedEmotions.length > 0 && (
                <button onClick={() => setPricingOpen(true)} className="text-[10px] text-primary font-bold underline underline-offset-4 uppercase">
                  Пополнить баланс
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <PricingModal open={pricingOpen} onOpenChange={setPricingOpen} />
    </section>
  );
};

export default GeneratorSection;

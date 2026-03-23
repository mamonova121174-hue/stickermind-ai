import { useState, useRef } from "react";
import { Upload, Sparkles, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const styles = [
  { id: "pixar", name: "3D Pixar", emoji: "🎬" },
  { id: "gta", name: "GTA Style", emoji: "🚗" },
  { id: "ghibli", name: "Miyazaki", emoji: "🍃" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖" },
  { id: "lineart", name: "Line Art", emoji: "✏️" },
];

const reactions = [
  { emoji: "👋", label: "Привет" }, { emoji: "👌", label: "Окей" },
  { emoji: "👍", label: "Лайк" }, { emoji: "🫶", label: "Любовь" },
  { emoji: "🤦‍♂️", label: "Фейспалм" }, { emoji: "💻", label: "Работаю" },
  { emoji: "😤", label: "Злюсь" }, { emoji: "🤔", label: "Думаю" },
  { emoji: "💰", label: "Успех" }, { emoji: "🎉", label: "Ура!" },
  { emoji: "😴", label: "Сплю" }, { emoji: "😮", label: "Шок" },
  { emoji: "⚖️", label: "Закон" }, { emoji: "💪", label: "Вперёд" },
  { emoji: "🙋", label: "Пока" }
];

const GeneratorSection = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("pixar");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev => prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]);
  };

  return (
    <section id="generator" className="py-12 px-4 scroll-mt-20">
      <div className="container max-w-5xl bg-card border border-border/50 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
        
        {/* БЛОК: ФОТО (СЛЕВА) И СТИЛЬ (СПРАВА) */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,1.4fr] gap-10 mb-12 items-start">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">1. Загрузите фото</h3>
            <div 
              onClick={() => !imageUrl && fileInputRef.current?.click()}
              className={`aspect-square border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center transition-all cursor-pointer bg-background/40 ${
                imageUrl ? "border-primary shadow-glow-sm" : "border-border hover:border-primary/50"
              }`}
            >
              {imageUrl ? (
                <div className="relative w-full h-full p-3">
                  <img src={imageUrl} className="w-full h-full object-cover rounded-2xl" alt="Ваше фото" />
                  <button onClick={(e) => { e.stopPropagation(); setImageUrl(null); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-2 shadow-lg"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Upload className="w-12 h-12 text-primary/40 mx-auto mb-3" />
                  <p className="font-bold text-sm uppercase">Загрузить</p>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && setImageUrl(URL.createObjectURL(e.target.files[0]))} className="hidden" accept="image/*" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">2. Выберите стиль</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {styles.map((s) => (
                <button 
                  key={s.id} 
                  onClick={() => setSelectedStyle(s.id)} 
                  className={`relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all ${
                    selectedStyle === s.id ? "border-primary bg-primary/10 shadow-glow scale-105" : "border-border bg-background"
                  }`}
                >
                  <span className="text-4xl mb-2">{s.emoji}</span>
                  <span className="text-[10px] font-bold uppercase">{s.name}</span>
                  {selectedStyle === s.id && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ЭМОЦИИ (ПОД НИМИ) */}
        <div className="space-y-6 pt-10 border-t border-border/50">
          <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-center">3. Выберите анимации ({selectedEmotions.length})</h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
            {reactions.map((r) => (
              <button 
                key={r.label} 
                onClick={() => toggleEmotion(r.label)} 
                className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                  selectedEmotions.includes(r.label) ? "border-primary bg-primary/20 scale-110 shadow-md" : "border-border/40 opacity-50 hover:opacity-100"
                }`}
              >
                <span className="text-2xl">{r.emoji}</span>
                <span className="text-[9px] mt-1 font-bold text-center leading-tight">{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* КНОПКА (В САМОМ НИЗУ) */}
        <Button 
          disabled={!imageUrl || selectedEmotions.length === 0} 
          className="w-full h-20 text-2xl font-bold rounded-2xl mt-12 bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-[1.01] transition-all"
        >
          <Sparkles className="w-6 h-6 mr-3" />
          Создать {selectedEmotions.length > 0 && selectedEmotions.length} стикеров
        </Button>
      </div>
    </section>
  );
};

export default GeneratorSection;

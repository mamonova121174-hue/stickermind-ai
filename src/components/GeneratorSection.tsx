import { useState, useCallback, useRef } from "react";
import { Upload, Sparkles, X, ImageIcon, Check } from "lucide-react";
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

export const GeneratorSection = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev =>
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  return (
    <section id="generator" className="py-20 bg-background/50">
      <div className="container max-w-4xl px-4">
        <div className="bg-card/50 border border-border/50 rounded-[32px] p-6 md:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid gap-10">
            
            {/* 1. ЗАГРУЗКА ФОТО */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">1. Загрузите фото</label>
              <div 
                onClick={() => !imageUrl && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all min-h-[200px] ${
                  imageUrl ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/40 cursor-pointer"
                }`}
              >
                {imageUrl ? (
                  <div className="relative group">
                    <img src={imageUrl} className="w-48 h-48 object-cover rounded-xl shadow-2xl" alt="Ваше фото" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                      className="absolute -top-3 -right-3 bg-destructive text-white rounded-full p-1.5 shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-bold">Нажмите для загрузки</p>
                    <p className="text-xs text-muted-foreground mt-2">Лицо должно быть хорошо видно</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>
            </div>

            {/* 2. СТИЛЬ */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">2. Выберите стиль</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                      selectedStyle === s.id ? "border-primary bg-primary/10 shadow-glow-sm" : "border-border bg-background/40 hover:border-primary/30"
                    }`}
                  >
                    <span className="text-2xl mb-1">{s.emoji}</span>
                    <span className="text-[10px] font-bold uppercase">{s.name}</span>
                    {selectedStyle === s.id && <Check className="absolute top-1 right-1 w-3 h-3 text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. ЭМОЦИИ */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">3. Выберите анимации ({selectedEmotions.length})</label>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2">
                {reactions.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => toggleEmotion(r.label)}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                      selectedEmotions.includes(r.label) ? "border-primary bg-primary/20 scale-105 shadow-md" : "border-border/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <span className="text-xl">{r.emoji}</span>
                    <span className="text-[8px] mt-1 truncate w-full text-center font-medium">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* КНОПКА СОЗДАТЬ */}
            <Button 
              size="lg"
              disabled={!imageUrl || !selectedStyle || selectedEmotions.length === 0}
              className="w-full h-16 text-xl font-bold rounded-2xl gap-3 shadow-xl hover:scale-[1.02] transition-all"
              onClick={() => alert('Начинаем магию! Ваши стикеры скоро будут готовы.')}
            >
              <Sparkles className="w-6 h-6" />
              {!imageUrl ? "Загрузите фото" : !selectedStyle ? "Выберите стиль" : selectedEmotions.length === 0 ? "Выберите эмоции" : `Создать стикеры (${selectedEmotions.length})`}
            </Button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

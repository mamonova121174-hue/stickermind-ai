import { ArrowDown, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const STYLES = [
  { id: "pixar", name: "3D Pixar", emoji: "🎬" },
  { id: "gta", name: "GTA Style", emoji: "🚗" },
  { id: "ghibli", name: "Miyazaki", emoji: "🍃" },
  { id: "cyberpunk", name: "Cyberpunk", emoji: "🤖" },
  { id: "lineart", name: "Line Art", emoji: "✏️" },
];

const EMOTIONS = [
  { emoji: "👋", label: "Привет" }, { emoji: "👌", label: "Окей" },
  { emoji: "👍", label: "Лайк" }, { emoji: "🫶", label: "Любовь" },
  { emoji: "🤦‍♂️", label: "Фейспалм" }, { emoji: "💻", label: "Работаю" },
  { emoji: "😤", label: "Злюсь" }, { emoji: "🤔", label: "Думаю" },
  { emoji: "💰", label: "Успех" }, { emoji: "🎉", label: "Ура!" },
  { emoji: "😴", label: "Сплю" }, { emoji: "😮", label: "Шок" },
  { emoji: "⚖️", label: "Закон" }, { emoji: "💪", label: "Вперёд" },
  { emoji: "🙋", label: "Пока" }
];

const HeroSection = () => {
  const [selectedStyle, setSelectedStyle] = useState("pixar");
  const [selectedEmotion, setSelectedEmotion] = useState("Привет");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      alert(`Стикер почти готов!\nСтиль: ${selectedStyle}\nЭмоция: ${selectedEmotion}\nФайл: ${file.name}`);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4 bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

      <div className="container relative z-10 text-center max-w-4xl">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-8">
          Создай свой нейро-стикерпак
        </h1>

        <div className="grid gap-6 mb-10 text-left bg-card/40 p-6 rounded-3xl border border-border/50 backdrop-blur-md shadow-xl">
          {/* СТИЛИ */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4">1. Выбери стиль</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`relative flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                    selectedStyle === s.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-border bg-background/50 hover:border-primary/30'
                  }`}
                >
                  <span className="text-2xl mb-1">{s.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight">{s.name}</span>
                  {selectedStyle === s.id && <Check className="absolute top-1 right-1 w-3 h-3 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* ЭМОЦИИ */}
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4">2. Выбери эмоцию ({selectedEmotion})</p>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {EMOTIONS.map((emo) => (
                <button
                  key={emo.label}
                  onClick={() => setSelectedEmotion(emo.label)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all ${
                    selectedEmotion === emo.label ? 'border-primary bg-primary/20 scale-105' : 'border-border/30 opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className="text-xl">{emo.emoji}</span>
                  <span className="text-[8px] truncate w-full text-center">{emo.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={handleCreateClick}
            className="bg-primary text-primary-foreground h-16 px-10 text-xl font-bold rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-primary/40"
          >
            <Sparkles className="w-6 h-6 mr-3" />
            Загрузить фото и оживить
          </Button>
          <p className="text-xs text-muted-foreground/60">
            Выбран стиль: <span className="text-primary font-bold">{selectedStyle}</span> • 
            Эмоция: <span className="text-primary font-bold">{selectedEmotion}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

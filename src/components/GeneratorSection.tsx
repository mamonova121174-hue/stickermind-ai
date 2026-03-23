import { useState, useRef } from "react";
import { Upload, Sparkles, X, Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Тот самый список стилей с картинками-превью
const STYLES = [
  { id: "pixar", name: "3D Pixar", img: "https://i.ibb.co/68vXyCH/original.jpg" },
  { id: "gta", name: "GTA Style", img: "https://i.ibb.co/68vXyCH/original.jpg" },
  { id: "ghibli", name: "Miyazaki", img: "https://i.ibb.co/68vXyCH/original.jpg" },
  { id: "cyberpunk", name: "Cyberpunk", img: "https://i.ibb.co/68vXyCH/original.jpg" },
  { id: "lineart", name: "Line Art", img: "https://i.ibb.co/68vXyCH/original.jpg" },
];

// Тот самый список 15 эмоций
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

const GeneratorSection = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("pixar");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev => prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]);
  };

  return (
    <section id="generator" className="py-20 bg-secondary/10">
      <div className="container max-w-6xl px-4">
        <div className="bg-card border border-border/50 rounded-[48px] p-8 md:p-14 shadow-3xl backdrop-blur-md space-y-12">
          
          {/* ЧАСТЬ 1: ФОТО СЛЕВА, СТИЛИ СПРАВА (КАК НА СКРИНШОТЕ) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1.2fr] gap-10 items-start">
            
            {/* 1А: ЗАГРУЗКА ФОТО (СЛЕВА) */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wider">1. Загрузите ваше фото</h3>
              <div 
                onClick={() => !imageUrl && fileInputRef.current?.click()}
                className={`relative border-2 border-dashed border-border rounded-3xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer bg-background ${
                  imageUrl ? "border-primary bg-primary/5 shadow-inner" : "hover:border-primary/50"
                }`}
                style={{ aspectRatio: "1/1" }} // Делаем его квадратным как на скрине
              >
                {imageUrl ? (
                  <div className="relative w-full h-full">
                    <img src={imageUrl} className="w-full h-full object-cover rounded-2xl shadow-md" alt="Фото" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); setImageUrl(null); }}
                      className="absolute -top-3 -right-3 bg-destructive text-white rounded-full p-2 shadow-xl hover:scale-110"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-bold">Нажмите для загрузки</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 10MB</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept="image/*" />
              </div>
            </div>

            {/* 1Б: ВЫБОР СТИЛЯ (СПРАВА) */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wider">2. Выберите стиль стикеров</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all group overflow-hidden ${
                      selectedStyle === s.id ? "border-primary bg-primary/10 shadow-glow" : "border-border/60 bg-background/50 hover:border-primary/30"
                    }`}
                  >
                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-2">
                       <img src={s.img} alt={s.name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{s.name}</span>
                    {selectedStyle === s.id && (
                      <div className="absolute top-2 right-2 bg-primary rounded-full p-1 shadow-md">
                        <Check className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ЧАСТЬ 2: ЭМОЦИИ (ПОД НИЗ, КАК ТЫ ПРОСИЛА) */}
          <div className="space-y-6 pt-10 border-t border-border/50">
            <h3 className="text-xl font-bold uppercase tracking-wider text-center">3. Выберите анимации ({selectedEmotions.length})</h3>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
              {EMOTIONS.map((e) => (
                <button
                  key={e.label}
                  onClick={() => toggleEmotion(e.label)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                    selectedEmotions.includes(e.label) ? "border-primary bg-primary/20 scale-105 shadow-md" : "border-border/30 opacity-60 hover:opacity-100 hover:border-primary/30"
                  }`}
                >
                  <span className="text-3xl">{e.emoji}</span>
                  <span className="text-[8px] font-medium truncate w-full text-center">{e.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ЧАСТЬ 3: ФИНАЛЬНАЯ КНОПКА (САМЫЙ НИЗ) */}
          <Button 
            disabled={!imageUrl || selectedEmotions.length === 0}
            className="w-full h-20 text-2xl font-bold rounded-2xl shadow-3xl shadow-primary/40 hover:scale-[1.02] transition-all bg-gradient-primary h-24 mt-12 gap-3"
            onClick={() => alert('Начинаем создавать ваши стикеры!')}
          >
            <Sparkles className="w-6 h-6" />
            {!imageUrl ? "Сначала загрузите фото" : selectedEmotions.length === 0 ? "Выберите анимации" : `Создать ${selectedEmotions.length} стикеров`}
          </Button>

        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

import { useState, useRef } from "react";
import { Upload, Sparkles, Check, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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

export const GeneratorSection = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("pixar");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleEmotion = (label: string) => {
    setSelectedEmotions(prev => 
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  return (
    <section id="generator" className="py-20 bg-background">
      <div className="container max-w-4xl">
        <div className="flex flex-col gap-10">
          
          {/* ШАГ 1: ЗАГРУЗКА ФОТО */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">1. Загрузите ваше фото</h3>
            <div 
              onClick={() => !uploadedFile && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                uploadedFile ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
              }`}
            >
              {previewUrl ? (
                <div className="relative w-40 h-40">
                  <img src={previewUrl} className="w-full h-full object-cover rounded-2xl shadow-md" alt="Превью" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); setPreviewUrl(null); }}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Нажмите, чтобы выбрать фото</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 10MB</p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* ШАГ 2: ВЫБОР СТИЛЯ */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">2. Выберите стиль стикеров</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedStyle(s.id)}
                  className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all ${
                    selectedStyle === s.id ? "border-primary bg-primary/10" : "border-border bg-card"
                  }`}
                >
                  <span className="text-3xl mb-2">{s.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{s.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ШАГ 3: ВЫБОР ЭМОЦИЙ */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex justify-between">
              3. Выберите анимации <span>({selectedEmotions.length})</span>
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
              {EMOTIONS.map((e) => (
                <button
                  key={e.label}
                  onClick={() => toggleEmotion(e.label)}
                  className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                    selectedEmotions.includes(e.label) ? "border-primary bg-primary/20 scale-105" : "border-border bg-card opacity-60"
                  }`}
                >
                  <span className="text-xl">{e.emoji}</span>
                  <span className="text-[8px] mt-1 truncate w-full text-center">{e.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* КНОПКА ДЕЙСТВИЯ */}
          <Button 
            size="lg"
            disabled={!uploadedFile || selectedEmotions.length === 0}
            className="h-20 text-xl font-bold rounded-2xl gap-3 shadow-xl shadow-primary/30"
            onClick={() => alert('Поехали! Нейросеть начала работу над вашим паком.')}
          >
            <Sparkles className="w-6 h-6" />
            {!uploadedFile ? "Сначала загрузите фото" : selectedEmotions.length === 0 ? "Выберите хотя бы 1 эмоцию" : `Создать ${selectedEmotions.length} стикеров`}
          </Button>
          
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

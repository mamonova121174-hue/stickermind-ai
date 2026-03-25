import { useState, useRef } from "react";
import { Upload, Sparkles, X, Check, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <section id="generator" className="py-20 px-4 scroll-mt-20">
      <div className="container max-w-5xl">
        <div className="bg-card/40 border border-border/50 rounded-[48px] p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,1.4fr] gap-12 mb-12 items-start text-left">
            
            {/* ФОТО СЛЕВА */}
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
                    <button onClick={(e) => { e.stopPropagation(); setImageUrl(null); }} className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-2 shadow-xl hover:scale-110 transition-transform"><X className="w-4 h-4" /></button>
                  </div>
                ) : (
                  <div className="text-center p-8 opacity-40">
                    <Upload className="w-12 h-12 mx-auto mb-4" />
                    <p className="font-bold text-xs uppercase tracking-widest">Нажмите для загрузки</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && setImageUrl(URL.createObjectURL(e.target.files[0]))} className="hidden" accept="image/*" />
              </div>
            </div>

            {/* СТИЛИ СПРАВА */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">2. Выберите стиль</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {styles.map((s) => (
                  <button
  key={s.id}
  onClick={() => setSelectedStyle(s.id)}
  className={`relative flex flex-col items-center p-3 rounded-2xl border-2 transition-all duration-300 bg-card/40 ${
    selectedStyle === s.id 
    ? "border-primary shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105" 
    : "border-primary/10 hover:border-primary/30 opacity-70 hover:opacity-100"
  }`}
>
  <div className="w-14 h-14 rounded-xl overflow-hidden mb-2 border border-primary/10 shadow-inner">
    <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
  </div>
  <span className="text-[10px] font-bold uppercase tracking-tighter text-center leading-tight">
    {s.name}
  </span>
  {selectedStyle === s.id && (
    <div className="absolute -top-1.5 -right-1.5 bg-primary rounded-full p-1 shadow-lg z-10">
      <Check className="w-2.5 h-2.5 text-white" />
    </div>
  )}
</button>
                ))}
              </div>
            </div>
          </div>

          {/* ЭМОЦИИ ВНИЗУ */}
          <div className="space-y-6 pt-10 border-t border-border/50 text-left">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">3. Выберите анимации ({selectedEmotions.length})</h3>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
              {reactions.map((r) => (
                <button key={r.label} onClick={() => toggleEmotion(r.label)} className={`flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${selectedEmotions.includes(r.label) ? "border-primary bg-primary/20 scale-110 shadow-lg" : "border-border/40 bg-secondary/20 opacity-60 hover:opacity-100"}`}>
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="text-[8px] mt-1 font-bold text-center uppercase tracking-tighter leading-tight">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <Button disabled={!imageUrl || selectedEmotions.length === 0} className="w-full h-20 text-2xl font-bold rounded-3xl mt-12 bg-primary text-white shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-all">
            <Sparkles className="w-6 h-6 mr-3" />
            Создать пак
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

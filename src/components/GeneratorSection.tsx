import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Sparkles, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "./ScrollReveal";

import stylePixar from "@/assets/style-3d-pixar.png";
import styleGta from "@/assets/style-gta.png";
import styleGhibli from "@/assets/style-ghibli.png";
import styleCyberpunk from "@/assets/style-cyberpunk.png";
import styleLineart from "@/assets/style-lineart.png";

const styles = [
  { id: "pixar", name: "3D Pixar", image: stylePixar, premium: true },
  { id: "gta", name: "GTA Style", image: styleGta, premium: true },
  { id: "ghibli", name: "Miyazaki", image: styleGhibli, premium: true },
  { id: "cyberpunk", name: "Cyberpunk", image: styleCyberpunk },
  { id: "lineart", name: "Line Art", image: styleLineart },
];

const GeneratorSection = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleGenerate = () => {
    navigate("/pricing");
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  return (
    <section id="generator" className="py-20 scroll-mt-20">
      <div className="container">
        <ScrollReveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-12" style={{ textWrap: "balance" }}>
            Создай свой стикерпак прямо сейчас
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Upload zone */}
          <ScrollReveal direction="left" delay={100}>
            <div
              className={`relative flex flex-col items-center justify-center min-h-[320px] rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragging
                  ? "border-primary bg-primary/5 glow-primary"
                  : "border-border hover:border-primary/40 bg-card/40"
              }`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => {
                if (!preview) document.getElementById("file-input")?.click();
              }}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />

              {preview ? (
                <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-4">
                  <img
                    src={preview}
                    alt="Загруженное фото для создания стикера"
                    className="max-h-[280px] rounded-lg object-contain"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(); }}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-destructive/80 text-destructive-foreground hover:bg-destructive transition-colors active:scale-95"
                    aria-label="Удалить фото"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-1">
                      Перетащите фото сюда
                    </p>
                    <p className="text-sm text-muted-foreground">
                      или нажмите для выбора файла
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <ImageIcon className="w-3.5 h-3.5" />
                    JPG, PNG, WEBP до 10 МБ
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground/50 mt-3 text-center">
              🔒 Ваши фото удаляются сразу после обработки
            </p>
          </ScrollReveal>

          {/* Style grid */}
          <ScrollReveal direction="right" delay={200}>
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground" id="styles">Выберите стиль</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`group relative rounded-xl overflow-hidden border-2 transition-all duration-200 active:scale-[0.97] ${
                      selectedStyle === style.id
                        ? "border-primary glow-primary"
                        : "border-border/50 hover:border-primary/30"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={style.image}
                        alt={`Стикер в стиле ${style.name} — пример нейро-стикера`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-2">
                      <span className="text-xs font-medium text-foreground">{style.name}</span>
                    </div>
                    {selectedStyle === style.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground text-[10px]">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button
                className="w-full mt-4 bg-gradient-primary text-primary-foreground h-12 text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 glow-primary"
                onClick={handleGenerate}
                disabled={!uploadedFile || !selectedStyle}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Сгенерировать магию
              </Button>

              {(!uploadedFile || !selectedStyle) && (
                <p className="text-xs text-muted-foreground/50 text-center">
                  {!uploadedFile && !selectedStyle
                    ? "Загрузите фото и выберите стиль"
                    : !uploadedFile
                      ? "Загрузите фото"
                      : "Выберите стиль"}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default GeneratorSection;

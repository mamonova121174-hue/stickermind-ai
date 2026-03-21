import { useState, useCallback, useRef, useEffect } from "react";
import { Upload, Sparkles, X, ImageIcon, Film, Check, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useTokens } from "@/components/TokenContext";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "./ScrollReveal";
import { supabase } from "@/integrations/supabase/client";

import stylePixar from "@/assets/style-3d-pixar.png";
import styleGta from "@/assets/style-gta.png";
import styleGhibli from "@/assets/style-ghibli.png";
import styleCyberpunk from "@/assets/style-cyberpunk.png";
import styleLineart from "@/assets/style-lineart.png";

const styles = [
  { id: "pixar", name: "3D Pixar", image: stylePixar },
  { id: "gta", name: "GTA Style", image: styleGta },
  { id: "ghibli", name: "Miyazaki", image: styleGhibli },
  { id: "cyberpunk", name: "Cyberpunk", image: styleCyberpunk },
  { id: "lineart", name: "Line Art", image: styleLineart },
];

const goldenReactions = [
  { emoji: "👋", label: "Привет" },
  { emoji: "👌", label: "Окей" },
  { emoji: "👍", label: "Лайк" },
  { emoji: "🫶", label: "Любовь" },
  { emoji: "🤦‍♂️", label: "Фейспалм" },
  { emoji: "💻", label: "Работаю" },
  { emoji: "😤", label: "Злюсь" },
  { emoji: "🤔", label: "Думаю" },
  { emoji: "💰", label: "Успех" },
  { emoji: "🎉", label: "Ура!" },
  { emoji: "😴", label: "Сплю" },
  { emoji: "😮", label: "Шок" },
  { emoji: "⚖️", label: "Закон" },
  { emoji: "💪", label: "Вперёд" },
  { emoji: "🙋", label: "Пока" },
];

type StickerData = {
  emoji: string; label: string; style: string; animated: boolean; imageUrl?: string; frames?: string[];
};

const StickerCard = ({ sticker, index }: { sticker: StickerData; index: number }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const frames = sticker.frames && sticker.frames.length > 1 ? sticker.frames : null;

  useEffect(() => {
    if (!frames) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 600);
    return () => clearInterval(interval);
  }, [frames]);

  const displayUrl = frames ? frames[frameIndex] : sticker.imageUrl;

  return (
    <div
      className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 animate-scale-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
    >
      <div className="w-full aspect-square rounded-lg bg-secondary/60 flex items-center justify-center overflow-hidden mb-2">
        {displayUrl ? (
          <img src={displayUrl} alt={`Стикер ${sticker.label}`} className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-3xl">{sticker.emoji}</span>
        )}
      </div>
      <span className="text-[10px] font-medium text-foreground truncate w-full text-center">{sticker.label}</span>
      <span className="text-[8px] text-muted-foreground/60">{sticker.style}</span>
      {sticker.animated && frames && (
        <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-primary/20 text-primary">
          ANIM
        </span>
      )}
      {!frames && sticker.imageUrl && (
        <span className="absolute top-1.5 right-1.5 text-[8px] font-bold uppercase px-1 py-0.5 rounded bg-muted/40 text-muted-foreground">
          PNG
        </span>
      )}
    </div>
  );
};

const GeneratorSection = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [animateAll, setAnimateAll] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string>("");
  const [generatedStickers, setGeneratedStickers] = useState<
    { emoji: string; label: string; style: string; animated: boolean; imageUrl?: string }[]
  >(() => {
    try {
      return JSON.parse(localStorage.getItem("stickermind_stickers") || "[]");
    } catch { return []; }
  });
  const resultsRef = useRef<HTMLDivElement>(null);
  const { balance, setBalance } = useTokens();
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("stickermind_stickers", JSON.stringify(generatedStickers));
  }, [generatedStickers]);

  const costPerSticker = animateAll ? 7 : 5;
  const totalCost = selectedEmotions.length * costPerSticker;
  const canAfford = balance >= totalCost;

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

  const toggleEmotion = (label: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleGenerate = () => {
    if (!uploadedFile || !selectedStyle || selectedEmotions.length === 0) return;

    if (!canAfford) {
      toast({
        title: "Недостаточно токенов",
        description: `Нужно ${totalCost} 🪙, у вас ${balance} 🪙. Пополните баланс!`,
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationProgress("Подготовка фото...");

    // Convert file to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const photoBase64 = e.target?.result as string;
      const styleName = styles.find((s) => s.id === selectedStyle)?.name ?? selectedStyle;

      try {
        setGenerationProgress(`Генерируем ${selectedEmotions.length} стикер(ов)... Это займёт 1-2 минуты`);

        const { data, error } = await supabase.functions.invoke("generate-stickers", {
          body: {
            photoBase64,
            style: selectedStyle,
            emotions: selectedEmotions,
            animated: animateAll,
          },
        });

        if (error) throw error;

        if (data?.error) {
          toast({
            title: "Ошибка генерации",
            description: data.error,
            variant: "destructive",
          });
          if (data.results?.length) {
            // Partial results
            const partialCost = data.results.length * costPerSticker;
            setBalance(balance - partialCost);
            const newStickers = data.results.map((r: any) => ({
              emoji: goldenReactions.find((gr) => gr.label === r.label)?.emoji ?? "🎨",
              label: r.label,
              style: styleName,
              animated: r.animated,
              imageUrl: r.url,
              frames: r.frames,
            }));
            setGeneratedStickers((prev) => [...newStickers, ...prev]);
          }
          setIsGenerating(false);
          setGenerationProgress("");
          return;
        }

        const results = data?.results || [];
        if (results.length === 0) {
          toast({
            title: "Не удалось сгенерировать",
            description: "Попробуйте другое фото или стиль",
            variant: "destructive",
          });
          setIsGenerating(false);
          setGenerationProgress("");
          return;
        }

        const actualCost = results.length * costPerSticker;
        setBalance(balance - actualCost);

        const newStickers = results.map((r: any) => ({
          emoji: goldenReactions.find((gr) => gr.label === r.label)?.emoji ?? "🎨",
          label: r.label,
          style: styleName,
          animated: r.animated,
          imageUrl: r.url,
        }));

        setGeneratedStickers((prev) => [...newStickers, ...prev]);
        toast({
          title: "Стикеры готовы! 🎉",
          description: `Создано ${results.length} стикер(ов). Списано ${actualCost} 🪙`,
        });
        setSelectedEmotions([]);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } catch (err: any) {
        console.error("Generation error:", err);
        toast({
          title: "Ошибка",
          description: err?.message || "Не удалось сгенерировать стикеры",
          variant: "destructive",
        });
      } finally {
        setIsGenerating(false);
        setGenerationProgress("");
      }
    };
    reader.readAsDataURL(uploadedFile);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  const isReady = uploadedFile && selectedStyle && selectedEmotions.length > 0;

  return (
    <section id="generator" className="py-10 scroll-mt-20">
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

          {/* Right column: style + emotions + generate */}
          <ScrollReveal direction="right" delay={200}>
            <div className="space-y-4">
              {/* Style picker */}
              <p className="text-sm font-medium text-muted-foreground">Выберите стиль</p>
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
                        alt={`Стикер в стиле ${style.name}`}
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

              {/* Emotion multi-select */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Выберите эмоции для стикеров
                  {selectedEmotions.length > 0 && (
                    <span className="ml-2 text-primary font-semibold">
                      ({selectedEmotions.length} выбрано)
                    </span>
                  )}
                </p>
                <div className="grid grid-cols-5 gap-1.5">
                  {goldenReactions.map((r) => {
                    const isSelected = selectedEmotions.includes(r.label);
                    return (
                      <button
                        key={r.label}
                        onClick={() => toggleEmotion(r.label)}
                        aria-pressed={isSelected}
                        className={`relative z-0 flex flex-col items-center gap-0.5 rounded-lg border-2 p-1.5 transition-all duration-200 active:scale-95 ${
                          isSelected
                            ? "z-10 border-primary bg-primary/15 ring-2 ring-primary/70 shadow-[0_0_0_1px_hsl(var(--primary)/0.9),0_0_12px_hsl(var(--primary)/0.55),0_0_24px_hsl(var(--primary)/0.3)]"
                            : "border-border/30 bg-secondary/40 hover:border-primary/30 hover:bg-primary/5"
                        }`}
                      >
                        <span className="text-lg">{r.emoji}</span>
                        <span className="text-[8px] text-muted-foreground truncate w-full text-center">
                          {r.label}
                        </span>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-primary-foreground" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Animation toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border/50">
                <div className="flex items-center gap-2.5">
                  <Film className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs font-medium text-foreground">Анимировать весь пак (TGS)</p>
                    <p className="text-[10px] text-muted-foreground">
                      {selectedEmotions.length > 0
                        ? `${selectedEmotions.length} × ${costPerSticker} = ${totalCost} 🪙`
                        : animateAll ? "7 🪙 за стикер" : "5 🪙 за стикер"}
                    </p>
                  </div>
                </div>
                <Switch checked={animateAll} onCheckedChange={setAnimateAll} />
              </div>

              {/* Cost summary */}
              {selectedEmotions.length > 0 && (
                <div className={`text-xs text-center p-2 rounded-lg border ${
                  canAfford
                    ? "bg-primary/5 border-primary/20 text-foreground"
                    : "bg-destructive/5 border-destructive/20 text-destructive"
                }`}>
                  Итого: <span className="font-bold">{totalCost} 🪙</span> за {selectedEmotions.length} стикер(ов) · Баланс: <span className="font-bold">{balance} 🪙</span>
                  {!canAfford && <span className="block mt-0.5 text-destructive">Не хватает {totalCost - balance} 🪙 — пополните баланс</span>}
                </div>
              )}

              <Button
                className="w-full mt-2 bg-gradient-primary text-primary-foreground h-12 text-base font-semibold hover:opacity-90 active:scale-[0.98] transition-all duration-150 glow-primary"
                onClick={handleGenerate}
                disabled={!isReady || !canAfford || isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {generationProgress || "Генерируем..."}
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Сгенерировать магию {totalCost > 0 && `(${totalCost} 🪙)`}
                  </>
                )}
              </Button>

              {!isReady && (
                <p className="text-xs text-muted-foreground/50 text-center">
                  {!uploadedFile && !selectedStyle && selectedEmotions.length === 0
                    ? "Загрузите фото, выберите стиль и эмоции"
                    : !uploadedFile
                      ? "Загрузите фото"
                      : !selectedStyle
                        ? "Выберите стиль"
                        : "Выберите хотя бы одну эмоцию"}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Generated stickers gallery */}
        {generatedStickers.length > 0 && (
          <div ref={resultsRef} className="mt-16 max-w-5xl mx-auto scroll-mt-20">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-foreground">
                  Ваши стикеры ({generatedStickers.length})
                </h3>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Скачать пак для Telegram
                </Button>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-3">
              {generatedStickers.map((sticker, i) => (
                <StickerCard key={`${sticker.label}-${i}`} sticker={sticker} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeneratorSection;

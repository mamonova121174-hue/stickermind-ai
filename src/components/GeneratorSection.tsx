import { useState, useRef } from "react";
import { Loader2, Sparkles, Image as ImageIcon, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const StickerCard = ({ sticker, index }: { sticker: any; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!sticker.videoUrl;

  return (
    <div 
      className="group relative flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-3 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 animate-scale-in"
      style={{ animationDelay: `${index * 60}ms`, animationFillMode: "both" }}
    >
      <div className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden mb-2 relative">
        {hasVideo ? (
          <video
            ref={videoRef}
            src={sticker.videoUrl}
            /* МАГИЯ ХРОМАКЕЯ: Стираем зеленый фон */
            style={{ 
              filter: 'chroma(color=#00FF00) contrast(1.1)',
              backgroundColor: 'transparent'
            }} 
            className="w-full h-full object-contain rounded-lg"
            loop muted autoPlay playsInline
          />
        ) : sticker.imageUrl ? (
          <img src={sticker.imageUrl} className="w-full h-full object-contain rounded-lg" alt={sticker.label} />
        ) : (
          <span className="text-3xl">{sticker.emoji}</span>
        )}

        {sticker.isAnimating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/70 backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-[10px] font-medium text-foreground">AI оживляет...</span>
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium text-foreground truncate w-full text-center">{sticker.label}</span>
      <span className="text-[8px] text-muted-foreground/60">{sticker.style}</span>
    </div>
  );
};

export const GeneratorSection = () => {
  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-8">
         <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Ваши стикеры</h2>
         <p className="mt-2 text-lg text-muted-foreground">Здесь скоро появится магия генерации</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Тут будут стикеры */}
      </div>
    </div>
  );
};

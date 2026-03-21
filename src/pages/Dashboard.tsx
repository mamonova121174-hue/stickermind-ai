import { Download, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

import stylePixar from "@/assets/style-3d-pixar.png";
import styleGta from "@/assets/style-gta.png";
import styleGhibli from "@/assets/style-ghibli.png";
import styleCyberpunk from "@/assets/style-cyberpunk.png";

const demoStickers = [
  { id: 1, image: stylePixar, style: "3D Pixar" },
  { id: 2, image: styleGta, style: "GTA Style" },
  { id: 3, image: styleGhibli, style: "Anime Ghibli" },
  { id: 4, image: styleCyberpunk, style: "Cyberpunk" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container max-w-4xl">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">Мои стикеры</h1>
                <p className="text-sm text-muted-foreground mt-1">Ваши сгенерированные стикеры</p>
              </div>
              <Button
                className="bg-gradient-primary text-primary-foreground hover:opacity-90 active:scale-[0.97]"
                disabled
              >
                <Download className="w-4 h-4 mr-2" />
                Скачать пак для Telegram
              </Button>
            </div>
          </ScrollReveal>

          {demoStickers.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {demoStickers.map((sticker, i) => (
                <ScrollReveal key={sticker.id} delay={i * 80}>
                  <div className="group surface-elevated rounded-xl overflow-hidden">
                    <div className="aspect-square p-3">
                      <img
                        src={sticker.image}
                        alt={`Стикер в стиле ${sticker.style}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="px-3 pb-3">
                      <span className="text-xs text-muted-foreground">{sticker.style}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">Пока пусто</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Создайте свой первый стикерпак — загрузите фото на главной странице
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

import ScrollReveal from "./ScrollReveal";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-16 text-center px-4 overflow-hidden">
      <div className="container max-w-5xl">
        <ScrollReveal>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Нейро-стикеры по фото
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-16">
            Твоё лицо — твой бренд. Один персонаж — пять премиум-стилей.
          </p>
          
          {/* Блок с примерами (Рыжая девушка) */}
          <div className="flex flex-wrap justify-center items-end gap-6 opacity-90">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-2 border-primary/20 overflow-hidden shadow-xl">
                <img src="https://i.ibb.co/68vXyCH/original.jpg" className="w-full h-full object-cover" alt="Оригинал" />
              </div>
              <span className="text-[10px] font-bold uppercase text-primary">Оригинал</span>
            </div>
            <div className="text-2xl text-primary pb-10">→</div>
            {['3D Pixar', 'GTA Style', 'Miyazaki', 'Cyberpunk', 'Line Art'].map((name) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-border overflow-hidden grayscale-[0.3]">
                  <img src="https://i.ibb.co/68vXyCH/original.jpg" className="w-full h-full object-cover" alt={name} />
                </div>
                <span className="text-[8px] font-bold uppercase text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default HeroSection;

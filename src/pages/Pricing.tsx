import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../components/ui/Button'; 
import { ScrollReveal } from '../components/ui/ScrollReveal';
  const tiers = [
    {
      name: 'Старт',
      price: '370₽',
      tokens: '50 токенов',
      description: 'Попробовать магию',
      features: [
        '5 анимированных стикеров',
        'или 7 статичных',
        'Высокое качество HD',
        'Без очереди',
      ],
      buttonText: 'Начать',
      highlight: false,
      badge: 'Быстрый вход'
    },
    {
      name: 'Набор',
      price: '890₽',
      tokens: '150 токенов',
      description: 'Хватит на целый пак',
      features: [
        '15 анимированных стикеров',
        'или 21 статичный',
        'Приоритетная генерация',
        'Доступ к новым стилям',
        'Выгода ~25%',
      ],
      buttonText: 'Выбрать Набор',
      highlight: true,
      badge: 'Популярный'
    },
    {
      name: 'VIP',
      price: '1990₽',
      tokens: '500 токенов',
      description: 'Для мейкеров и брендов',
      features: [
        '50 анимированных стикеров',
        'или 71 статичный',
        'Максимальный приоритет 24/7',
        'Персональная поддержка',
        'Выгода ~45%',
      ],
      buttonText: 'Стать VIP',
      highlight: false,
      badge: 'Максимум'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 tracking-tighter">
              Выбери свой <span className="text-primary">уровень</span>
            </h2>
            <p className="text-gray-400 text-lg font-medium">
              1 анимированный стикер = 10 токенов. <br/>
              Больше пакет — дешевле каждый стикер.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className={`relative p-8 rounded-[40px] border transition-all duration-500 h-full flex flex-col ${
                tier.highlight 
                ? 'bg-gradient-to-b from-primary/20 to-transparent border-primary shadow-[0_0_50px_rgba(124,58,237,0.2)] scale-105 z-20' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}>
                
                {tier.badge && (
                  <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    tier.highlight ? 'bg-primary text-white' : 'bg-white/10 text-gray-400 border border-white/10'
                  }`}>
                    {tier.badge}
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-white">{tier.price}</span>
                    <span className="text-gray-500 font-medium tracking-tight">/ {tier.tokens}</span>
                  </div>
                  <p className="text-gray-500 mt-4 text-sm font-medium italic">{tier.description}</p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-gray-300 font-medium">
                      <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${tier.highlight ? 'bg-primary/20 text-primary' : 'bg-white/10 text-gray-500'}`}>
                        <Check size={12} strokeWidth={4} />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={tier.highlight ? 'default' : 'outline'} 
                  className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all ${
                    tier.highlight 
                    ? 'shadow-[0_10px_30px_rgba(124,58,237,0.3)] hover:scale-105' 
                    : 'hover:bg-white hover:text-black'
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Напоминалка про бесплатные токены под тарифами */}
        <ScrollReveal delay={400}>
          <p className="text-center mt-12 text-gray-500 text-sm font-medium">
            🎁 Подарим <span className="text-white font-bold">20 токенов</span> при регистрации. Попробуй сервис бесплатно!
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Pricing;

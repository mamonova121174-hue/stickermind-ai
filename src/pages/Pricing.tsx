<section id="pricing" className="py-24 px-4 bg-[#0a0a0c] relative overflow-hidden">
  {/* Декоративные свечения на фоне */}
  <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 blur-[120px] rounded-full" />

  <div className="max-w-6xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
        Выбери свой <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">пакет токенов</span>
      </h2>
      <p className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Больше токенов — ниже цена за один стикерпак</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
      
      {/* ТАРИФ 1: МИНИМАЛЬНЫЙ */}
      <div className="relative p-8 rounded-[40px] bg-white/[0.02] border border-white/10 flex flex-col hover:border-rose-500/30 transition-all group backdrop-blur-sm">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white uppercase mb-2">Старт</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">370₽</span>
            <span className="text-gray-500 font-bold text-sm">/ 50 токенов</span>
          </div>
          <p className="text-gray-500 text-xs mt-2 font-medium uppercase tracking-tighter">Идеально для первого пака</p>
        </div>
        
        <ul className="space-y-4 mb-8 flex-1">
          <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 text-[10px]">✔</div>
            50 токенов на баланс
          </li>
          <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 text-[10px]">✔</div>
            Доступ ко всем стилям
          </li>
          <li className="flex items-center gap-3 text-gray-500 text-sm font-medium italic opacity-50">
            Без приоритетной очереди
          </li>
        </ul>

        <Button className="w-full h-14 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-rose-500/20 hover:border-rose-500/50 font-black uppercase tracking-widest transition-all">
          Выбрать Старт
        </Button>
      </div>

      {/* ТАРИФ 2: ХИТ (БЕЗ ИЗМЕНЕНИЙ) */}
      <div className="relative p-8 rounded-[40px] bg-gradient-to-b from-purple-900/30 to-[#0d0d10] border-2 border-purple-500 flex flex-col transform md:-translate-y-6 shadow-[0_30px_60px_rgba(139,92,246,0.2)] group">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-xl whitespace-nowrap">
          Популярный выбор
        </div>
        
        <div className="mb-8 mt-4">
          <h3 className="text-2xl font-black text-white uppercase mb-2">Набор Стикеров</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-black text-white">490₽</span>
            <span className="text-purple-300 font-bold text-sm">/ 100 токенов</span>
          </div>
          <p className="text-purple-400/80 text-xs mt-2 font-bold uppercase tracking-widest">Выгода 25%</p>
        </div>
        
        <ul className="space-y-4 mb-8 flex-1">
          <li className="flex items-center gap-3 text-white text-sm font-bold">
            <div className="w-6 h-6 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-white text-[12px]">✔</div>
            100 токенов на баланс
          </li>
          <li className="flex items-center gap-3 text-white text-sm font-bold">
            <div className="w-6 h-6 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-white text-[12px]">✔</div>
            Приоритетная генерация
          </li>
          <li className="flex items-center gap-3 text-white text-sm font-bold">
            <div className="w-6 h-6 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] flex items-center justify-center text-white text-[12px]">✔</div>
            Premium поддержка
          </li>
        </ul>

        <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black uppercase tracking-widest shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:scale-105 transition-all border-none">
          Получить Хит
        </Button>
      </div>

      {/* ТАРИФ 3: ПРО */}
      <div className="relative p-8 rounded-[40px] bg-white/[0.02] border border-white/10 flex flex-col hover:border-amber-500/30 transition-all group backdrop-blur-sm">
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white uppercase mb-2">Безлимит</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">1290₽</span>
            <span className="text-gray-500 font-bold text-sm">/ 500 токенов</span>
          </div>
          <p className="text-gray-500 text-xs mt-2 font-medium uppercase tracking-tighter">Для настоящих профи</p>
        </div>
        
        <ul className="space-y-4 mb-8 flex-1">
          <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px]">✔</div>
            500 токенов (Максимум)
          </li>
          <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px]">✔</div>
            Все новые стили навсегда
          </li>
          <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
            <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-[10px]">✔</div>
            Персональный чат
          </li>
        </ul>

        <Button className="w-full h-14 rounded-2xl bg-white/5 text-white border border-white/10 hover:bg-amber-500/20 hover:border-amber-500/50 font-black uppercase tracking-widest transition-all">
          Стать PRO
        </Button>
      </div>

    </div>
  </div>
</section>

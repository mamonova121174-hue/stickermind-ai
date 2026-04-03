import React from 'react';
import { Sparkles, Check, zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal"; // Проверь, что путь к ScrollReveal верный

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-28 pb-20 px-4 relative overflow-hidden">
      {/* Фоновые градиенты для атмосферы */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black uppercase text-white mb-6 tracking-tight">
              Выбери свой <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">пакет токенов</span>
            </h1>
            <p className="text-gray-400 text-lg font-medium max-w-2xl mx-auto">
              Больше токенов — больше уникальных стикерпаков для твоих соцсетей.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* ТАРИФ 1: СТАРТ */}
          <ScrollReveal delay={100}>
            <div className="relative p-8 rounded-[40px] bg-white/[0.02] border border-white/10 flex flex-col hover:border-rose-500/30 transition-all group backdrop-blur-sm h-full">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white uppercase mb-2">Старт</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">370₽</span>
                  <span className="text-gray-500 font-bold text-sm">/ 50 токенов</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                  <Check className="w-5 h-5 text-rose-500" /> 50 токенов на баланс
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm font-medium">
                  <Check className="w-5 h-5 text-rose-500" /> Доступ ко всем стилям
                </li>
                <li className="flex items-center gap-3 text-gray-500 text-sm font-medium opacity-50 line-through">
                  Приоритетная очередь
                </li>
              </ul>

              <Button variant="outline" className="w-full h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-rose-500/20 hover:border-rose-500/50 font-black uppercase transition-all">
                Выбрать Старт
              </Button>
            </div>
          </ScrollReveal>

          {/* ТАРИФ 2: ХИТ (Центральный) */}
          <ScrollReveal delay={200}>
            <div className="relative p-8 rounded-[40px] bg-gradient-to-b from-purple-900/30 to-[#0d0d10] border-2 border-purple-500 flex flex-col transform md:-translate-y-6 shadow-[0_30px_60px_rgba(139,92,246,0.2)] group h-full">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase px-6 py-2 rounded-full tracking-[0.2em] shadow-xl whitespace-nowrap">
                Популярный выбор
              </div>
              
              <div className="mb-8 mt-4">
                <h3 className="text-2xl font-black text-white uppercase mb-2">Набор Стикеров</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">490₽</span>
                  <span className="text-purple-300 font-bold text-sm">/ 100 токенов</span>
                </div>
                <p className="text-purple-400/80 text-[10px] mt-2 font-bold uppercase tracking-widest">Выгода 25%</p>
              </div>
              
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  100 токенов на баланс
                </li>
                <li className="flex items-center gap-3 text-white text-sm font-bold">
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  Приоритетная генерация
                </li>
              </ul>

              <Button className="w-full h-16 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink

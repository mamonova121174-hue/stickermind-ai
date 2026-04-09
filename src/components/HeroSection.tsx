import { useState, useRef } from "react";
import { Sparkles, Coins, Upload, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTokens } from "@/components/TokenContext";

// Карта соответствия эмодзи и типов анимации (твой сценарий)
const EMOTION_TEMPLATES: Record<string, string> = {
  '😊': 'wave_hand_smile',
  '😎': 'cool_glasses_tilt',
  '😡': 'angry_shout',
  '🤩': 'star_eyes_delight',
  '🤔': 'think_doubt',
  '👍': 'thumbs_up',
  '❤️': 'heart_hands',
};

const HeroSection = () => {
  const { balance } = useTokens();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>("Pixar");
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleEmoji = (emoji: string) => {
    if (!EMOTION_TEMPLATES[emoji]) return;
    setSelectedEmojis(prev => 
      prev.includes(emoji) ? prev.filter(e => e !== emoji) : [...prev, emoji]
    );
  };

  const handleGenerate = () => {
    if (!selectedFile) return alert("Загрузите ваше фото!");
    if (selectedEmojis.length === 0) return alert("Выберите эмоции!");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("Магия запущена! Скоро ваши стикеры будут готовы.");
    }, 2000);
  };

  // Демо-стили
  const styles = [
    { name: "Pixar", img: "/demo-pixar.png" },
    { name: "GTA", img: "/demo-gta.png" },
    { name: "Miyazaki", img: "/demo-ghibli.png" },
    { name: "Cyberpunk", img: "/demo-cyberpunk.png" },
    { name: "Line Art", img: "/demo-lineart.png" }
  ];

  return (
    <section className="relative min-h-screen bg-[#0a0a0c] pt-20 pb-10 px-4">
      <div className="container max-w-7xl mx-auto">
        
        {/* ЭКРАН 1: ГЛАВНЫЙ */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase mb-6 leading-tight">
            Создавай свои <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">стикеры</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Преврати одно селфи в набор анимированных стикеров для Telegram в 5 разных стилях.
          </p>
          <Button 
            onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-indigo-600 to-pink-600 h-14 px-10 rounded-2xl text-xl font-bold hover:scale-105 transition-all"
          >
            <Sparkles className="mr-2 h-6 w-6" /> Создать бесплатно
          </Button>
          <div className="mt-4 text-xs text-gray-500 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Coins className="h-3 w-3 text-purple-500" /> Баланс: {balance} монет
          </div>
        </div>

        {/* ЭКРАН 4: ГЕНЕРАТОР */}
        <div id="generator" className="bg-white/[0.02] border border-white/10 rounded-[48px] p-8 md:p-12 backdrop-blur-xl shadow-2xl">
          <h2 className="text-3xl font-black text-white uppercase mb-10 text-center">Настрой свой <span className="text-purple-500">стикерпак</span></h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* 1. ЗАГРУЗКА ФОТО */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <label className="text-xs font-black uppercase text-purple-500 tracking-wider">1. Твое фото</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-[4/5] border-2 border-dashed border-white/10 rounded-[32px]

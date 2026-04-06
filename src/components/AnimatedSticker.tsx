import React from 'react';

// Описываем, какие данные компонент принимает на вход
interface AnimatedStickerProps {
  src: string;      // Путь к анимированному .webp
  alt?: string;     // Описание для SEO и доступности
  size?: string;    // Ширина стикера (например, '200px' или '100%')
  className?: string; // Для дополнительных Tailwind-классов
}

const AnimatedSticker: React.FC<AnimatedStickerProps> = ({ 
  src, 
  alt = "Animated Sticker", 
  size = "100%",
  className = "" 
}) => {
  return (
    <div className={`sticker-wrapper ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        className="animated-webp"
        style={{ width: size, height: 'auto' }}
      />

      <style jsx>{`
        .sticker-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          /* Убираем любые фоны, которые могли быть у родителя */
          background: transparent; 
        }

        .animated-webp {
          display: block;
          /* Магия: тень ложится ровно по контуру прозрачного WebP */
          filter: drop-shadow(0 8px 15px rgba(0, 0, 0, 0.4));
          
          /* Плавное «всплытие» при загрузке */
          animation: appear 0.6s ease-out;
          transition: transform 0.3s ease;
        }

        .animated-webp:hover {
          /* Эффект при наведении — стикер немного увеличивается */
          transform: scale(1.08);
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSticker;

import React from 'react';

// Самая простая версия, которая просто выводит контент без useRef
export const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ScrollReveal;

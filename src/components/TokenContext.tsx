import React, { createContext, useContext, useState, useEffect } from 'react';

interface TokenContextType {
  balance: number;
  useTokens: (amount: number) => boolean;
  addTokens: (amount: number) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Изначально даем 15 токенов (можно потом подтянуть из БД)
  const [balance, setBalance] = useState(15);

  const useTokens = (amount: number) => {
    if (balance >= amount) {
      setBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addTokens = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  return (
    <TokenContext.Provider value={{ balance, useTokens, addTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useTokens must be used within TokenProvider");
  return context;
};

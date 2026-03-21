import { createContext, useContext, useState, ReactNode } from "react";

interface TokenContextType {
  balance: number;
  setBalance: (n: number) => void;
}

const TokenContext = createContext<TokenContextType>({ balance: 15, setBalance: () => {} });

export const useTokens = () => useContext(TokenContext);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState(15);
  return (
    <TokenContext.Provider value={{ balance, setBalance }}>
      {children}
    </TokenContext.Provider>
  );
};

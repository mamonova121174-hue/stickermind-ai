import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface TokenContextType {
  balance: number;
  loading: boolean;
  useTokens: (amount: number) => Promise<boolean>;
  addTokens: (amount: number) => Promise<void>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log("Контекст загрузился!"); // Добавь эту строчку
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    const initUser = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        const visitorId = result.visitorId;
        setDeviceId(visitorId);

        let { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('device_fingerprint', visitorId)
          .maybeSingle();

        if (!profile && !error) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([{ 
              device_fingerprint: visitorId, 
              balance: 20,
              has_claimed_welcome_bonus: true 
            }])
            .select()
            .single();

          if (newProfile) setBalance(newProfile.balance);
        } else if (profile) {
          setBalance(profile.balance);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (supabaseUrl && supabaseAnonKey) {
      initUser();
    } else {
      setLoading(false);
    }
  }, []);

  const useTokens = async (amount: number) => {
    if (balance >= amount && deviceId) {
      const newBalance = balance - amount;
      const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('device_fingerprint', deviceId);

      if (!error) {
        setBalance(newBalance);
        return true;
      }
    }
    return false;
  };

  const addTokens = async (amount: number) => {
    if (deviceId) {
      const newBalance = balance + amount;
      const { error } = await supabase
        .from('profiles')
        .update({ balance: newBalance })
        .eq('device_fingerprint', deviceId);

      if (!error) setBalance(newBalance);
    }
  };

  return (
    <TokenContext.Provider value={{ balance, loading, useTokens, addTokens }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokens = () => {
  const context = useContext(TokenContext);
  if (!context) throw new Error("useTokens must be used within TokenProvider");
  return context;
};

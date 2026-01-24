"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { th } from '@/locales/th';
import { en } from '@/locales/en';

type Language = 'th' | 'en';
type Translations = typeof en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    dict: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { th, en };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('th');
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem('kumopack_lang') as Language;
        if (savedLang && (savedLang === 'th' || savedLang === 'en')) {
            setLanguageState(savedLang);
        }
        setIsHydrated(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('kumopack_lang', lang);
    };

    const t = (key: string): string => {
        const keys = key.split('.');
        let result: any = translations[language];

        for (const k of keys) {
            if (result && result[k]) {
                result = result[k];
            } else {
                return key; // Fallback to key if not found
            }
        }

        return typeof result === 'string' ? result : key;
    };

    // To prevent hydration mismatch, we can return the children with default language 
    // but we must be careful with UI elements that change.
    // However, the best practice for client-only changes like language based on localStorage
    // is to wait for hydration or use cookies.
    // For this mock, we'll just ensure components check for isHydrated if needed.

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dict: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

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
        // Source of truth priority: 1. URL (?lang=), 2. LocalStorage, 3. Default (th)
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang') as Language;
        const savedLang = localStorage.getItem('kumopack_lang') as Language;

        const initialLang = (urlLang && ['th', 'en'].includes(urlLang)) ? urlLang :
            (savedLang && ['th', 'en'].includes(savedLang)) ? savedLang : 'th';

        if (initialLang !== language) {
            setLanguageState(initialLang);
        }
        setIsHydrated(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('kumopack_lang', lang);
    };

    const t = (key: string): string => {
        if (!isHydrated) return ''; // Avoid mismatch until hydrated
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

    return (
        <LanguageContext.Provider value={{
            language,
            setLanguage,
            t,
            dict: translations[language]
        }}>
            <div style={{ visibility: isHydrated ? 'visible' : 'hidden' }}>
                {children}
            </div>
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

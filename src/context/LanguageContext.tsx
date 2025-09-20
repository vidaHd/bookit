import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import i18n from "../i18n";

type Language = "en" | "fa";
type Theme = "light" | "dark";

interface AppContextProps {
  language: Language;
  changeLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

   useEffect(() => {
    document.documentElement.setAttribute("dir", language === "fa" ? "rtl" : "ltr");
    document.documentElement.setAttribute("data-theme", theme);
  }, [language, theme]);

  return (
    <AppContext.Provider
      value={{ language, changeLanguage, theme, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};

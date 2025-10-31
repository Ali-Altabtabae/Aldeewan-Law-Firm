import { Link } from "react-router-dom";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-elegant">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/approved-logo-zoomed-in.png"
              alt="Al-Najah Law Firm Logo"
              className="w-18 h-10 rounded-md"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-primary-foreground hover:text-[#e7e7e7] transition-colors font-medium"
            >
              {t("nav.home")}
            </Link>
            <Link
              to="/lawyers"
              className="text-primary-foreground hover:text-[#e7e7e7] transition-colors font-medium"
            >
              {t("nav.lawyers")}
            </Link>
            <Link
              to="/journals"
              className="text-primary-foreground hover:text-[#e7e7e7] transition-colors font-medium"
            >
              {t("nav.journals")}
            </Link>
            <Link
              to="/videos"
              className="text-primary-foreground hover:text-[#e7e7e7] transition-colors font-medium"
            >
              {t("nav.videos")}
            </Link>
          </div>

          {/* Right Icons + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:text-[#e7e7e7] hover:bg-primary/80"
            >
              <Globe className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-primary-foreground hover:text-[#e7e7e7] hover:bg-primary/80 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* Desktop Admin Button */}
            <Link to="/admin/login" className="hidden md:block">
              <Button
                variant="secondary"
                className="bg-primary text-primary-foreground hover:text-[#e7e7e7] hover:bg-primary/80 transition-colors"
              >
                {t("nav.admin")}
              </Button>
            </Link>

            {/* Mobile Menu Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden text-primary-foreground hover:bg-primary/80"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center gap-4 py-4 bg-primary/95 text-primary-foreground rounded-b-lg shadow-md animate-slide-down">
            <Link to="/" onClick={() => setMenuOpen(false)}>{t("nav.home")}</Link>
            <Link to="/lawyers" onClick={() => setMenuOpen(false)}>{t("nav.lawyers")}</Link>
            <Link to="/journals" onClick={() => setMenuOpen(false)}>{t("nav.journals")}</Link>
            <Link to="/videos" onClick={() => setMenuOpen(false)}>{t("nav.videos")}</Link>
            <Link to="/admin/login" onClick={() => setMenuOpen(false)}>
              <Button
                variant="secondary"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80"
              >
                {t("nav.admin")}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

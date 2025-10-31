import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Scale } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/api/adminApi";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);

      // Save the token locally so admin stays logged in
      localStorage.setItem("adminToken", data.token);

      toast({
        title: language === "en" ? "Login Successful" : "تم تسجيل الدخول بنجاح",
        description:
          language === "en"
            ? "Welcome to the admin dashboard"
            : "مرحباً بك في لوحة التحكم",
      });

      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: language === "en" ? "Login Failed" : "فشل تسجيل الدخول",
        description:
          language === "en"
            ? error.message || "Please check your credentials"
            : "يرجى التحقق من بيانات الاعتماد",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-primary p-3 rounded-lg transition-transform duration-300 group-hover:scale-110">
                <Scale className="w-8 h-8 text-primary-foreground" />
              </div>
            </Link>
          </div>
          <CardTitle className="text-3xl font-serif text-primary">
            {t("admin.login")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("admin.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("admin.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("admin.password")}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t("admin.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? t("common.loading") : t("admin.signin")}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/">
              <Button variant="ghost">
                {language === "en" ? "Back to Home" : "العودة للرئيسية"}
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;

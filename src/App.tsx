import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Lawyers from "./pages/Lawyers";
import LawyerProfile from "./pages/LawyerProfile";
import Journals from "./pages/Journals";
import JournalDetail from "./pages/JournalDetail";
import Videos from "./pages/Videos";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";
import AdminLawyers from "./pages/admin/AdminLawyers";
import AdminJournals from "@/pages/admin/AdminJournals";
import AdminVideos from "@/pages/admin/AdminVideos";
import VideoForm from "@/components/forms/VideoForm";
import JournalForm from "@/components/forms/JournalForm";
import LawyerForm from "@/components/forms/LawyerForm";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    // Check if the user has already seen the loader this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");

    if (hasLoaded) {
      // Skip the loader if already seen
      setLoading(false);
    } else {
      // Show loader and mark as seen
      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasLoaded", "true");
      }, 2500); // Adjust duration if needed
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Loader />; // show bilingual loader before app mounts
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/lawyers" element={<Lawyers />} />
                <Route path="/lawyers/:id" element={<LawyerProfile />} />
                <Route path="/journals" element={<Journals />} />
                <Route path="/journals/:id" element={<JournalDetail />} />
                <Route path="/videos" element={<Videos />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/lawyers" element={<AdminLawyers />} />
                <Route path="/admin/journals" element={<AdminJournals />} />
                <Route path="/admin/videos" element={<AdminVideos />} />

                <Route path="/admin/lawyers/add" element={<LawyerForm mode="add" />} />
                <Route path="/admin/lawyers/edit/:id" element={<LawyerForm mode="edit" />} />
                <Route path="/admin/journals/add" element={<JournalForm mode="add" />} />
                <Route path="/admin/journals/edit/:id" element={<JournalForm mode="edit" />} />
                <Route path="/admin/videos/add" element={<VideoForm mode="add" />} />
                <Route path="/admin/videos/edit/:id" element={<VideoForm mode="edit" />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;

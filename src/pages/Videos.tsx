import { ExternalLink, Calendar, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getVideos } from "@/api/videoApi";
import { Video } from "@/types/Video";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Videos = () => {
  const { language, t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideos()
      .then(setVideos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "en" ? "en-US" : "ar-AE",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            {t("videos.title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("videos.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <Card
              key={video._id}
              className="overflow-hidden border-2 hover:border-accent hover:shadow-hover transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={video.thumbnail_url}
                  alt={language === "en" ? video.title_en : video.title_ar}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1" />
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-2 text-primary group-hover:text-accent transition-colors">
                  {language === "en" ? video.title_en : video.title_ar}
                </h3>

                <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>
                      {language === "en"
                        ? video.lawyer_name_en
                        : video.lawyer_name_ar}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(video.published_date)}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {language === "en"
                    ? video.description_en
                    : video.description_ar}
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex justify-center gap-3 border-t border-border pt-4">
                <a
                  href={video.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                    {t("videos.watch")}
                    <ExternalLink
                      className={`${
                        language === "ar" ? "mr-2" : "ml-2"
                      } w-4 h-4`}
                    />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Videos;

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-8 text-center p-4">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t('home.welcome')}
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          {t('home.subtitle')}
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/influencer">
          <Button size="lg" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>{t('home.influencer_btn')}</span>
            <span className="text-xs font-normal opacity-80">{t('home.influencer_desc')}</span>
          </Button>
        </Link>
        <Link to="/consumer">
          <Button size="lg" variant="secondary" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>{t('home.consumer_btn')}</span>
            <span className="text-xs font-normal opacity-80">{t('home.consumer_desc')}</span>
          </Button>
        </Link>
        <Link to="/admin">
          <Button size="lg" variant="outline" className="h-24 w-48 text-lg flex flex-col gap-2">
            <span>{t('home.admin_btn')}</span>
            <span className="text-xs font-normal opacity-80">{t('home.admin_desc')}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

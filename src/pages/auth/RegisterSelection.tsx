import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function RegisterSelection() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        if (user.role === 'influencer') navigate('/influencer', { replace: true });
        else if (user.role === 'admin') navigate('/admin', { replace: true });
        else navigate('/consumer', { replace: true });
    }
  }, [user, navigate]);

  if (user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">{t('auth.join_us')}</h1>
        <p className="text-muted-foreground">{t('auth.select_account_type')}</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl justify-center">
        {/* Influencer Card */}
        <Link to="/register/influencer" className="flex-1 flex">
          <Card className="flex-1 flex flex-col hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-2xl">{t('auth.influencer_title')}</CardTitle>
              <CardDescription>{t('auth.influencer_subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>{t('auth.influencer_feat_1')}</li>
                <li>{t('auth.influencer_feat_2')}</li>
                <li>{t('auth.influencer_feat_3')}</li>
              </ul>
              <Button className="w-full mt-6">{t('auth.join_as_influencer')}</Button>
            </CardContent>
          </Card>
        </Link>

        {/* Consumer Card */}
        <Link to="/register/consumer" className="flex-1 flex">
          <Card className="flex-1 flex flex-col hover:border-primary transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-2xl">{t('auth.consumer_title')}</CardTitle>
              <CardDescription>{t('auth.consumer_subtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>{t('auth.consumer_feat_1')}</li>
                <li>{t('auth.consumer_feat_2')}</li>
                <li>{t('auth.consumer_feat_3')}</li>
              </ul>
              <Button className="w-full mt-6" variant="secondary">{t('auth.join_as_consumer')}</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {t('auth.already_have_account')} <Link to="/login" className="underline text-foreground">{t('auth.login_link')}</Link>
      </div>
    </div>
  );
}

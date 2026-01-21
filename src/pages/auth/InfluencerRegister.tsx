import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export default function InfluencerRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user) {
        if (user.role === 'influencer') navigate('/influencer', { replace: true });
        else if (user.role === 'admin') navigate('/admin', { replace: true });
        else navigate('/consumer', { replace: true });
    }
  }, [user, navigate]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    instagram: '',
    tiktok: '',
    niche: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleNicheChange = (value: string) => {
    setFormData(prev => ({ ...prev, niche: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'influencer'
      });
      // In a real app, we might save the extra profile fields to a separate profile table
      console.log('Registered influencer with details:', formData);
      navigate('/login'); // Redirect to login
    } catch (err) {
      setError('Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4 my-8">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{t('auth.influencer_reg_title')}</CardTitle>
          <CardDescription>{t('auth.influencer_reg_desc')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">{t('auth.name')}</label>
              <Input id="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">{t('auth.email')}</label>
              <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">{t('auth.password')}</label>
              <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="instagram" className="text-sm font-medium">{t('auth.instagram')}</label>
                <Input id="instagram" placeholder="@username" value={formData.instagram} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label htmlFor="tiktok" className="text-sm font-medium">{t('auth.tiktok')}</label>
                <Input id="tiktok" placeholder="@username" value={formData.tiktok} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="niche" className="text-sm font-medium">{t('auth.niche')}</label>
              <Select onValueChange={handleNicheChange} value={formData.niche}>
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.select_niche')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">{t('niche.fashion')}</SelectItem>
                  <SelectItem value="beauty">{t('niche.beauty')}</SelectItem>
                  <SelectItem value="tech">{t('niche.tech')}</SelectItem>
                  <SelectItem value="food">{t('niche.food')}</SelectItem>
                  <SelectItem value="travel">{t('niche.travel')}</SelectItem>
                  <SelectItem value="lifestyle">{t('niche.lifestyle')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? t('auth.registering') : t('auth.register_btn')}
            </Button>
            <div className="text-center text-sm">
              {t('auth.already_have_account')} <Link to="/login" className="underline">{t('auth.login_link')}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

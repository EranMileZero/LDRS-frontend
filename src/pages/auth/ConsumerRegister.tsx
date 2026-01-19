import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function ConsumerRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register({
        name: formData.name,
        email: formData.email,
        role: 'consumer'
      });
      navigate('/consumer');
    } catch (err) {
      setError('Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.consumer_reg_title')}</CardTitle>
          <CardDescription>{t('auth.consumer_reg_desc')}</CardDescription>
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

          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading} variant="secondary">
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

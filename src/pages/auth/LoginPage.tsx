import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Password not used in mock, but good for UI
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // For mock login, we might need to guess the role or just try to find the user
      // For simplicity in mock, let's assume if email contains 'influencer' they are influencer
      // or check against mock data in context (which logic is inside login function)
      // But wait, my login function takes (email, role). 
      // I should probably simplify login to just email for the mock, OR ask for role in login too?
      // Usually login is just email/password and backend determines role.
      // I'll update AuthContext later if needed, but for now I'll try to guess or use a default role.
      // Actually, let's just pass a dummy role and let the mock logic handle the lookup or creation.
      // But my mock logic was: find user by email AND role. 
      // I'll fix the login page to just try to login, maybe iterate roles or the AuthContext should handle "Login by Email"
      
      // Let's assume standard consumer for unknown emails, or try to find in USERS array if I exported it here.
      // Better approach: Update AuthContext to find user by email only.
      // For now, I'll hardcode 'consumer' unless email has 'influencer'.
      
      await login(email);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t('auth.login_title')}</CardTitle>
          <CardDescription>{t('auth.login_desc')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t('auth.email')}
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('auth.password')}
                </label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? t('auth.logging_in') : t('auth.login_btn')}
            </Button>
            <div className="text-center text-sm">
              {t('auth.no_account')} <Link to="/register" className="underline">{t('auth.register_link')}</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

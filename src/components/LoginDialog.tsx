
import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LoginDialog = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuleer login/registratie
    if (isLogin) {
      // Login logica
      setIsLoggedIn(true);
      setUserName(email.split('@')[0]);
    } else {
      // Registratie logica
      setIsLoggedIn(true);
      setUserName(name);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
    setPassword('');
    setName('');
  };

  if (isLoggedIn) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
            <User className="w-4 h-4 mr-2" />
            {userName}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profiel</DialogTitle>
            <DialogDescription>
              Beheer je account en instellingen.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Welkom, {userName}!</CardTitle>
                <CardDescription>
                  Je bent succesvol ingelogd op Yaro.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  Mijn Verhalen
                </Button>
                <Button variant="outline" className="w-full border-orange-200">
                  Favorieten
                </Button>
                <Button variant="outline" className="w-full border-orange-200">
                  Instellingen
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-600 hover:text-gray-800"
                  onClick={handleLogout}
                >
                  Uitloggen
                </Button>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
          <User className="w-4 h-4 mr-2" />
          Inloggen
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Inloggen' : 'Account Aanmaken'}</DialogTitle>
          <DialogDescription>
            {isLogin 
              ? 'Log in om je verhalen te beheren en favorieten op te slaan.'
              : 'Maak een account aan om verhalen te delen en je favorieten op te slaan.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                type="text"
                placeholder="Je volledige naam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="email"
                type="email"
                placeholder="je@email.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Wachtwoord</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="pl-10 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
            {isLogin ? 'Inloggen' : 'Account Aanmaken'}
          </Button>
        </form>
        
        <div className="text-center space-y-3">
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 hover:text-orange-700"
          >
            {isLogin 
              ? 'Nog geen account? Registreer hier' 
              : 'Al een account? Log hier in'
            }
          </Button>
          
          {isLogin && (
            <Button variant="link" className="text-gray-500 hover:text-gray-700 text-sm">
              Wachtwoord vergeten?
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;

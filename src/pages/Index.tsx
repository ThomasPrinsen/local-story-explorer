import React, { useState } from 'react';
import { MapPin, Users, DollarSign, AlertTriangle, Plus, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from '@/components/InteractiveMap';
import LocalStories from '@/components/LocalStories';
import TravelTips from '@/components/TravelTips';
import CulturalGuide from '@/components/CulturalGuide';
import LoginDialog from '@/components/LoginDialog';

const Index = () => {
  const [activeSection, setActiveSection] = useState('map');
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'map', label: 'Kaart', icon: MapPin },
    { id: 'stories', label: 'Verhalen', icon: Users },
    { id: 'tips', label: 'Budget & Tips', icon: DollarSign },
    { id: 'culture', label: 'Do\'s & Don\'ts', icon: AlertTriangle },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'map':
        return <InteractiveMap />;
      case 'stories':
        return <LocalStories />;
      case 'tips':
        return <TravelTips />;
      case 'culture':
        return <CulturalGuide />;
      default:
        return <InteractiveMap />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Yaro</h1>
                <p className="text-sm text-gray-600">Respectvol Reizen met Lokale Verhalen</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LoginDialog />
              <Button 
                variant="outline" 
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
                onClick={() => navigate('/verhaal-delen')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Verhaal Delen
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/60 backdrop-blur-sm border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? 'bg-orange-100 text-orange-700 shadow-sm'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="animate-fade-in">
          {renderActiveSection()}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-100 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Over Yaro</h3>
              <p className="text-gray-600 text-sm">
                Verbind met lokale bewoners en ontdek authentieke reiservaren door hun verhalen, tips en culturele inzichten.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Functies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Interactieve kaart</li>
                <li>• Verhalen van locals</li>
                <li>• Budget tips</li>
                <li>• Culturele richtlijnen</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Toegankelijkheid</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Meertalig</Badge>
                <Badge variant="secondary">Ondertiteling</Badge>
                <Badge variant="secondary">Audio</Badge>
                <Badge variant="secondary">Visueel</Badge>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

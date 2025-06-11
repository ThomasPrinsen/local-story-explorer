
import React, { useState } from 'react';
import { MapPin, Users, Play, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: 1,
      name: 'Amsterdam Centrum',
      country: 'Nederland',
      locals: 12,
      stories: 8,
      x: '65%',
      y: '30%',
      avatar: '👨‍🎨',
      previewStory: 'Ontdek de verborgen grachten die alleen locals kennen...'
    },
    {
      id: 2,
      name: 'Barcelona Gothic',
      country: 'Spanje',
      locals: 18,
      stories: 15,
      x: '45%',
      y: '55%',
      avatar: '👩‍🍳',
      previewStory: 'De beste tapas vind je niet in de toeristische zones...'
    },
    {
      id: 3,
      name: 'Tokyo Shibuya',
      country: 'Japan',
      locals: 24,
      stories: 22,
      x: '85%',
      y: '45%',
      avatar: '👨‍💼',
      previewStory: 'Hoe je je respectvol gedraagt in onze tempels...'
    },
    {
      id: 4,
      name: 'Marrakech Medina',
      country: 'Marokko',
      locals: 9,
      stories: 11,
      x: '48%',
      y: '65%',
      avatar: '👳‍♂️',
      previewStory: 'Onderhandelen op de markt: een kunst die je moet leren...'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Ontdek de Wereld Door Lokale Ogen</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Klik op de verhalen van lokale bewoners om authentieke tips, culturele inzichten en verborgen parels te ontdekken.
        </p>
      </div>

      {/* Interactive Map */}
      <div className="relative">
        <Card className="overflow-hidden shadow-lg border-0">
          <CardContent className="p-0">
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 h-96 md:h-[500px] overflow-hidden">
              {/* World Map Background */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 1000 500" className="w-full h-full">
                  {/* Simplified world map shapes */}
                  <path d="M150 150 Q200 140 250 160 L300 180 Q350 170 400 190 L450 200 Q500 190 550 210 L600 220 Q650 210 700 230 L750 240 Q800 230 850 250 L900 260" 
                        stroke="currentColor" strokeWidth="2" fill="none" className="text-blue-300" />
                  <path d="M100 200 Q150 190 200 210 L250 230 Q300 220 350 240 L400 250 Q450 240 500 260" 
                        stroke="currentColor" strokeWidth="2" fill="none" className="text-green-300" />
                </svg>
              </div>

              {/* Location Markers */}
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: location.x, top: location.y }}
                  onClick={() => setSelectedLocation(location)}
                >
                  {/* Pulse Animation */}
                  <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping opacity-75"></div>
                  
                  {/* Main Marker */}
                  <div className="relative w-12 h-12 bg-white rounded-full shadow-lg border-3 border-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <span className="text-lg">{location.avatar}</span>
                  </div>

                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-lg p-3 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <h4 className="font-semibold text-gray-900">{location.name}</h4>
                    <p className="text-sm text-gray-600">{location.country}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />
                        {location.locals} locals
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {location.stories} verhalen
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Location Details */}
        {selectedLocation && (
          <Card className="mt-4 shadow-lg border-orange-200 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{selectedLocation.avatar}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedLocation.name}</h3>
                      <p className="text-gray-600">{selectedLocation.country}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedLocation.previewStory}</p>
                  <div className="flex items-center gap-3">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Play className="w-4 h-4 mr-2" />
                      Verhaal Bekijken
                    </Button>
                    <Button variant="outline" className="border-orange-200 text-orange-700">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Audio Beluisteren
                    </Button>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-6 border-orange-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
          <div className="text-gray-600">Lokale Verhalen</div>
        </Card>
        <Card className="text-center p-6 border-orange-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">42</div>
          <div className="text-gray-600">Steden</div>
        </Card>
        <Card className="text-center p-6 border-orange-100">
          <div className="text-3xl font-bold text-orange-600 mb-2">89</div>
          <div className="text-gray-600">Locals</div>
        </Card>
      </div>
    </div>
  );
};

export default MapView;

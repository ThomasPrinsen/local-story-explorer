
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Volume2, Users, X, MapPin } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  country: string;
  city: string;
  avatar: string;
  previewStory: string;
  locals: number;
  stories: number;
  lat: number;
  lng: number;
}

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const stories: Story[] = [
    {
      id: 1,
      name: 'Amsterdam Centrum',
      country: 'Nederland',
      city: 'Amsterdam',
      locals: 12,
      stories: 8,
      avatar: '👨‍🎨',
      previewStory: 'Ontdek de verborgen grachten die alleen locals kennen...',
      lat: 52.3676,
      lng: 4.9041
    },
    {
      id: 2,
      name: 'Barcelona Gothic',
      country: 'Spanje',
      city: 'Barcelona',
      locals: 18,
      stories: 15,
      avatar: '👩‍🍳',
      previewStory: 'De beste tapas vind je niet in de toeristische zones...',
      lat: 41.3851,
      lng: 2.1734
    },
    {
      id: 3,
      name: 'Tokyo Shibuya',
      country: 'Japan',
      city: 'Tokyo',
      locals: 24,
      stories: 22,
      avatar: '👨‍💼',
      previewStory: 'Hoe je je respectvol gedraagt in onze tempels...',
      lat: 35.6762,
      lng: 139.6503
    },
    {
      id: 4,
      name: 'Marrakech Medina',
      country: 'Marokko',
      city: 'Marrakech',
      locals: 9,
      stories: 11,
      avatar: '👳‍♂️',
      previewStory: 'Onderhandelen op de markt: een kunst die je moet leren...',
      lat: 31.6295,
      lng: -7.9811
    },
    {
      id: 5,
      name: 'Paris Montmartre',
      country: 'Frankrijk',
      city: 'Parijs',
      locals: 15,
      stories: 12,
      avatar: '🥖',
      previewStory: 'De beste croissants van Parijs vind je niet bij de Eiffeltoren...',
      lat: 48.8566,
      lng: 2.3522
    },
    {
      id: 6,
      name: 'New York Manhattan',
      country: 'Verenigde Staten',
      city: 'New York',
      locals: 31,
      stories: 28,
      avatar: '🗽',
      previewStory: 'Echte New Yorkers vertellen je waar de beste pizza is...',
      lat: 40.7128,
      lng: -74.0060
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [20, 20],
        zoom: 2,
        projection: 'globe' as any
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      // Add atmosphere
      map.current.on('style.load', () => {
        if (map.current) {
          map.current.setFog({
            color: 'rgb(186, 210, 235)',
            'high-color': 'rgb(36, 92, 223)',
            'horizon-blend': 0.02,
            'space-color': 'rgb(11, 11, 25)',
            'star-intensity': 0.6
          });
        }
      });

      // Add story markers
      stories.forEach((story) => {
        const el = document.createElement('div');
        el.className = 'story-marker';
        el.style.cssText = `
          width: 40px;
          height: 40px;
          background: white;
          border: 3px solid #f97316;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.2s ease;
        `;
        el.innerHTML = story.avatar;
        
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.1)';
        });
        
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
        });
        
        el.addEventListener('click', () => {
          setSelectedStory(story);
        });

        if (map.current) {
          new mapboxgl.Marker(el)
            .setLngLat([story.lng, story.lat])
            .addTo(map.current);
        }
      });

      setShowTokenInput(false);
    } catch (error) {
      console.error('Error initializing map:', error);
      alert('Er was een probleem met het laden van de kaart. Controleer je Mapbox token.');
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      initializeMap(mapboxToken);
    } else {
      alert('Voer een geldige Mapbox token in');
    }
  };

  useEffect(() => {
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Ontdek de Wereld Door Lokale Ogen</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Voor de interactieve wereldkaart hebben we een Mapbox token nodig.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mapbox Public Token
                </label>
                <input
                  type="text"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6I..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <Button 
                onClick={handleTokenSubmit}
                className="w-full bg-orange-500 hover:bg-orange-600"
              >
                Kaart Laden
              </Button>
              <div className="text-sm text-gray-500">
                <p>Ga naar <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">mapbox.com</a> om een gratis account aan te maken en je token te krijgen.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <div 
              ref={mapContainer} 
              className="w-full h-96 md:h-[500px]"
              style={{ minHeight: '400px' }}
            />
          </CardContent>
        </Card>

        {/* Selected Story Details */}
        {selectedStory && (
          <Card className="mt-4 shadow-lg border-orange-200 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{selectedStory.avatar}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedStory.name}</h3>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedStory.city}, {selectedStory.country}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedStory.previewStory}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      {selectedStory.locals} locals
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {selectedStory.stories} verhalen
                    </Badge>
                  </div>
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
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
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

export default InteractiveMap;

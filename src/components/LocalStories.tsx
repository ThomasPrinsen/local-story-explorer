
import React, { useState } from 'react';
import { Play, Volume2, Image, MapPin, Heart, Share } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LocalStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const stories = [
    {
      id: 1,
      title: 'De Verborgen Grachten van Amsterdam',
      author: 'Pieter de Vries',
      location: 'Amsterdam, Nederland',
      type: 'video',
      duration: '3:42',
      thumbnail: '🏛️',
      likes: 234,
      category: 'Cultuur',
      preview: 'Ontdek de geheime plekjes die alleen echte Amsterdammers kennen. Ik neem je mee langs vergeten grachten en vertel over de geschiedenis die je niet in gidsen vindt.',
      tags: ['Geschiedenis', 'Architectuur', 'Verborgen Plekken']
    },
    {
      id: 2,
      title: 'Authentieke Tapas Routes in Barcelona',
      author: 'Maria González',
      location: 'Barcelona, Spanje',
      type: 'audio',
      duration: '5:12',
      thumbnail: '🥘',
      likes: 189,
      category: 'Eten & Drinken',
      preview: 'Vergeet de toeristische plekken! Ik deel mijn familie\'s geheime tapas bars waar echte Catalans komen. Plus tips over etiquette en wat je absoluut moet proberen.',
      tags: ['Lokaal Eten', 'Familie Traditie', 'Tapas']
    },
    {
      id: 3,
      title: 'Tempelbezoek Etiquette in Tokyo',
      author: 'Hiroshi Tanaka',
      location: 'Tokyo, Japan',
      type: 'foto',
      duration: '2:30',
      thumbnail: '⛩️',
      likes: 312,
      category: 'Religie & Tradities',
      preview: 'Respectvol bezoeken van heilige plaatsen is essentieel in Japan. Ik leg uit hoe je je gedraagt, wat je draagt en waarom deze tradities zo belangrijk zijn voor ons.',
      tags: ['Respect', 'Tradities', 'Spiritualiteit']
    },
    {
      id: 4,
      title: 'Onderhandelen op de Marrakech Souk',
      author: 'Ahmed El Mansouri',
      location: 'Marrakech, Marokko',
      type: 'video',
      duration: '4:15',
      thumbnail: '🏺',
      likes: 267,
      category: 'Handel & Markten',
      preview: 'Onderhandelen is een kunst en onderdeel van onze cultuur. Ik leer je de do\'s en don\'ts, zodat je respectvol kunt handelen en faire prijzen krijgt.',
      tags: ['Onderhandelen', 'Markt', 'Respect']
    }
  ];

  const categories = ['Alle', 'Cultuur', 'Eten & Drinken', 'Religie & Tradities', 'Handel & Markten'];
  const [selectedCategory, setSelectedCategory] = useState('Alle');

  const filteredStories = selectedCategory === 'Alle' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'audio': return <Volume2 className="w-4 h-4" />;
      case 'foto': return <Image className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Verhalen van Locals</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Authentieke verhalen, tips en culturele inzichten van mensen die er echt wonen.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category 
              ? "bg-orange-500 hover:bg-orange-600" 
              : "border-orange-200 text-orange-700 hover:bg-orange-50"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <Card 
            key={story.id} 
            className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-orange-100 hover:border-orange-200"
            onClick={() => setSelectedStory(story)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-xs">
                  {story.category}
                </Badge>
                <div className="flex items-center gap-1 text-gray-500">
                  {getTypeIcon(story.type)}
                  <span className="text-xs">{story.duration}</span>
                </div>
              </div>
              
              {/* Thumbnail */}
              <div className="relative bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-8 text-center mb-3 group-hover:scale-105 transition-transform duration-200">
                <span className="text-4xl">{story.thumbnail}</span>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-200 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {getTypeIcon(story.type)}
                  </div>
                </div>
              </div>

              <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                {story.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {story.location}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-3">
                  {story.preview}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {story.author}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart className="w-4 h-4" />
                    {story.likes}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-orange-200 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Story Modal/Detail View */}
      {selectedStory && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto animate-scale-in">
          <CardHeader className="border-b border-orange-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{selectedStory.thumbnail}</span>
                  <div>
                    <CardTitle className="text-2xl">{selectedStory.title}</CardTitle>
                    <p className="text-gray-600">door {selectedStory.author}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedStory.location}
                  </div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(selectedStory.type)}
                    {selectedStory.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {selectedStory.likes} likes
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Story Content */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-8 text-center">
                <span className="text-8xl mb-4 block">{selectedStory.thumbnail}</span>
                <p className="text-lg text-gray-700 mb-6">{selectedStory.preview}</p>
                
                <div className="flex gap-3 justify-center">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    {getTypeIcon(selectedStory.type)}
                    <span className="ml-2">
                      {selectedStory.type === 'video' && 'Video Afspelen'}
                      {selectedStory.type === 'audio' && 'Audio Beluisteren'}
                      {selectedStory.type === 'foto' && 'Foto\'s Bekijken'}
                    </span>
                  </Button>
                  <Button variant="outline" className="border-orange-200 text-orange-700">
                    <Share className="w-4 h-4 mr-2" />
                    Delen
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-semibold mb-2">Onderwerpen</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStory.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-orange-200 text-orange-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background Overlay for Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default LocalStories;

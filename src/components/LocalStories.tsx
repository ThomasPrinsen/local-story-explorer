
import React, { useState } from 'react';
import { Play, Volume2, Heart, MessageCircle, Share2, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FilterMenu from './FilterMenu';

const LocalStories = () => {
  const [filters, setFilters] = useState({ continent: '', country: '', city: '' });

  const stories = [
    // Europa - Nederland
    {
      id: 1,
      title: 'De verborgen grachten van Amsterdam',
      author: 'Emma van der Berg',
      location: 'Amsterdam, Nederland',
      continent: 'Europa',
      country: 'Nederland',
      city: 'Amsterdam',
      avatar: '👩‍🎨',
      preview: 'Ontdek de rustige grachten waar toeristen nooit komen. Ik deel mijn favoriete plekjes voor een authentieke Amsterdam-ervaring.',
      duration: '4:23',
      likes: 156,
      comments: 23,
      type: 'video',
      tags: ['verborgen plekken', 'grachten', 'fotografie']
    },
    {
      id: 2,
      title: 'Fietsen door Utrecht als een local',
      author: 'Pieter Janssen',
      location: 'Utrecht, Nederland',
      continent: 'Europa',
      country: 'Nederland',
      city: 'Utrecht',
      avatar: '🚴‍♂️',
      preview: 'Vermijd de drukte en ontdek de mooiste fietsroutes door Utrecht. Van geheime hofjes tot de beste koffieplekjes.',
      duration: '5:12',
      likes: 98,
      comments: 15,
      type: 'video',
      tags: ['fietsen', 'routes', 'koffie']
    },
    // Europa - Spanje
    {
      id: 3,
      title: 'Tapas eten zoals een echte Barcelonees',
      author: 'Carlos Rodriguez',
      location: 'Barcelona, Spanje',
      continent: 'Europa',
      country: 'Spanje',
      city: 'Barcelona',
      avatar: '👨‍🍳',
      preview: 'Vergeet de toeristische tapas bars! Ik laat je zien waar locals werkelijk eten en hoe je respectvol omgaat met onze eetcultuur.',
      duration: '6:15',
      likes: 289,
      comments: 45,
      type: 'video',
      tags: ['eten', 'cultuur', 'locals']
    },
    {
      id: 4,
      title: 'Flamenco in de wijken van Sevilla',
      author: 'María González',
      location: 'Sevilla, Spanje',
      continent: 'Europa',
      country: 'Spanje',
      city: 'Sevilla',
      avatar: '💃',
      preview: 'Echte flamenco vind je niet in shows voor toeristen. Kom mee naar de wijken waar deze passie echt leeft.',
      duration: '7:30',
      likes: 221,
      comments: 38,
      type: 'video',
      tags: ['flamenco', 'cultuur', 'muziek']
    },
    // Europa - Frankrijk
    {
      id: 5,
      title: 'Boulangeries van Montmartre',
      author: 'Sophie Dubois',
      location: 'Parijs, Frankrijk',
      continent: 'Europa',
      country: 'Frankrijk',
      city: 'Parijs',
      avatar: '🥖',
      preview: 'De beste croissants van Parijs vind je niet bij de Eiffeltoren. Ontdek de authentieke boulangeries van Montmartre.',
      duration: '4:45',
      likes: 167,
      comments: 29,
      type: 'audio',
      tags: ['brood', 'eten', 'tradities']
    },
    // Europa - Italië
    {
      id: 6,
      title: 'Venetië zonder de massa\'s',
      author: 'Marco Rossini',
      location: 'Venetië, Italië',
      continent: 'Europa',
      country: 'Italië',
      city: 'Venetië',
      avatar: '🛶',
      preview: 'Vroeg opstaan loont in Venetië. Ik toon je hoe je onze stad kunt ervaren voordat de cruiseschepen arriveren.',
      duration: '6:00',
      likes: 312,
      comments: 52,
      type: 'video',
      tags: ['vroeg opstaan', 'rustige plekken', 'fotografie']
    },
    // Azië - Japan
    {
      id: 7,
      title: 'Tempeletiquette in Kyoto',
      author: 'Yuki Tanaka',
      location: 'Kyoto, Japan',
      continent: 'Azië',
      country: 'Japan',
      city: 'Kyoto',
      avatar: '🧘‍♀️',
      preview: 'Hoe bezoek je onze heilige tempels met respect? Een lokale gids over do\'s en don\'ts bij tempelbezoeken.',
      duration: '3:45',
      likes: 134,
      comments: 18,
      type: 'audio',
      tags: ['cultuur', 'religie', 'respect']
    },
    {
      id: 8,
      title: 'Sushi etiquette in Tokyo',
      author: 'Hiroshi Sato',
      location: 'Tokyo, Japan',
      continent: 'Azië',
      country: 'Japan',
      city: 'Tokyo',
      avatar: '🍣',
      preview: 'Leer hoe je respectvol sushi eet in een traditioneel restaurant. Van wasabi gebruik tot het betalen van de rekening.',
      duration: '5:20',
      likes: 198,
      comments: 31,
      type: 'video',
      tags: ['sushi', 'etiquette', 'restaurants']
    },
    // Azië - Thailand
    {
      id: 9,
      title: 'Tempels bezoeken in Bangkok',
      author: 'Somchai Patel',
      location: 'Bangkok, Thailand',
      continent: 'Azië',
      country: 'Thailand',
      city: 'Bangkok',
      avatar: '🙏',
      preview: 'Kledingregels, gedrag en donaties bij tempelbezoeken. Respectvol genieten van onze prachtige tempels.',
      duration: '4:30',
      likes: 145,
      comments: 22,
      type: 'video',
      tags: ['tempels', 'respect', 'kleding']
    },
    // Azië - India
    {
      id: 10,
      title: 'Straatvoedsel in Mumbai',
      author: 'Priya Sharma',
      location: 'Mumbai, India',
      continent: 'Azië',
      country: 'India',
      city: 'Mumbai',
      avatar: '🍛',
      preview: 'Veilig en lekker straatvoedsel in Mumbai. Welke standjes je kunt vertrouwen en hoe je bestelt als toerist.',
      duration: '6:45',
      likes: 234,
      comments: 41,
      type: 'video',
      tags: ['straatvoedsel', 'veiligheid', 'lokaal eten']
    },
    // Afrika - Marokko
    {
      id: 11,
      title: 'Onderhandelen op de markt in Marrakech',
      author: 'Ahmed Ben Ali',
      location: 'Marrakech, Marokko',
      continent: 'Afrika',
      country: 'Marokko',
      city: 'Marrakech',
      avatar: '🧙‍♂️',
      preview: 'Onderhandelen is een kunst en onderdeel van onze cultuur. Leer hoe je respectvol handelt op onze souks.',
      duration: '5:30',
      likes: 198,
      comments: 34,
      type: 'video',
      tags: ['markt', 'onderhandelen', 'cultuur']
    },
    {
      id: 12,
      title: 'Thee cultuur in Fez',
      author: 'Fatima El Mansouri',
      location: 'Fez, Marokko',
      continent: 'Afrika',
      country: 'Marokko',
      city: 'Fez',
      avatar: '🫖',
      preview: 'De kunst van het thee drinken in Marokko. Wanneer je accepteert, hoe je drinkt en wat het betekent voor onze gastvrijheid.',
      duration: '4:15',
      likes: 156,
      comments: 28,
      type: 'audio',
      tags: ['thee', 'tradities', 'gastvrijheid']
    },
    // Afrika - Zuid-Afrika
    {
      id: 13,
      title: 'Township tours in Kaapstad',
      author: 'Mandla Ndlovu',
      location: 'Kaapstad, Zuid-Afrika',
      continent: 'Afrika',
      country: 'Zuid-Afrika',
      city: 'Kaapstad',
      avatar: '🏘️',
      preview: 'Respectvolle township bezoeken. Hoe je onze gemeenschappen bezoekt zonder voyeurisme, maar met waardering.',
      duration: '7:00',
      likes: 267,
      comments: 45,
      type: 'video',
      tags: ['townships', 'respect', 'gemeenschap']
    },
    // Noord-Amerika - VS
    {
      id: 14,
      title: 'Jazz in New Orleans',
      author: 'Louis Jackson',
      location: 'New Orleans, Verenigde Staten',
      continent: 'Noord-Amerika',
      country: 'Verenigde Staten',
      city: 'New Orleans',
      avatar: '🎷',
      preview: 'Echte jazz experience in de French Quarter. Waar locals naar muziek luisteren en hoe je de cultuur respecteert.',
      duration: '5:45',
      likes: 189,
      comments: 33,
      type: 'video',
      tags: ['jazz', 'muziek', 'cultuur']
    },
    // Noord-Amerika - Canada
    {
      id: 15,
      title: 'First Nations cultuur in Vancouver',
      author: 'Sarah Littlewolf',
      location: 'Vancouver, Canada',
      continent: 'Noord-Amerika',
      country: 'Canada',
      city: 'Vancouver',
      avatar: '🪶',
      preview: 'Leer over onze First Nations erfgoed. Respectvolle manieren om onze cultuur te leren kennen en waarderen.',
      duration: '6:30',
      likes: 201,
      comments: 29,
      type: 'video',
      tags: ['first nations', 'erfgoed', 'respect']
    },
    // Zuid-Amerika - Brazilië
    {
      id: 16,
      title: 'Carnaval in Rio de Janeiro',
      author: 'Isabella Santos',
      location: 'Rio de Janeiro, Brazilië',
      continent: 'Zuid-Amerika',
      country: 'Brazilië',
      city: 'Rio de Janeiro',
      avatar: '🎭',
      preview: 'Carnaval is meer dan een feest. Leer over de geschiedenis, betekenis en hoe je respectvol meedoet.',
      duration: '8:00',
      likes: 345,
      comments: 67,
      type: 'video',
      tags: ['carnaval', 'historie', 'cultuur']
    },
    // Zuid-Amerika - Peru
    {
      id: 17,
      title: 'Coca bladeren in Cusco',
      author: 'Carlos Quispe',
      location: 'Cusco, Peru',
      continent: 'Zuid-Amerika',
      country: 'Peru',
      city: 'Cusco',
      avatar: '🌿',
      preview: 'De heilige coca plant in onze Andescultuur. Waarom het belangrijk is en hoe toeristen dit respecteren.',
      duration: '4:50',
      likes: 178,
      comments: 25,
      type: 'audio',
      tags: ['coca', 'andes', 'tradities']
    },
    // Oceanië - Australië
    {
      id: 18,
      title: 'Aboriginal cultuur in Sydney',
      author: 'David Yamirra',
      location: 'Sydney, Australië',
      continent: 'Oceanië',
      country: 'Australië',
      city: 'Sydney',
      avatar: '🪃',
      preview: 'Onze Aboriginal geschiedenis en cultuur. Respectvolle manieren om te leren over de oudste beschaving ter wereld.',
      duration: '7:15',
      likes: 223,
      comments: 38,
      type: 'video',
      tags: ['aboriginal', 'geschiedenis', 'respect']
    }
  ];

  const filteredStories = stories.filter(story => {
    if (filters.city && story.city !== filters.city) return false;
    if (filters.country && story.country !== filters.country) return false;
    if (filters.continent && story.continent !== filters.continent) return false;
    return true;
  });

  const handleFilterChange = (newFilters: { continent: string; country: string; city: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Verhalen van Locals</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Authentieke verhalen, tips en inzichten van lokale bewoners over hun stad en cultuur.
        </p>
      </div>

      {/* Filter Menu */}
      <FilterMenu onFilterChange={handleFilterChange} />

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStories.map((story) => (
          <Card key={story.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-orange-100">
            <CardContent className="p-0">
              {/* Story Header */}
              <div className="relative bg-gradient-to-r from-orange-100 to-amber-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl shadow-sm">
                      {story.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{story.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="w-3 h-3" />
                        <span>{story.author}</span>
                        <span>•</span>
                        <span>{story.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {story.type === 'video' ? '📹' : '🎧'} {story.duration}
                  </Badge>
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-3">{story.preview}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-orange-200 text-orange-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      <Play className="w-4 h-4 mr-2" />
                      {story.type === 'video' ? 'Bekijk' : 'Beluister'}
                    </Button>
                    {story.type === 'video' && (
                      <Button variant="outline" size="sm" className="border-orange-200">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Audio
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{story.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{story.comments}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Geen verhalen gevonden
          </h3>
          <p className="text-gray-600">
            Er zijn nog geen verhalen voor deze locatie. Pas je filters aan of kom later terug.
          </p>
        </div>
      )}

      {/* Call to Action */}
      <Card className="text-center p-8 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Heb jij ook een verhaal?</h3>
        <p className="text-gray-600 mb-4">
          Deel jouw lokale kennis en help reizigers jouw stad beter begrijpen.
        </p>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Verhaal Delen
        </Button>
      </Card>
    </div>
  );
};

export default LocalStories;

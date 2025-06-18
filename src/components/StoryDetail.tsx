import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Share2, User, MapPin, Bookmark, Globe, Tag, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import storiesData from '../../stories.json';

// Helper functions from LocalStories component
const getLocation = (lat: number, lng: number) => {
  const locations: { [key: string]: string } = {
    '52.3702,4.8952': 'Amsterdam, Nederland',
    '52.0907,5.1214': 'Utrecht, Nederland',
    '41.3874,2.1686': 'Barcelona, Spanje',
    '37.3891,-5.9845': 'Sevilla, Spanje',
    '48.8867,2.3431': 'Parijs, Frankrijk',
    '45.4408,12.3155': 'Venetië, Italië',
    '35.0116,135.7681': 'Kyoto, Japan',
    '35.6895,139.6917': 'Tokyo, Japan',
    '13.7563,100.5018': 'Bangkok, Thailand',
    '19.076,72.8777': 'Mumbai, India',
    '31.6295,-7.9811': 'Marrakech, Marokko',
    '34.0181,-5.0078': 'Fez, Marokko',
    '-33.9249,18.4241': 'Kaapstad, Zuid-Afrika',
    '29.9511,-90.0715': 'New Orleans, Verenigde Staten',
    '49.2827,-123.1207': 'Vancouver, Canada',
    '-22.9068,-43.1729': 'Rio de Janeiro, Brazilië',
    '-13.5319,-71.9675': 'Cusco, Peru',
    '-33.8688,151.2093': 'Sydney, Australië'
  };
  
  return locations[`${lat},${lng}`] || 'Onbekende locatie';
};

const getContinent = (lat: number, lng: number) => {
  if (lat > 35 && lng > -30 && lng < 40) return 'Europa';
  if (lat > 0 && lng > 60) return 'Azië';
  if (lat > 0 && lng < -30) return 'Noord-Amerika';
  if (lat < 0 && lng < -30) return 'Zuid-Amerika';
  if (lat < 0 && lng > 100) return 'Oceanië';
  if (lat < 35 && lat > -35 && lng > -20 && lng < 60) return 'Afrika';
  return 'Onbekend';
};

const getImageUrl = (title: string) => {
  const imageMap: { [key: string]: string } = {
    'De verborgen grachten van Amsterdam': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&h=600',
    'Fietsen door Utrecht als een local': 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&h=600',
    'Tapas eten zoals een echte Barcelonees': 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=800&h=600',
    'Flamenco in de wijken van Sevilla': 'https://images.unsplash.com/photo-1508267176112-3ee843880737?auto=format&fit=crop&w=800&h=600',
    'Boulangeries van Montmartre': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&h=600'
  };
  
  return imageMap[title] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600';
};

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the story based on the URL-friendly title
  const story = storiesData.find(
    s => s.title.toLowerCase().replace(/\s+/g, '-') === id
  );

  if (!story) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verhaal niet gevonden</h1>
        <p className="text-gray-600 mb-6">Het verhaal dat je zoekt bestaat niet of is verwijderd.</p>
        <Button onClick={() => navigate('/verhalen')}>
          Terug naar verhalen
        </Button>
      </div>
    );
  }

  const location = getLocation(story.lat, story.lng);
  const continent = getContinent(story.lat, story.lng);
  const [country] = location.split(',').map(s => s.trim());

  // Generate some dummy content based on the story title and description
  const generateContent = (title: string, description: string) => {
    return `
      ${description}

      Lokale Tips
      -----------
      • Kom vroeg in de ochtend voor de beste ervaring
      • Neem de tijd om met locals te praten
      • Respecteer lokale gebruiken en tradities

      Beste Tijd om te Bezoeken
      ------------------------
      De locals raden aan om in het laagseizoen te komen voor de meest authentieke ervaring.
      Vermijd de drukte van het hoogseizoen en geniet van persoonlijke interactie met bewoners.

      Culturele Context
      ---------------
      ${title} is meer dan alleen een bestemming - het is een venster naar lokale tradities en 
      gebruiken die al generaties lang worden doorgegeven.

      Tips van Locals
      -------------
      • Probeer de lokale specialiteiten
      • Leer een paar basis zinnen in de lokale taal
      • Volg de aanwijzingen van lokale gidsen

      Dit verhaal is gebaseerd op gesprekken met lokale bewoners die hun stad en cultuur graag 
      delen met bezoekers die oprecht geïnteresseerd zijn in hun levensstijl en tradities.
    `;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Navigation */}
      <Button
        variant="ghost"
        className="mb-6 text-primary hover:text-primary/90"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Terug naar overzicht
      </Button>

      {/* Hero Image */}
      <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
        <img
          src={getImageUrl(story.title)}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Story Header */}
      <Card className="mb-8">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm">
              👤
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{story.title}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Local Guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>{continent}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/80">
                #{continent.toLowerCase()}
              </Badge>
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/80">
                #{country.toLowerCase()}
              </Badge>
              <Badge variant="outline" className="text-xs border-primary/20 text-primary/80">
                #reistips
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="text-sm">Gepubliceerd op {new Date().toLocaleDateString()}</span>
              <span className="text-sm">•</span>
              <span className="text-sm">5 min leestijd</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Story Content */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="prose prose-lg max-w-none">
            {generateContent(story.title, story.description).split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Story Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{Math.floor(Math.random() * 200) + 50}</span>
              </Button>
              <Button variant="ghost" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>{Math.floor(Math.random() * 50) + 5}</span>
              </Button>
              <Button variant="ghost">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="ghost">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryDetail; 
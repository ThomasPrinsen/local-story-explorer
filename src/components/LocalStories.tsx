import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import storiesData from '../../stories.json';

interface Story {
  title: string;
  description: string;
  lat: number;
  lng: number;
}

const getImageUrl = (title: string) => {
  // Map titles to placeholder images - in a real app, these would come from your API
  const imageMap: { [key: string]: string } = {
    'De verborgen grachten van Amsterdam': 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&h=600',
    'Fietsen door Utrecht als een local': 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=800&h=600',
    'Tapas eten zoals een echte Barcelonees': 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&w=800&h=600',
    'Flamenco in de wijken van Sevilla': 'https://images.unsplash.com/photo-1508267176112-3ee843880737?auto=format&fit=crop&w=800&h=600',
    'Boulangeries van Montmartre': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&h=600'
  };
  
  return imageMap[title] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&h=600';
};

const getLocation = (lat: number, lng: number) => {
  // This is a simplified version. In a real app, you'd use reverse geocoding
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
  // Simplified continent detection based on coordinates
  if (lat > 35 && lng > -30 && lng < 40) return 'Europa';
  if (lat > 0 && lng > 60) return 'Azië';
  if (lat > 0 && lng < -30) return 'Noord-Amerika';
  if (lat < 0 && lng < -30) return 'Zuid-Amerika';
  if (lat < 0 && lng > 100) return 'Oceanië';
  if (lat < 35 && lat > -35 && lng > -20 && lng < 60) return 'Afrika';
  return 'Onbekend';
};

const LocalStories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [filteredStories, setFilteredStories] = useState<Story[]>(storiesData);

  useEffect(() => {
    const filtered = storiesData.filter(story => {
      const matchesSearch = 
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getLocation(story.lat, story.lng).toLowerCase().includes(searchQuery.toLowerCase());
      
      const continent = getContinent(story.lat, story.lng);
      const matchesContinent = selectedContinent === 'all' || continent === selectedContinent;

      return matchesSearch && matchesContinent;
    });

    setFilteredStories(filtered);
  }, [searchQuery, selectedContinent]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Search and Filter Section */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <div className="flex flex-1 gap-4 flex-col sm:flex-row w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Zoek op locatie, activiteit of thema..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full border-gray-200"
              />
            </div>
            
            <Select value={selectedContinent} onValueChange={setSelectedContinent}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Continent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle continenten</SelectItem>
                <SelectItem value="Europa">Europa</SelectItem>
                <SelectItem value="Azië">Azië</SelectItem>
                <SelectItem value="Afrika">Afrika</SelectItem>
                <SelectItem value="Noord-Amerika">Noord-Amerika</SelectItem>
                <SelectItem value="Zuid-Amerika">Zuid-Amerika</SelectItem>
                <SelectItem value="Oceanië">Oceanië</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map((story) => (
          <Card 
            key={story.title} 
            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/verhaal/${story.title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            <div className="relative aspect-[16/9]">
              <img
                src={getImageUrl(story.title)}
                alt={story.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-foreground transition-colors">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-100 line-clamp-2 mb-2">
                  {story.description}
                </p>
                <div className="flex items-center text-sm text-gray-200">
                  <span>{getLocation(story.lat, story.lng)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">
            Geen verhalen gevonden die aan je zoekcriteria voldoen.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Probeer andere zoektermen of pas je filters aan.
          </p>
        </div>
      )}
    </div>
  );
};

export default LocalStories;

import React, { useState } from 'react';
import { Search, MapPin, Bus, Utensils, Bed, AlertCircle, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import stories from '../../stories.json';

// Helper function to get location name from coordinates
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

// Helper function to get continent from country
const getContinent = (country: string) => {
  if (country.includes('Nederland') || country.includes('Spanje') || country.includes('Frankrijk') || country.includes('Italië')) return 'Europa';
  if (country.includes('Japan') || country.includes('Thailand') || country.includes('India')) return 'Azië';
  if (country.includes('Marokko')) return 'Afrika';
  if (country.includes('Zuid-Afrika')) return 'Afrika';
  if (country.includes('Verenigde Staten') || country.includes('Canada')) return 'Noord-Amerika';
  if (country.includes('Brazilië') || country.includes('Peru')) return 'Zuid-Amerika';
  if (country.includes('Australië')) return 'Oceanië';
  return 'Onbekend';
};

// Helper function to get budget range for a city
const getBudgetRange = (location: string) => {
  const budgetRanges: { [key: string]: string } = {
    'Amsterdam': '€80-120/dag',
    'Utrecht': '€70-100/dag',
    'Barcelona': '€60-90/dag',
    'Sevilla': '€50-80/dag',
    'Parijs': '€90-150/dag',
    'Venetië': '€100-160/dag',
    'Kyoto': '¥12000-18000/dag',
    'Tokyo': '¥15000-25000/dag',
    'Bangkok': '฿1000-2000/dag',
    'Mumbai': '₹3000-5000/dag',
    'Marrakech': 'MAD300-500/dag',
    'Fez': 'MAD250-450/dag',
    'Kaapstad': 'R800-1200/dag',
    'New Orleans': '$80-120/dag',
    'Vancouver': 'C$100-150/dag',
    'Rio de Janeiro': 'R$200-350/dag',
    'Cusco': 'S/150-250/dag',
    'Sydney': 'A$150-250/dag'
  };

  const city = location.split(',')[0];
  return budgetRanges[city] || '€50-100/dag';
};

// Helper function to get per-category price badges
const getCategoryPrice = (city: string, category: string) => {
  const prices: any = {
    'Amsterdam': {
      transport: '€7.50/dag OV',
      food: '€15-25/maaltijd',
      accommodation: '€40-120/nacht',
    },
    'Barcelona': {
      transport: '€2.40/rit',
      food: '€10-20/maaltijd',
      accommodation: '€30-80/nacht',
    },
    'Kyoto': {
      transport: '€5/dag',
      food: '€8-25/maaltijd',
      accommodation: '€35-120/nacht',
    },
    'Bangkok': {
      transport: '฿6-30/rit',
      food: '฿40-150/maaltijd',
      accommodation: '฿300-1200/nacht',
    },
    // Voeg meer steden toe indien gewenst
  };
  return prices[city]?.[category] || '';
};

// Generate city-specific tips
const getCityTips = (location: string) => {
  const city = location.split(',')[0];
  
  const commonTips = {
    transport: [
      'Koop een lokale OV-kaart voor langere verblijven',
      'Gebruik deelfietsen voor korte afstanden',
      'Loop waar mogelijk, het is gratis en je ziet meer van de stad'
    ],
    accommodation: [
      'Boek buiten het hoogseizoen voor betere prijzen',
      'Overweeg hostels of lokale B&Bs in plaats van hotels',
      'Zoek naar accommodatie net buiten het centrum'
    ],
    food: [
      'Eet waar de locals eten, niet in toeristische gebieden',
      'Bezoek lokale markten voor vers en goedkoop eten',
      'Lunch is vaak goedkoper dan diner in restaurants'
    ],
    localTip: 'Vraag locals naar hun favoriete plekken voor een unieke ervaring.'
  };

  // City-specific tips
  const citySpecificTips: { [key: string]: any } = {
    'Amsterdam': {
      transport: ['Huur een fiets (€10-15/dag). OV-chipkaart voor trams en metro\'s.'],
      food: ['Lokale cafés en bruine kroegen. Vermijd Damrak voor eten.'],
      accommodation: ['Hostels €25-40, hotels €80-150. Boek vroeg voor betere prijzen.'],
      localTip: 'Gebruik de I amsterdam City Card voor musea en korting.'
    },
    'Bangkok': {
      transport: ['BTS Skytrain dagpas €6. Tuk-tuks onderhandelen.'],
      food: ['Straatvoedsel €1-3. Restaurants €5-15. Altijd vers en heet.'],
      accommodation: ['Khao San Road backpackers €8-15. Sukhumvit hotels €25-60.'],
      localTip: 'Respecteer koning en religie. Drink alleen flessenwater.'
    },
    'Tokyo': {
      transport: ['IC-kaart voor metro en bus', 'Loop tussen nabije stations', 'Vermijd taxi\'s'],
      food: ['Eet bij vending machine restaurants', 'Lunch sets in plaats van diner', 'Bezoek depachika\'s voor avondkortingen'],
      accommodation: commonTips.accommodation,
      localTip: 'Vraag locals naar hun favoriete plekken voor een unieke ervaring.'
    }
  };

  // Combine common tips with city-specific tips if available
  const tips = citySpecificTips[city] || commonTips;
  
  // Ensure all required properties exist
  return {
    transport: tips.transport || commonTips.transport,
    accommodation: tips.accommodation || commonTips.accommodation,
    food: tips.food || commonTips.food,
    localTip: tips.localTip || commonTips.localTip
  };
};

const BudgetTips = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique cities from stories
  const cities = [...new Set(stories.map(story => getLocation(story.lat, story.lng)))];
  
  // Filter cities based on search
  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#fdf6ed] pb-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Budget & Reistips</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Praktische tips van locals over vervoer, eten, verblijf en budgettering per stad.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Zoek op stad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* City Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCities.map((location) => {
            const tips = getCityTips(location);
            const [city, country] = location.split(',').map(s => s.trim());
            const continent = getContinent(country);
            
            return (
              <div key={location} className="rounded-2xl shadow-md bg-gradient-to-br from-orange-50 to-amber-100/60 p-1">
                <Card className="rounded-2xl bg-white/80 border-0">
                  <CardHeader className="bg-transparent pb-2 pt-4 px-6 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        {city}, {country}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span className="text-gray-700 font-medium">$ 9Gemiddeld: {getBudgetRange(location)}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-white/80 text-gray-700 font-semibold px-3 py-1 rounded-full shadow-sm">
                      {continent}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4 px-6 pb-6 pt-2">
                    {/* Vervoer */}
                    <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3 mb-1">
                      <div className="text-2xl mt-0.5"><Bus className="w-6 h-6 text-blue-400" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-blue-900">Vervoer</span>
                          {getCategoryPrice(city, 'transport') && (
                            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 bg-white/80">
                              {getCategoryPrice(city, 'transport')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{tips.transport[0]}</p>
                      </div>
                    </div>
                    {/* Eten */}
                    <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3 mb-1">
                      <div className="text-2xl mt-0.5"><Utensils className="w-6 h-6 text-green-400" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-green-900">Eten</span>
                          {getCategoryPrice(city, 'food') && (
                            <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-white/80">
                              {getCategoryPrice(city, 'food')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{tips.food[0]}</p>
                      </div>
                    </div>
                    {/* Verblijf */}
                    <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3 mb-1">
                      <div className="text-2xl mt-0.5"><Bed className="w-6 h-6 text-purple-400" /></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-purple-900">Verblijf</span>
                          {getCategoryPrice(city, 'accommodation') && (
                            <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 bg-white/80">
                              {getCategoryPrice(city, 'accommodation')}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{tips.accommodation[0]}</p>
                      </div>
                    </div>
                    {/* Local Tip */}
                    <div className="flex items-start gap-3 bg-orange-50 rounded-lg border border-orange-200 p-3 mt-2">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold text-orange-900 block mb-1">Local Tip</span>
                        <p className="text-sm text-gray-700">{tips.localTip}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* No results */}
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Geen steden gevonden voor "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetTips; 
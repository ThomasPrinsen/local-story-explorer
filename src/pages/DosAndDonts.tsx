import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Camera, Users, Languages, Map, Utensils, Clock, Search, Check, X, CheckCircle, XCircle } from 'lucide-react';
import stories from '../../stories.json';

const iconMap: Record<string, any> = {
  'Fotografie': Camera,
  'Interactie met locals': Users,
  'Taal & Communicatie': Languages,
  'Navigatie': Map,
  'Eten & Restaurants': Utensils,
  'Timing & Planning': Clock,
};

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

const relevantCategories = ['Fotografie', 'Interactie met locals'];

// Algemene relevante do's & don'ts voor elke stad/categorie
const generalTips: Record<string, { dos: string[]; donts: string[] }> = {
  'Fotografie': {
    dos: [
      'Vraag toestemming voor het fotograferen van mensen',
      'Respecteer privégebieden en verbodsborden',
      'Deel je foto\'s met lokale gemeenschappen'
    ],
    donts: [
      'Maak geen foto\'s van mensen zonder toestemming',
      'Negeer geen privacyborden of restricties',
      'Verstoor geen ceremonies of rituelen voor een foto'
    ]
  },
  'Interactie met locals': {
    dos: [
      'Leer een paar basis woorden in de lokale taal',
      'Toon respect voor lokale gewoonten',
      'Vraag beleefd om hulp indien nodig'
    ],
    donts: [
      'Verwacht niet dat iedereen Engels spreekt',
      'Maak geen aannames over lokale gebruiken',
      'Behandel locals niet als toeristische attracties'
    ]
  }
};

// Stadsspecifieke tips (alleen als ze echt bestaan)
const citySpecificTips: { [key: string]: any } = {
  'Amsterdam': {
    'Fotografie': {
      dos: [
        'Maak foto\'s van de grachten en architectuur',
        'Vraag toestemming in musea',
        'Fotografeer bloemen op de markt'
      ],
      donts: [
        'Fotografeer niet in het Red Light District',
        'Maak geen foto\'s in coffeeshops',
        'Blokkeer geen fietspaden voor foto\'s'
      ]
    },
    'Interactie met locals': {
      dos: [
        'Leer basis Nederlands zoals "Dank je wel"',
        'Geef fietsers voorrang',
        'Vraag rustig om hulp in het Engels'
      ],
      donts: [
        'Sta niet op fietspaden',
        'Loop niet op de rijbaan',
        'Blokkeer geen ingangen'
      ]
    }
  },
  'Bangkok': {
    'Fotografie': {
      dos: [
        'Vraag toestemming bij tempels',
        'Respecteer heilige plaatsen',
        'Maak foto\'s van straatleven met respect'
      ],
      donts: [
        'Fotografeer geen koninklijke familie items',
        'Maak geen ongepaste tempel foto\'s',
        'Vermijd foto\'s van religieuze ceremonies zonder toestemming'
      ]
    },
    'Interactie met locals': {
      dos: [
        'Gebruik de "wai" begroeting',
        'Spreek mensen aan met "khun"',
        'Glimlach vriendelijk'
      ],
      donts: [
        'Raak niemands hoofd aan',
        'Wijs niet met je voeten',
        'Maak geen grappen over het koningshuis'
      ]
    }
  },
  'Tokyo': {
    'Fotografie': {
      dos: [
        'Vraag toestemming in winkels',
        'Fotografeer sakura in parken',
        'Maak foto\'s van je eten'
      ],
      donts: [
        'Fotografeer niet in tempels zonder toestemming',
        'Maak geen foto\'s in metro tijdens spits',
        'Vermijd foto\'s van geisha\'s zonder toestemming'
      ]
    },
    'Interactie met locals': {
      dos: [
        'Buig licht bij begroeting',
        'Gebruik chopsticks correct',
        'Wees rustig in het openbaar'
      ],
      donts: [
        'Eet niet lopend op straat',
        'Praat niet luid in de trein',
        'Steek chopsticks niet rechtop in rijst'
      ]
    }
  }
};

// Algemene info voor alle steden
const generalInfo = {
  dos: [
    'Fiets respectvol - geef voetgangers voorrang',
    'Wacht tot iedereen is ingestapt voordat je uitstapt (tram/metro)',
    'Leer een paar woorden van de lokale taal - wordt gewaardeerd',
    'Respecteer lokale gewoonten en cultuur',
  ],
  donts: [
    'Niet midden op het fietspad lopen',
    'Geen foto\'s maken van mensen zonder toestemming',
    'Niet schreeuwen of luidruchtig zijn in woonwijken',
    'Geen drugs gebruiken buiten aangewezen plekken',
  ],
  greeting: 'Handen schudden en "Hallo" of "Goedemorgen"',
  tipping: '10% in restaurants als je tevreden bent. Afronden in cafés.',
  clothing: 'Casual kleding prima. Geen speciale kledingregels.',
  taboos: 'Vergelijken met Duitsland. Praten over WO2 zonder context.'
};

// Stadsspecifieke info (voorbeeld Amsterdam, voeg meer toe indien gewenst)
const cityInfo: { [key: string]: any } = {
  'Amsterdam': {
    dos: [
      'Fiets respectvol - geef voetgangers voorrang',
      'Wacht tot iedereen is ingestapt voordat je uitstapt (tram/metro)',
      'Leer een paar woorden Nederlands - wordt gewaardeerd',
      'Respecteer de coffeeshop cultuur - niet roken op straat',
    ],
    donts: [
      'Niet midden op het fietspad lopen',
      'Geen foto\'s maken van mensen in de Red Light District',
      'Niet schreeuwen of luidruchtig zijn in woonwijken',
      'Geen drugs gebruiken buiten aangewezen plekken',
    ],
    greeting: 'Handen schudden en "Hallo" of "Goedemorgen"',
    tipping: '10% in restaurants als je tevreden bent. Afronden in cafés.',
    clothing: 'Casual kleding prima. Geen speciale kledingregels.',
    taboos: 'Vergelijken met Duitsland. Praten over WO2 zonder context.'
  },
  'Barcelona': {
    dos: [
      'Leer "Bon dia" (Catalaans) - lokale taal',
      'Eet laat - lunch 14:00, diner na 21:00',
      'Respecteer siësta tijd (14:00-17:00)',
      'Wandel langzaam - haast wordt niet gewaardeerd',
    ],
    donts: [
      'Geen Spaans verwachten - veel mensen spreken Catalaans',
      'Niet te vroeg dineren (voor 20:00)',
      'Geen shorts in kerken of formele plekken',
      'Niet vergelijken met rest van Spanje',
    ],
    greeting: 'Twee zoenen (wang aan wang) bij introductie',
    tipping: '5-10% in restaurants. Kleingeld voor tapas.',
    clothing: 'Smart casual. Bedekkende kleding in religieuze gebouwen.',
    taboos: 'Politiek over onafhankelijkheid Catalonië vermijden.'
  },
  // Voeg hier meer steden toe met eigen info indien gewenst
};

const DosAndDonts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const cities = [...new Set(stories.map(story => getLocation(story.lat, story.lng)))];
  const filteredCities = cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen w-full bg-[#fdf6ed] pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Do's & Don'ts</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Praktische do's & don'ts, begroetingen, fooien, kleding en taboes per stad.
          </p>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCities.map((location) => {
            const [city, country] = location.split(',').map(s => s.trim());
            const continent = getContinent(country);
            const info = cityInfo[city] || generalInfo;
            return (
              <div key={location} className="rounded-2xl shadow-md bg-[#fdf6ed] p-4">
                <Card className="rounded-2xl bg-white/80 border-0">
                  <CardHeader className="bg-gradient-to-r from-[#ff4800] to-[#ff672b] py-6 px-10 flex flex-row items-start justify-between rounded-t-2xl">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2 text-white">
                        {city}, {country}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-white/80 text-gray-700 font-semibold px-3 py-1 rounded-full shadow-sm">
                      {continent}
                    </Badge>
                  </CardHeader>
                  <CardContent className="px-8 pb-6 pt-2">
                    {/* Do's & Don'ts */}
                    <div className="flex flex-col gap-4 mb-6">
                      {/* Do's */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Check className="w-6 h-6 text-green-600" />
                          <span className="text-lg font-bold text-green-700">Do's</span>
                        </div>
                        <ul className="space-y-2">
                          {info.dos.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-800">
                              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Don'ts */}
                      <div>
                        <div className="flex items-center gap-2 mb-2 mt-4">
                          <X className="w-6 h-6 text-red-500" />
                          <span className="text-lg font-bold text-red-600">Don'ts</span>
                        </div>
                        <ul className="space-y-2">
                          {info.donts.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-800">
                              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <hr className="my-6 border-gray-200" />
                    {/* Onderste blokjes in 2x2 grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      <div>
                        <div className="text-base font-bold text-gray-800 mb-1">Begroeting</div>
                        <div className="text-gray-800 text-[1rem] leading-snug">{info.greeting}</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-800 mb-1">Fooien</div>
                        <div className="text-gray-800 text-[1rem] leading-snug">{info.tipping}</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-800 mb-1">Kleding</div>
                        <div className="text-gray-800 text-[1rem] leading-snug">{info.clothing}</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-gray-800 mb-1">Taboes</div>
                        <div className="text-gray-800 text-[1rem] leading-snug">{info.taboos}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Geen steden gevonden voor "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DosAndDonts; 
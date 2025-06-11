
import React, { useState } from 'react';
import { DollarSign, MapPin, Utensils, Bed, Car, Star, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TravelTips = () => {
  const [selectedTip, setSelectedTip] = useState(null);

  const budgetTips = [
    {
      id: 1,
      title: 'Goedkoop Eten in Amsterdam',
      author: 'Lisa van Dam',
      location: 'Amsterdam',
      category: 'Eten',
      icon: '🍽️',
      budget: '€5-15 per maaltijd',
      rating: 4.8,
      tips: [
        'Bezoek de lokale markten voor verse ingrediënten',
        'Probeer de "broodje kroket" voor €2-3',
        'Lunchcafés hebben vaak dagarrangements onder €10',
        'Supermarkten hebben kant-en-klare salades voor €3-5'
      ],
      localQuote: '"Echte Amsterdammers eten tussen 17:00-18:00 voor de vroege vogel kortingen!"'
    },
    {
      id: 2,
      title: 'Vervoer in Barcelona',
      author: 'Carlos Mendez',
      location: 'Barcelona',
      category: 'Vervoer',
      icon: '🚇',
      budget: '€2-12 per dag',
      rating: 4.6,
      tips: [
        'Koop een T-10 kaart voor 10 ritten = €11.35',
        'Metro en bus rijden tot 02:00, nachtbus daarna',
        'Bicing (stadsfietsen) is €50 per jaar voor bewoners',
        'Wandelen in het centrum is vaak sneller dan vervoer'
      ],
      localQuote: '"Loop zoveel mogelijk - Barcelona is een wandelstad en je mist anders de mooiste details!"'
    },
    {
      id: 3,
      title: 'Accommodatie Tips Tokyo',
      author: 'Yuki Sato',
      location: 'Tokyo',
      category: 'Verblijf',
      icon: '🏨',
      budget: '€25-80 per nacht',
      rating: 4.9,
      tips: [
        'Capsule hotels vanaf €25 - schoon en veilig',
        'Business hotels in Shinjuku/Shibuya €40-60',
        'Ryokan (traditioneel) vanaf €60 inclusief ontbijt',
        'Boek minimaal 2 weken vooruit voor beste prijzen'
      ],
      localQuote: '"Een capsule hotel is geen straf - het\'s een ervaring! Probeer het minstens één nacht."'
    }
  ];

  const practicalTips = [
    {
      id: 4,
      title: 'Openbaar Vervoer Etiquette',
      location: 'Verschillende Steden',
      icon: '🚊',
      tips: [
        'Tokyo: Praat zacht, bel niet, laat mensen eerst uitstappen',
        'Amsterdam: Houd je tas voor je, fietsers hebben voorrang',
        'Barcelona: Valideer altijd je ticket, ook bij korte ritten',
        'Marrakech: Onderhandel taxi prijzen vooraf'
      ]
    },
    {
      id: 5,
      title: 'Geld en Betalen',
      location: 'Internationale Tips',
      icon: '💳',
      tips: [
        'Japan: Nog steeds veel cash - trek geld bij 7-Eleven',
        'Nederland: Pin overal, maar bars accepteren soms geen kaart',
        'Spanje: Contant geld voor kleine cafés en markten',
        'Marokko: Dollars/Euro voor grote aankopen, lokale munt voor rest'
      ]
    }
  ];

  const budgetCalculator = {
    amsterdam: { food: 15, transport: 8, accommodation: 45, activities: 20 },
    barcelona: { food: 12, transport: 6, accommodation: 35, activities: 15 },
    tokyo: { food: 18, transport: 10, accommodation: 50, activities: 25 },
    marrakech: { food: 8, transport: 4, accommodation: 25, activities: 12 }
  };

  const [selectedCity, setSelectedCity] = useState('amsterdam');
  const [days, setDays] = useState(3);

  const calculateBudget = () => {
    const city = budgetCalculator[selectedCity];
    return {
      food: city.food * days,
      transport: city.transport * days,
      accommodation: city.accommodation * days,
      activities: city.activities * days,
      total: (city.food + city.transport + city.accommodation + city.activities) * days
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Budget & Reistips</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Praktische tips van locals om slim en voordelig te reizen.
        </p>
      </div>

      <Tabs defaultValue="budget" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="budget">Budget Tips</TabsTrigger>
          <TabsTrigger value="practical">Praktische Tips</TabsTrigger>
          <TabsTrigger value="calculator">Budget Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {budgetTips.map((tip) => (
              <Card 
                key={tip.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-200 border-orange-100 hover:border-orange-200"
                onClick={() => setSelectedTip(tip)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {tip.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{tip.rating}</span>
                    </div>
                  </div>
                  
                  <div className="text-center py-4">
                    <span className="text-4xl mb-2 block">{tip.icon}</span>
                    <div className="text-lg font-bold text-orange-600">{tip.budget}</div>
                  </div>

                  <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                    {tip.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {tip.location}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <strong>Quick tip:</strong> {tip.tips[0]}
                    </div>
                    
                    <div className="text-sm font-medium text-gray-700">
                      door {tip.author}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalTips.map((tip) => (
              <Card key={tip.id} className="border-orange-100">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{tip.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <p className="text-sm text-gray-600">{tip.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((tipText, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{tipText}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card className="max-w-2xl mx-auto border-orange-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Budget Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bestemming
                  </label>
                  <select 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="amsterdam">Amsterdam</option>
                    <option value="barcelona">Barcelona</option>
                    <option value="tokyo">Tokyo</option>
                    <option value="marrakech">Marrakech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aantal Dagen
                  </label>
                  <input 
                    type="number" 
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    min="1"
                    max="30"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {Object.entries(calculateBudget()).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="font-medium capitalize">
                      {category === 'food' && '🍽️ Eten & Drinken'}
                      {category === 'transport' && '🚇 Vervoer'}
                      {category === 'accommodation' && '🏨 Verblijf'}
                      {category === 'activities' && '🎨 Activiteiten'}
                      {category === 'total' && '💰 Totaal Budget'}
                    </span>
                    <span className={`font-bold ${category === 'total' ? 'text-lg text-orange-600' : 'text-gray-700'}`}>
                      €{amount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-gray-600 text-center">
                * Prijzen zijn gemiddelden gebaseerd op tips van locals
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Tip Detail Modal */}
      {selectedTip && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto animate-scale-in">
          <CardHeader className="border-b border-orange-100">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{selectedTip.icon}</span>
                  <div>
                    <CardTitle className="text-2xl">{selectedTip.title}</CardTitle>
                    <p className="text-gray-600">door {selectedTip.author} • {selectedTip.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className="bg-orange-100 text-orange-700">{selectedTip.budget}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{selectedTip.rating}/5</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedTip(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-4">Tips van {selectedTip.author}:</h4>
                <ul className="space-y-3">
                  {selectedTip.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h4 className="font-semibold text-blue-800 mb-2">Quote van Local</h4>
                <p className="text-blue-700 italic">{selectedTip.localQuote}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Background Overlay for Modal */}
      {selectedTip && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSelectedTip(null)}
        />
      )}
    </div>
  );
};

export default TravelTips;

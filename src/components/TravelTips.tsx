
import React, { useState } from 'react';
import { DollarSign, MapPin, Utensils, Bed, Bus, CreditCard, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FilterMenu from './FilterMenu';

const TravelTips = () => {
  const [filters, setFilters] = useState({ continent: '', country: '', city: '' });

  const tips = [
    // Europa
    {
      id: 1,
      location: 'Amsterdam, Nederland',
      continent: 'Europa',
      country: 'Nederland',
      city: 'Amsterdam',
      budget: 'Gemiddeld: €80-120/dag',
      transport: {
        icon: '🚲',
        tip: 'Huur een fiets (€10-15/dag). OV-chipkaart voor trams en metro\'s.',
        cost: '€7.50/dag OV'
      },
      food: {
        icon: '🧀',
        tip: 'Lokale cafés en bruine kroegen. Vermijd Damrak voor eten.',
        cost: '€15-25/maaltijd'
      },
      accommodation: {
        icon: '🏨',
        tip: 'Hostels €25-40, hotels €80-150. Boek vroeg voor betere prijzen.',
        cost: '€40-120/nacht'
      },
      localTip: 'Gebruik de I amsterdam City Card voor musea en korting.'
    },
    {
      id: 2,
      location: 'Barcelona, Spanje',
      continent: 'Europa',
      country: 'Spanje',
      city: 'Barcelona',
      budget: 'Gemiddeld: €60-90/dag',
      transport: {
        icon: '🚇',
        tip: 'Metro T-10 kaart (10 ritten €11.35). Veel te voet doen.',
        cost: '€2.40/rit'
      },
      food: {
        icon: '🥘',
        tip: 'Tapas tussen 19:00-21:00. Menu del día €12-15.',
        cost: '€10-20/maaltijd'
      },
      accommodation: {
        icon: '🏠',
        tip: 'Gràcia en Eixample wijken. Vermijd Las Ramblas voor hotels.',
        cost: '€30-80/nacht'
      },
      localTip: 'Siësta tijd 14:00-17:00. Winkels en restaurants dicht.'
    },
    // Azië
    {
      id: 3,
      location: 'Kyoto, Japan',
      continent: 'Azië',
      country: 'Japan',
      city: 'Kyoto',
      budget: 'Gemiddeld: €70-110/dag',
      transport: {
        icon: '🚌',
        tip: 'Dagpas bus €5. Fietsen huren €10/dag in centrum.',
        cost: '€5/dag'
      },
      food: {
        icon: '🍜',
        tip: 'Ramen shops €6-10. Kaiseki vanaf €80. Convenience stores goedkoop.',
        cost: '€8-25/maaltijd'
      },
      accommodation: {
        icon: '🏯',
        tip: 'Ryokan ervaring €60-200. Hostels €25-40.',
        cost: '€35-120/nacht'
      },
      localTip: 'Vroeg naar tempels (7:00-9:00) voor minder drukte.'
    },
    {
      id: 4,
      location: 'Bangkok, Thailand',
      continent: 'Azië',
      country: 'Thailand',
      city: 'Bangkok',
      budget: 'Gemiddeld: €25-50/dag',
      transport: {
        icon: '🚇',
        tip: 'BTS Skytrain dagpas €6. Tuk-tuks onderhandelen.',
        cost: '€1-3/rit'
      },
      food: {
        icon: '🍲',
        tip: 'Straatvoedsel €1-3. Restaurants €5-15. Altijd vers en heet.',
        cost: '€2-10/maaltijd'
      },
      accommodation: {
        icon: '🏨',
        tip: 'Khao San Road backpackers €8-15. Sukhumvit hotels €25-60.',
        cost: '€10-40/nacht'
      },
      localTip: 'Respecting koning en religie is zeer belangrijk.'
    },
    // Afrika
    {
      id: 5,
      location: 'Marrakech, Marokko',
      continent: 'Afrika',
      country: 'Marokko',
      city: 'Marrakech',
      budget: 'Gemiddeld: €35-65/dag',
      transport: {
        icon: '🚕',
        tip: 'Taxi\'s onderhandelen. Fiets huren €8/dag. Veel lopen in medina.',
        cost: '€2-8/rit'
      },
      food: {
        icon: '🍲',
        tip: 'Tagine €4-8. Straatvoedsel €1-3. Drink alleen flessenwater.',
        cost: '€3-12/maaltijd'
      },
      accommodation: {
        icon: '🏰',
        tip: 'Riad in medina €30-80. Hostels €12-25.',
        cost: '€15-50/nacht'
      },
      localTip: 'Onderhandelen is normaal. Start met 1/3 van gevraagde prijs.'
    },
    // Noord-Amerika
    {
      id: 6,
      location: 'New Orleans, Verenigde Staten',
      continent: 'Noord-Amerika',
      country: 'Verenigde Staten',
      city: 'New Orleans',
      budget: 'Gemiddeld: €90-150/dag',
      transport: {
        icon: '🚋',
        tip: 'Streetcar dagpas €3. Uber/Lyft €8-15. French Quarter te voet.',
        cost: '€15-25/dag'
      },
      food: {
        icon: '🦞',
        tip: 'Po\' boys €8-12. Fine dining €40-80. Happy hour kortingen.',
        cost: '€15-40/maaltijd'
      },
      accommodation: {
        icon: '🏨',
        tip: 'French Quarter B&B €80-150. Hotels €60-120.',
        cost: '€70-130/nacht'
      },
      localTip: 'Fooi 18-20% in restaurants. Jazz clubs meestal gratis entry.'
    }
  ];

  const filteredTips = tips.filter(tip => {
    if (filters.city && tip.city !== filters.city) return false;
    if (filters.country && tip.country !== filters.country) return false;
    if (filters.continent && tip.continent !== filters.continent) return false;
    return true;
  });

  const handleFilterChange = (newFilters: { continent: string; country: string; city: string }) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Budget & Reistips</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Praktische tips van locals over vervoer, eten, verblijf en budgettering per stad.
        </p>
      </div>

      {/* Filter Menu */}
      <FilterMenu onFilterChange={handleFilterChange} />

      {/* Tips Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTips.map((tip) => (
          <Card key={tip.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-orange-100">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">{tip.location}</CardTitle>
                  <CardDescription className="text-gray-600 font-medium">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    {tip.budget}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-white/80">
                  {tip.continent}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-4">
              {/* Transport */}
              <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl">{tip.transport.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Bus className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">Vervoer</span>
                    <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                      {tip.transport.cost}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{tip.transport.tip}</p>
                </div>
              </div>

              {/* Food */}
              <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                <div className="text-2xl">{tip.food.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Utensils className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-900">Eten</span>
                    <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                      {tip.food.cost}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{tip.food.tip}</p>
                </div>
              </div>

              {/* Accommodation */}
              <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl">{tip.accommodation.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Bed className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-900">Verblijf</span>
                    <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                      {tip.accommodation.cost}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{tip.accommodation.tip}</p>
                </div>
              </div>

              {/* Local Tip */}
              <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <span className="font-semibold text-orange-900 block mb-1">Local Tip</span>
                  <p className="text-sm text-gray-700">{tip.localTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTips.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Geen tips gevonden
          </h3>
          <p className="text-gray-600">
            Er zijn nog geen budget tips voor deze locatie. Pas je filters aan of kom later terug.
          </p>
        </div>
      )}
    </div>
  );
};

export default TravelTips;

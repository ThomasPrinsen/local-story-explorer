
import React, { useState } from 'react';
import { Globe, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FilterMenuProps {
  onFilterChange: (filters: { continent: string; country: string; city: string }) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [hoveredContinent, setHoveredContinent] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState('');

  const continents = [
    'Europa',
    'Azië',
    'Noord-Amerika',
    'Zuid-Amerika',
    'Afrika',
    'Oceanië'
  ];

  const countriesByContinent = {
    'Europa': ['Nederland', 'Spanje', 'Frankrijk', 'Italië', 'Duitsland'],
    'Azië': ['Japan', 'Thailand', 'China', 'India', 'Zuid-Korea'],
    'Noord-Amerika': ['Verenigde Staten', 'Canada', 'Mexico'],
    'Zuid-Amerika': ['Brazilië', 'Argentinië', 'Peru', 'Colombia'],
    'Afrika': ['Marokko', 'Zuid-Afrika', 'Egypte', 'Kenia'],
    'Oceanië': ['Australië', 'Nieuw-Zeeland', 'Fiji']
  };

  const citiesByCountry = {
    'Nederland': ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag'],
    'Spanje': ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'],
    'Frankrijk': ['Parijs', 'Lyon', 'Marseille', 'Nice'],
    'Italië': ['Rome', 'Milaan', 'Venetië', 'Florence'],
    'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Kolkata'],
    'Verenigde Staten': ['New York', 'Los Angeles', 'Chicago', 'New Orleans'],
    'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
    'Brazilië': ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'],
    'Peru': ['Lima', 'Cusco', 'Arequipa', 'Iquitos'],
    'Marokko': ['Marrakech', 'Casablanca', 'Fez', 'Rabat'],
    'Zuid-Afrika': ['Kaapstad', 'Johannesburg', 'Durban', 'Pretoria'],
    'Australië': ['Sydney', 'Melbourne', 'Brisbane', 'Perth']
  };

  const handleContinentSelect = (continent: string) => {
    setSelectedContinent(continent);
    setSelectedCountry('');
    setSelectedCity('');
    onFilterChange({ continent, country: '', city: '' });
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity('');
    onFilterChange({ continent: selectedContinent, country, city: '' });
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onFilterChange({ continent: selectedContinent, country: selectedCountry, city });
  };

  const clearFilters = () => {
    setSelectedContinent('');
    setSelectedCountry('');
    setSelectedCity('');
    setHoveredContinent('');
    setHoveredCountry('');
    onFilterChange({ continent: '', country: '', city: '' });
  };

  const hasActiveFilters = selectedContinent || selectedCountry || selectedCity;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-100">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      {/* Continent Dropdown with Hover */}
      <div className="relative">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-orange-200 hover:bg-orange-50 flex items-center gap-2"
          onMouseEnter={() => setHoveredContinent('show')}
          onMouseLeave={() => setHoveredContinent('')}
        >
          <Globe className="w-4 h-4" />
          {selectedContinent || 'Continent'}
          <ChevronDown className="w-3 h-3" />
        </Button>

        {/* Continent Dropdown */}
        {hoveredContinent && (
          <div 
            className="absolute top-full left-0 mt-1 w-48 bg-white border border-orange-200 rounded-lg shadow-lg z-50 animate-fade-in"
            onMouseEnter={() => setHoveredContinent('show')}
            onMouseLeave={() => setHoveredContinent('')}
          >
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 px-2 py-1">Selecteer continent</div>
              {continents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => handleContinentSelect(continent)}
                  onMouseEnter={() => setHoveredCountry(continent)}
                  className="w-full text-left px-2 py-2 text-sm hover:bg-orange-50 rounded cursor-pointer transition-colors relative"
                >
                  {continent}
                  
                  {/* Countries Submenu */}
                  {hoveredCountry === continent && (
                    <div className="absolute left-full top-0 ml-1 w-48 bg-white border border-orange-200 rounded-lg shadow-lg z-60 animate-fade-in">
                      <div className="p-2">
                        <div className="text-xs font-semibold text-gray-500 px-2 py-1">Landen in {continent}</div>
                        {countriesByContinent[continent]?.map((country) => (
                          <button
                            key={country}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContinentSelect(continent);
                              handleCountrySelect(country);
                            }}
                            className="w-full text-left px-2 py-2 text-sm hover:bg-orange-50 rounded cursor-pointer transition-colors"
                          >
                            {country}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Country Dropdown */}
      {selectedContinent && (
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-orange-200 hover:bg-orange-50 flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            {selectedCountry || 'Land'}
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* City Dropdown */}
      {selectedCountry && citiesByCountry[selectedCountry] && (
        <div className="relative">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-orange-200 hover:bg-orange-50 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {selectedCity || 'Stad'}
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 ml-4">
          <span className="text-xs text-gray-500">Actieve filters:</span>
          {selectedContinent && (
            <Badge variant="secondary" className="text-xs">
              {selectedContinent}
            </Badge>
          )}
          {selectedCountry && (
            <Badge variant="secondary" className="text-xs">
              {selectedCountry}
            </Badge>
          )}
          {selectedCity && (
            <Badge variant="secondary" className="text-xs">
              {selectedCity}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 p-1 h-auto"
          >
            Wissen
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;


import React, { useState } from 'react';
import { Globe, MapPin, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface FilterMenuProps {
  onFilterChange: (filters: { continent: string; country: string; city: string }) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const [selectedContinent, setSelectedContinent] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

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
    'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima'],
    'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya'],
    'Marokko': ['Marrakech', 'Casablanca', 'Fez', 'Rabat']
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
    onFilterChange({ continent: '', country: '', city: '' });
  };

  const hasActiveFilters = selectedContinent || selectedCountry || selectedCity;

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-orange-100">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Filters:</span>
      </div>

      {/* Continent Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
            <Globe className="w-4 h-4 mr-2" />
            {selectedContinent || 'Continent'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-white border-orange-200">
          <DropdownMenuLabel>Selecteer continent</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {continents.map((continent) => (
            <DropdownMenuItem
              key={continent}
              onClick={() => handleContinentSelect(continent)}
              className="cursor-pointer hover:bg-orange-50"
            >
              {continent}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Country Dropdown */}
      {selectedContinent && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
              <MapPin className="w-4 h-4 mr-2" />
              {selectedCountry || 'Land'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border-orange-200">
            <DropdownMenuLabel>Selecteer land</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {countriesByContinent[selectedContinent]?.map((country) => (
              <DropdownMenuItem
                key={country}
                onClick={() => handleCountrySelect(country)}
                className="cursor-pointer hover:bg-orange-50"
              >
                {country}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {/* City Dropdown */}
      {selectedCountry && citiesByCountry[selectedCountry] && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50">
              <Search className="w-4 h-4 mr-2" />
              {selectedCity || 'Stad'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48 bg-white border-orange-200">
            <DropdownMenuLabel>Selecteer stad</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {citiesByCountry[selectedCountry].map((city) => (
              <DropdownMenuItem
                key={city}
                onClick={() => handleCitySelect(city)}
                className="cursor-pointer hover:bg-orange-50"
              >
                {city}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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

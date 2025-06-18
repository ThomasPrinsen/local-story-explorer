import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import stories from '../../stories.json';
import 'leaflet/dist/leaflet.css';

// Fix voor de marker icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Definieer de interface voor een verhaal
interface Story {
  title: string;
  description: string;
  lat: number;
  lng: number;
}

// Fix voor de marker icons
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom marker icon
const customIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <div className="w-full h-[calc(100vh-4rem)] relative">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ width: '100%', height: '100%' }}
        minZoom={2}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stories.map((story, index) => (
          <Marker
            key={index}
            position={[story.lat, story.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => setSelectedStory(story)
            }}
          >
            {selectedStory === story && (
              <Popup>
                <Card className="p-4 border-none shadow-none w-72">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {story.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {story.description}
                  </p>
                  <Button 
                    onClick={() => navigate(`/verhaal/${story.title.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="w-full bg-[#FF4800] hover:bg-[#FF4800]/90 text-white transition-colors"
                  >
                    Lees meer
                  </Button>
                </Card>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>

      {/* Overlay met instructies */}
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Ontdek Lokale Verhalen
        </h2>
        <p className="text-sm text-gray-600">
          Klik op de markers om verhalen van locals te ontdekken. Sleep om de kaart te verplaatsen en gebruik het scrollwiel om in en uit te zoomen.
        </p>
      </div>
    </div>
  );
};

export default MapView;


import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Compass } from 'lucide-react';

interface PointOfInterest {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  category: string;
  description: string;
}

interface MapViewProps {
  pois: PointOfInterest[];
  onSelectPoi?: (poi: PointOfInterest) => void;
}

export default function MapView({ pois = [], onSelectPoi }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { toast } = useToast();
  
  // Mock function to simulate map initialization (replace with actual map API)
  const initializeMap = () => {
    console.log("Map would initialize here with Google Maps API");
    console.log("Points of Interest:", pois);
    
    // Simulating map loading delay
    setTimeout(() => {
      setIsMapLoaded(true);
      toast({
        title: "Map Loaded",
        description: "Interactive map has been initialized successfully.",
      });
    }, 1000);
  };
  
  const getUserLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Getting your location",
        description: "Please wait while we find your position...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          toast({
            title: "Location found!",
            description: "We've located you on the map.",
          });
        },
        () => {
          toast({
            variant: "destructive",
            title: "Location access denied",
            description: "Please enable location services to use this feature.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services.",
      });
    }
  };
  
  useEffect(() => {
    // Initialize map when component mounts
    initializeMap();
    
    // Request user location on component mount
    getUserLocation();
    
    // Cleanup function
    return () => {
      console.log("Map component unmounted");
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-10 w-10 rounded-full border-4 border-aiox-primary border-t-transparent mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      <div ref={mapRef} className="w-full h-full bg-aiox-light dark:bg-aiox-dark/30">
        {/* This would be replaced with actual map rendering */}
        <div className="h-full flex flex-col items-center justify-center p-4">
          <div className="bg-card p-6 rounded-lg shadow-lg text-center max-w-md">
            <h3 className="text-lg font-medium mb-3">Interactive Map Preview</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              This is a placeholder for the Google Maps integration. In the final implementation, 
              this will display an interactive map with {pois.length} cultural points of interest.
            </p>
            
            {userLocation ? (
              <Card className="bg-muted/40 p-3 mb-4">
                <p className="text-xs">Your position</p>
                <p className="font-mono text-xs">
                  Lat: {userLocation.lat.toFixed(6)}, Lng: {userLocation.lng.toFixed(6)}
                </p>
              </Card>
            ) : (
              <Button 
                variant="outline" 
                onClick={getUserLocation}
                className="mb-4 w-full"
              >
                <Compass className="mr-2 h-4 w-4" />
                Find my location
              </Button>
            )}
            
            {isMapLoaded && pois.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pois.slice(0, 4).map((poi) => (
                  <Button 
                    key={poi.id}
                    variant="outline"
                    className="text-xs justify-start h-auto py-2"
                    onClick={() => onSelectPoi && onSelectPoi(poi)}
                  >
                    <div className="w-2 h-2 rounded-full bg-aiox-primary mr-2"></div>
                    {poi.name}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-4">
        <Button 
          size="sm" 
          onClick={getUserLocation}
          className="bg-white dark:bg-card text-foreground shadow-lg hover:bg-muted"
        >
          <Compass className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

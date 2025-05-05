
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapView from "@/components/MapView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Search, MapPin, Filter } from "lucide-react";

// Sample POI data for map
const pointsOfInterest = [
  {
    id: 1,
    name: 'Louvre Museum',
    latitude: 48.8606,
    longitude: 2.3376,
    category: 'Museum',
    description: 'The world\'s largest art museum and historic monument in Paris.'
  },
  {
    id: 2,
    name: 'Notre-Dame Cathedral',
    latitude: 48.8530,
    longitude: 2.3499,
    category: 'Historical',
    description: 'Medieval Catholic cathedral on the Île de la Cité.'
  },
  {
    id: 3,
    name: 'Eiffel Tower',
    latitude: 48.8584,
    longitude: 2.2945,
    category: 'Landmark',
    description: 'Wrought-iron lattice tower named after engineer Gustave Eiffel.'
  },
  {
    id: 4,
    name: 'Montmartre',
    latitude: 48.8867,
    longitude: 2.3431,
    category: 'District',
    description: 'A large hill in Paris\'s 18th arrondissement, known for its artistic history.'
  },
  {
    id: 5,
    name: 'Musée d\'Orsay',
    latitude: 48.8600,
    longitude: 2.3266,
    category: 'Museum',
    description: 'Museum housed in the former Gare d\'Orsay, a Beaux-Arts railway station.'
  },
  {
    id: 6,
    name: 'Arc de Triomphe',
    latitude: 48.8738,
    longitude: 2.2950,
    category: 'Monument',
    description: 'One of the most famous monuments in Paris, standing at the western end of the Champs-Élysées.'
  },
  {
    id: 7,
    name: 'Sainte-Chapelle',
    latitude: 48.8554,
    longitude: 2.3452,
    category: 'Historical',
    description: 'A royal chapel within the medieval Palais de la Cité, residence of the Kings of France until the 14th century.'
  },
  {
    id: 8,
    name: 'Centre Pompidou',
    latitude: 48.8607,
    longitude: 2.3523,
    category: 'Museum',
    description: 'A complex building in the Beaubourg area housing the Public Information Library and National Museum of Modern Art.'
  }
];

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [filteredPois, setFilteredPois] = useState(pointsOfInterest);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setFilteredPois(pointsOfInterest);
      return;
    }

    const filtered = pointsOfInterest.filter(
      (poi) =>
        poi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poi.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poi.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredPois(filtered);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Explore Cultural Sites</h1>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Museum', 'Historical', 'Landmark', 'Monument', 'District'].map((category) => (
                        <Button
                          key={category}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Distance</h3>
                    <div className="flex flex-wrap gap-2">
                      {['< 1km', '< 2km', '< 5km', 'Any'].map((distance) => (
                        <Button
                          key={distance}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          {distance}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Rating</h3>
                    <div className="flex flex-wrap gap-2">
                      {['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', 'Any'].map((rating) => (
                        <Button
                          key={rating}
                          variant="outline"
                          size="sm"
                          className="rounded-full"
                        >
                          {rating}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for museums, historic sites, landmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </form>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[500px] md:h-[600px]">
              <MapView pois={filteredPois} onSelectPoi={setSelectedPoi} />
            </div>
            
            <div className="space-y-4">
              <Card className="border-dashed bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium">Points of Interest</h2>
                    <span className="text-sm text-muted-foreground">{filteredPois.length} found</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on a location on the map or in the list below to view details
                  </p>
                </CardContent>
              </Card>
              
              <div className="space-y-3 max-h-[400px] md:max-h-[500px] overflow-y-auto pr-2">
                {filteredPois.map((poi) => (
                  <Card 
                    key={poi.id} 
                    className={`transition-all hover:shadow-md cursor-pointer ${
                      selectedPoi && selectedPoi.id === poi.id 
                        ? 'border-aiox-primary ring-1 ring-aiox-primary' 
                        : ''
                    }`}
                    onClick={() => setSelectedPoi(poi)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-aiox-light dark:bg-aiox-dark/30">
                          <MapPin className="h-5 w-5 text-aiox-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{poi.name}</h3>
                          <p className="text-xs text-muted-foreground mb-1">{poi.category}</p>
                          <p className="text-sm line-clamp-2">{poi.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredPois.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No locations found matching your search.
                    </p>
                    <Button 
                      variant="link" 
                      onClick={() => {
                        setSearchQuery('');
                        setFilteredPois(pointsOfInterest);
                      }}
                    >
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

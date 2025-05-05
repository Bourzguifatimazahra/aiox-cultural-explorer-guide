
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedPlace from '@/components/FeaturedPlace';
import MapView from '@/components/MapView';
import ConversationInterface from '@/components/ConversationInterface';

// Sample data for featured places
const featuredPlaces = [
  {
    id: 1,
    title: 'Louvre Museum',
    description: 'Home to thousands of classic and modern masterpieces, including the Mona Lisa.',
    image: 'https://images.unsplash.com/photo-1565099324218-40a2ea5a3af7?q=80&w=1000&auto=format&fit=crop',
    category: 'Museum'
  },
  {
    id: 2,
    title: 'Notre-Dame Cathedral',
    description: 'A masterpiece of French Gothic architecture and one of Paris's most visited monuments.',
    image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?q=80&w=1000&auto=format&fit=crop',
    category: 'Historical'
  },
  {
    id: 3,
    title: 'Eiffel Tower',
    description: 'The most famous symbol of Paris, offering stunning views over the city.',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=1000&auto=format&fit=crop',
    category: 'Landmark'
  },
  {
    id: 4,
    title: 'Montmartre',
    description: 'A hill in Paris known for its artistic history and the white-domed Sacré-Cœur Basilica.',
    image: 'https://images.unsplash.com/photo-1551634979-2b11f8c946fe?q=80&w=1000&auto=format&fit=crop',
    category: 'District'
  }
];

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
  }
];

export default function Index() {
  const [selectedPoi, setSelectedPoi] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 mb-16 md:mb-0">
        {/* Hero Section */}
        <section className="relative py-12 px-4 mb-12 rounded-lg bg-gradient-to-br from-aiox-primary/10 to-aiox-secondary/10 overflow-hidden">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Discover Culture Through <span className="text-aiox-primary">Conversation</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Explore the world's cultural landmarks with an AI guide that talks to you about the history, art, and stories behind them.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-aiox-primary hover:bg-aiox-primary/90">
                <Link to="/explore">
                  <MapPin className="mr-2 h-5 w-5" />
                  Start Exploring
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/profile">Create Account</Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block absolute -right-24 bottom-0 w-96 h-96 opacity-20">
            <div className="w-full h-full bg-aiox-primary rounded-full filter blur-3xl animate-float"></div>
          </div>
        </section>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="discover" className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Featured Cultural Sites</h2>
                <Button variant="ghost" asChild>
                  <Link to="/explore" className="flex items-center">
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPlaces.map((place) => (
                  <FeaturedPlace key={place.id} {...place} />
                ))}
              </div>
              
              <Card className="mt-12 border-dashed bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">Personalized Cultural Journeys</h3>
                  <p className="text-muted-foreground mb-4">
                    Create an account to save your favorite places and get personalized recommendations based on your interests.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/profile">Sign Up Now</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Explore Cultural Map</h2>
                <Button variant="ghost" asChild>
                  <Link to="/explore" className="flex items-center">
                    Full Screen Map
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <MapView pois={pointsOfInterest} onSelectPoi={setSelectedPoi} />
                </div>
                <div>
                  <Card className="h-full">
                    <CardContent className="p-4 h-full flex flex-col">
                      {selectedPoi ? (
                        <div className="animate-fade-in">
                          <h3 className="text-lg font-medium mb-2">{selectedPoi.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4">{selectedPoi.description}</p>
                          <div className="flex gap-2 mt-auto">
                            <Button size="sm">Get Details</Button>
                            <Button variant="outline" size="sm">Directions</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                          <h3 className="text-lg font-medium mb-1">Select a Location</h3>
                          <p className="text-sm text-muted-foreground">
                            Click on any point of interest on the map to see details
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assistant">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">AI Cultural Assistant</h2>
                <Button variant="ghost" asChild>
                  <Link to="/search" className="flex items-center">
                    Advanced Search
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <ConversationInterface />
                </div>
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Suggested Questions</h3>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          What's the history of the Louvre Museum?
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Tell me about Parisian architecture styles
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          What museums should I visit with kids?
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Famous artworks I shouldn't miss in Paris
                        </Button>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium mb-3">Voice Commands</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          You can also speak to the assistant using voice commands. Click the microphone button to try it out.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

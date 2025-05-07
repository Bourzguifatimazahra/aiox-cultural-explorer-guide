
import { useState } from 'react';
import { Calendar, MapPin, User, Route } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MapView from '@/components/MapView';
import { useToast } from '@/components/ui/use-toast';

// Sample destinations in Morocco
const moroccanDestinations = [
  {
    id: 1,
    name: "Marrakech",
    image: "/img/kech.jpg",
    description: "The cultural heart of Morocco with its famous Jemaa el-Fnaa square, historic medina, and vibrant souks.",
    activities: ["Visit Majorelle Garden", "Explore the Medina", "Shop in the Souks", "Visit Bahia Palace"]
  },
  {
    id: 2,
    name: "Chefchaouen",
    image: "/img/Chefch.jpg",
    description: "The famous 'Blue City' nestled in the Rif Mountains, known for its striking blue-washed buildings.",
    activities: ["Photograph the Blue Streets", "Hike to the Spanish Mosque", "Visit Kasbah Museum", "Shop for Local Crafts"]
  },
  {
    id: 3,
    name: "Fès",
    image: "/img/fes.png",
    description: "Home to the world's oldest university and the largest car-free urban area with its ancient medina.",
    activities: ["Explore Fès el-Bali Medina", "Visit Al-Qarawiyyin University", "See the Leather Tanneries", "Tour Bou Inania Madrasa"]
  },
  {
    id: 4,
    name: "Sahara Desert",
    image: "/img/Sahara.jpg",
    description: "Experience the majestic sand dunes of Erg Chebbi and Erg Chigaga in the Moroccan Sahara.",
    activities: ["Camel Trek at Sunset", "Camp Under the Stars", "Sandboarding", "Visit Berber Villages"]
  },
  {
    id: 5,
    name: "Essaouira",
    image: "/img/essouira.jpg",
    description: "A charming coastal town known for its windswept beaches, historic medina, and fresh seafood.",
    activities: ["Walk the Ramparts", "Windsurf or Kiteboard", "Explore the Medina", "Visit the Port"]
  },
  {
    id: 6,
    name: "Atlas Mountains",
    image: "/img/atls.jpg",
    description: "North Africa's highest mountain range offering spectacular hiking and traditional Berber villages.",
    activities: ["Hike to Toubkal Peak", "Visit Berber Villages", "Explore Ouzoud Waterfalls", "Trek Through Valleys"]
  }
];

// Sample POI data for the map
const moroccanPOIs = [
  {
    id: 1,
    name: 'Marrakech',
    latitude: 31.6295,
    longitude: -7.9811,
    category: 'City',
    description: 'The cultural heart of Morocco with vibrant souks and historic sites.'
  },
  {
    id: 2,
    name: 'Chefchaouen',
    latitude: 35.1688,
    longitude: -5.2636,
    category: 'City',
    description: 'The famous blue city nestled in the Rif Mountains.'
  },
  {
    id: 3,
    name: 'Fès',
    latitude: 34.0181,
    longitude: -5.0078,
    category: 'City',
    description: 'Home to the world\'s oldest university and largest car-free urban area.'
  },
  {
    id: 4,
    name: 'Sahara Desert (Merzouga)',
    latitude: 31.1000,
    longitude: -4.0100,
    category: 'Nature',
    description: 'Experience the majestic sand dunes of the Moroccan Sahara.'
  },
  {
    id: 5,
    name: 'Essaouira',
    latitude: 31.5085,
    longitude: -9.7595,
    category: 'Coastal',
    description: 'A charming coastal town known for its beaches and historic medina.'
  },
  {
    id: 6,
    name: 'Atlas Mountains',
    latitude: 31.0600,
    longitude: -7.9159,
    category: 'Nature',
    description: 'North Africa\'s highest mountain range offering spectacular hiking.'
  }
];

// Sample itinerary templates
const itineraryTemplates = [
  {
    id: 1,
    name: "Classic Morocco",
    days: 10,
    destinations: ["Marrakech", "Fès", "Chefchaouen", "Sahara Desert", "Essaouira"],
    description: "A perfect introduction to Morocco's diverse landscapes and cultural highlights."
  },
  {
    id: 2,
    name: "Imperial Cities",
    days: 7,
    destinations: ["Casablanca", "Rabat", "Fès", "Meknes", "Marrakech"],
    description: "Explore Morocco's historic imperial cities and their rich architectural heritage."
  },
  {
    id: 3,
    name: "Coastal Adventure",
    days: 8,
    destinations: ["Tangier", "Asilah", "Essaouira", "Agadir", "Taghazout"],
    description: "Discover Morocco's beautiful Atlantic coastline and beach towns."
  },
  {
    id: 4,
    name: "Sahara Experience",
    days: 5,
    destinations: ["Marrakech", "Ouarzazate", "Sahara Desert", "Tinghir", "Ait Benhaddou"],
    description: "Journey through dramatic landscapes to experience the magic of the Sahara."
  }
];

export default function TravelPlan() {
  const [selectedDestinations, setSelectedDestinations] = useState<number[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [specialRequests, setSpecialRequests] = useState("");
  const [generatedPlan, setGeneratedPlan] = useState<boolean>(false);
  const { toast } = useToast();
  
  const toggleDestination = (id: number) => {
    if (selectedDestinations.includes(id)) {
      setSelectedDestinations(selectedDestinations.filter(destId => destId !== id));
    } else {
      setSelectedDestinations([...selectedDestinations, id]);
    }
  };
  
  const selectTemplate = (id: number) => {
    setSelectedTemplate(id);
    // In a real app, this would populate the form with template data
    const template = itineraryTemplates.find(t => t.id === id);
    if (template) {
      const templateDestIds = template.destinations
        .map(name => moroccanDestinations.find(d => d.name === name)?.id)
        .filter(id => id !== undefined) as number[];
      
      setSelectedDestinations(templateDestIds);
      
      // Calculate sample dates (current date + template days)
      const today = new Date();
      const endDay = new Date();
      endDay.setDate(today.getDate() + template.days - 1);
      
      setStartDate(today.toISOString().split('T')[0]);
      setEndDate(endDay.toISOString().split('T')[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDestinations.length === 0) {
      toast({
        variant: "destructive",
        title: "Destinations requises",
        description: "Veuillez sélectionner au moins une destination pour votre voyage.",
      });
      return;
    }
    
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Dates requises",
        description: "Veuillez sélectionner vos dates de voyage.",
      });
      return;
    }
    
    toast({
      title: "Plan de voyage créé!",
      description: "Votre itinéraire personnalisé a été généré avec succès.",
    });
    
    setGeneratedPlan(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate duration between dates
  const calculateDuration = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  
  const duration = calculateDuration();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 mb-16 md:mb-0">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Plan de Voyage <span className="text-aiox-primary">Personnalisé</span> au Maroc
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Créez votre itinéraire sur mesure et découvrez les merveilles du Maroc selon vos préférences.
          </p>
        </section>
        
        {/* Content */}
        <Tabs defaultValue={generatedPlan ? "itinerary" : "create"} className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="create">Créer un Itinéraire</TabsTrigger>
            <TabsTrigger value="itinerary" disabled={!generatedPlan}>Votre Itinéraire</TabsTrigger>
            <TabsTrigger value="map">Carte des Destinations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Plan Creator */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Créez Votre Voyage</CardTitle>
                    <CardDescription>Personnalisez votre expérience marocaine</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">1. Sélectionnez vos destinations</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {moroccanDestinations.map((destination) => (
                            <div 
                              key={destination.id}
                              className={`border rounded-md overflow-hidden cursor-pointer transition-all ${
                                selectedDestinations.includes(destination.id) ? 'ring-2 ring-aiox-primary' : 'hover:border-aiox-primary/50'
                              }`}
                              onClick={() => toggleDestination(destination.id)}
                            >
                              <div className="aspect-video w-full">
                                <img 
                                  src={destination.image}
                                  alt={destination.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium">{destination.name}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                  {destination.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">2. Dates de voyage</h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="start-date">Date de début</Label>
                              <Input
                                id="start-date"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="end-date">Date de fin</Label>
                              <Input
                                id="end-date"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                              />
                            </div>
                            {duration > 0 && (
                              <p className="text-sm text-muted-foreground">
                                Durée: {duration} jours
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">3. Voyageurs</h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="travelers">Nombre de personnes</Label>
                              <Input
                                id="travelers"
                                type="number"
                                min={1}
                                max={20}
                                value={travelersCount}
                                onChange={(e) => setTravelersCount(parseInt(e.target.value) || 1)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">4. Demandes spéciales</h3>
                        <Textarea
                          placeholder="Intérêts particuliers, restrictions alimentaires, préférences d'hébergement, etc."
                          className="min-h-[100px]"
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">Générer mon itinéraire</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Sidebar */}
              <div>
                {/* Templates */}
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Itinéraires Populaires</CardTitle>
                    <CardDescription>Inspirez-vous de nos suggestions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {itineraryTemplates.map((template) => (
                      <div 
                        key={template.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${
                          selectedTemplate === template.id ? 'bg-muted border-aiox-primary' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => selectTemplate(template.id)}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{template.name}</h4>
                          <span className="text-xs bg-muted-foreground/20 px-2 py-1 rounded-full">
                            {template.days} jours
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                        <p className="text-xs mt-2 flex flex-wrap gap-1">
                          {template.destinations.map((dest, index) => (
                            <span key={index} className="bg-muted px-1.5 py-0.5 rounded-full text-xs">
                              {dest}
                            </span>
                          ))}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                {/* Help Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Besoin d'aide?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Nos experts locaux peuvent vous aider à planifier votre voyage parfait au Maroc selon vos préférences.
                    </p>
                    <Button variant="outline" className="w-full">Contactez un expert</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="itinerary">
            {generatedPlan && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="pb-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Votre Itinéraire Personnalisé</CardTitle>
                          <CardDescription>
                            {new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} - {' '}
                            {new Date(endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            {' '} • {duration} jours • {travelersCount} {travelersCount > 1 ? 'personnes' : 'personne'}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          Télécharger PDF
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-8">
                          {selectedDestinations.map((destId, index) => {
                            const destination = moroccanDestinations.find(d => d.id === destId);
                            if (!destination) return null;
                            
                            // Calculate days based on duration and number of destinations
                            const daysPerDest = Math.max(1, Math.floor(duration / selectedDestinations.length));
                            const startDay = index * daysPerDest + 1;
                            const endDay = index === selectedDestinations.length - 1 
                              ? duration 
                              : (index + 1) * daysPerDest;
                            
                            return (
                              <div key={destination.id} className="relative">
                                <div className="flex">
                                  <div className="mr-4 relative">
                                    <div className="w-10 h-10 rounded-full bg-aiox-primary flex items-center justify-center text-white font-medium">
                                      {index + 1}
                                    </div>
                                    {index < selectedDestinations.length - 1 && (
                                      <div className="absolute top-10 bottom-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-muted-foreground/20 h-full"></div>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="text-lg font-medium">{destination.name}</h3>
                                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                        Jours {startDay}-{endDay}
                                      </span>
                                    </div>
                                    
                                    <div className="mb-4 rounded-md overflow-hidden">
                                      <img
                                        src={destination.image}
                                        alt={destination.name}
                                        className="w-full h-48 object-cover"
                                      />
                                    </div>
                                    
                                    <p className="text-sm mb-4">{destination.description}</p>
                                    
                                    <div className="space-y-3">
                                      <h4 className="font-medium">Activités suggérées:</h4>
                                      <ul className="space-y-2">
                                        {destination.activities.map((activity, idx) => (
                                          <li key={idx} className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-aiox-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                              <span className="text-xs">{idx + 1}</span>
                                            </div>
                                            <span className="text-sm">{activity}</span>
                                          </li>
                                        ))}
                                      </ul>
                                      
                                      <div className="flex justify-end">
                                        <Button variant="outline" size="sm">
                                          Détails de l'hébergement
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    
                    <CardFooter className="flex-col space-y-3">
                      <div className="w-full flex justify-between items-center bg-muted/30 p-4 rounded-lg">
                        <div>
                          <h4 className="font-medium">Prix estimé</h4>
                          <p className="text-sm text-muted-foreground">
                            Base {travelersCount} {travelersCount > 1 ? 'personnes' : 'personne'}, {duration} jours
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            {(5000 + (duration * 800) + (selectedDestinations.length * 400)) * travelersCount} MAD
                          </p>
                          <p className="text-xs text-muted-foreground">
                            (~{Math.round((5000 + (duration * 800) + (selectedDestinations.length * 400)) * travelersCount / 10)} EUR)
                          </p>
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-3">
                        <Button variant="outline">Modifier l'itinéraire</Button>
                        <Button>Réserver maintenant</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Résumé de l'itinéraire</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Durée</p>
                            <p className="text-xs text-muted-foreground">{duration} jours</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Destinations</p>
                            <p className="text-xs text-muted-foreground">{selectedDestinations.length} lieux à visiter</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Voyageurs</p>
                            <p className="text-xs text-muted-foreground">{travelersCount} {travelersCount > 1 ? 'personnes' : 'personne'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Route className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Distance</p>
                            <p className="text-xs text-muted-foreground">~{selectedDestinations.length * 150} km au total</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Destinations incluses:</h4>
                        <div className="flex flex-wrap gap-1">
                          {selectedDestinations.map((destId) => {
                            const destination = moroccanDestinations.find(d => d.id === destId);
                            return destination ? (
                              <span 
                                key={destination.id} 
                                className="bg-muted text-xs px-2 py-1 rounded-full"
                              >
                                {destination.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Partagez votre itinéraire</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Envoyez cet itinéraire par email ou partagez-le avec vos compagnons de voyage.
                      </p>
                      <div className="space-y-3">
                        <Input placeholder="Email du destinataire" type="email" />
                        <Button variant="outline" className="w-full">Partager l'itinéraire</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="map">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="overflow-hidden">
                  <div className="h-[600px]">
                    <MapView pois={moroccanPOIs} />
                  </div>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Destinations au Maroc</CardTitle>
                    <CardDescription>Parcourez les régions principales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {moroccanPOIs.map((poi) => (
                        <div key={poi.id} className="flex items-start gap-3 p-2 hover:bg-muted/50 rounded-md transition-colors">
                          <MapPin className="h-4 w-4 text-aiox-primary mt-1" />
                          <div>
                            <h4 className="text-sm font-medium">{poi.name}</h4>
                            <p className="text-xs text-muted-foreground">{poi.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

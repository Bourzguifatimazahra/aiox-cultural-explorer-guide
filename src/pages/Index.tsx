
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Book, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeaturedPlace from '@/components/FeaturedPlace';
import MapView from '@/components/MapView';
import ConversationInterface from '@/components/ConversationInterface';

// Sample data for featured places (now with Moroccan locations)
const featuredPlaces = [
  {
    id: 1,
    title: 'Médina de Fès',
    description: 'La plus ancienne médina du monde et site du patrimoine mondial de l\'UNESCO avec ses 9000 ruelles.',
    image: '/img/fes.png',
    category: 'Patrimoine'
  },
  {
    id: 2,
    title: 'Chefchaouen',
    description: 'La célèbre "ville bleue" du Maroc, connue pour ses bâtiments aux teintes bleu azur distinctives.',
    image: '/img/Chefch.jpg',
    category: 'Ville'
  },
  {
    id: 3,
    title: 'Désert du Sahara',
    description: 'Explorez les majestueuses dunes de sable d\'Erg Chebbi et vivez une nuit sous les étoiles.',
    image: '/img/marzoga.jpg',
    category: 'Nature'
  },
  {
    id: 4,
    title: 'Place Jemaa el-Fna',
    description: 'Le cœur battant de Marrakech, rempli de conteurs, de musiciens et de stands de nourriture.',
    image: '/img/kech.jpg',
    category: 'Culture'
  }
];

// Sample POI data for map (Moroccan locations)
const pointsOfInterest = [
  {
    id: 1,
    name: 'Médina de Fès',
    latitude: 34.0372,
    longitude: -5.0063,
    category: 'Patrimoine',
    description: 'La plus ancienne médina du monde avec 9000 ruelles et site de l\'UNESCO.'
  },
  {
    id: 2,
    name: 'Chefchaouen',
    latitude: 35.1688,
    longitude: -5.2636,
    category: 'Ville',
    description: 'La ville bleue du Maroc, connue pour ses bâtiments aux teintes bleues.'
  },
  {
    id: 3,
    name: 'Désert du Sahara (Merzouga)',
    latitude: 31.1000,
    longitude: -4.0100,
    category: 'Nature',
    description: 'Dunes spectaculaires et expériences authentiques dans le désert.'
  },
  {
    id: 4,
    name: 'Place Jemaa el-Fna',
    latitude: 31.6258,
    longitude: -7.9891,
    category: 'Culture',
    description: 'Place animée au cœur de Marrakech, pleine de vie et de traditions.'
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
              Découvrez le <span className="text-aiox-primary">Maroc</span> à travers nos conversations
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Explorez les merveilles culturelles du Maroc avec un guide AI qui vous parle de l'histoire, de l'art et des histoires qui les entourent.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-aiox-primary hover:bg-aiox-primary/90">
                <Link to="/explore">
                  <MapPin className="mr-2 h-5 w-5" />
                  Commencer l'Exploration
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/travel-plan">
                  <Route className="mr-2 h-5 w-5" />
                  Créer un Itinéraire
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block absolute -right-24 bottom-0 w-96 h-96 opacity-20">
            <div className="w-full h-full bg-aiox-primary rounded-full filter blur-3xl animate-float"></div>
          </div>
        </section>
        
        {/* Featured services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-aiox-primary/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-aiox-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Explorer le Maroc</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Découvrez les sites culturels, historiques et naturels incontournables du Maroc.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/explore">Découvrir</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-aiox-primary/10 flex items-center justify-center mb-4">
                <Route className="h-6 w-6 text-aiox-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Plan de Voyage</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Créez votre itinéraire personnalisé avec notre planificateur intelligent.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/travel-plan">Planifier</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-aiox-primary/10 flex items-center justify-center mb-4">
                <Book className="h-6 w-6 text-aiox-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Blog & Articles</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Lisez et partagez des expériences, conseils et histoires sur le Maroc.
              </p>
              <Button variant="outline" asChild className="mt-auto">
                <Link to="/blog">Lire & Partager</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="discover" className="mb-12">
          <TabsList className="mb-8">
            <TabsTrigger value="discover">Découvrir</TabsTrigger>
            <TabsTrigger value="map">Carte Interactive</TabsTrigger>
            <TabsTrigger value="assistant">Assistant AI</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Sites Culturels Populaires</h2>
                <Button variant="ghost" asChild>
                  <Link to="/explore" className="flex items-center">
                    Voir Tout
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredPlaces.map((place) => (
                  <FeaturedPlace key={place.id} {...place} />
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mt-12">
                <Card className="flex-1 border-dashed bg-muted/50">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Plan de Voyage Personnalisé</h3>
                    <p className="text-muted-foreground mb-4">
                      Créez votre itinéraire sur mesure et découvrez le Maroc à votre rythme.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/travel-plan">Créer Mon Itinéraire</Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="flex-1 border-dashed bg-muted/50">
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Blog & Communauté</h3>
                    <p className="text-muted-foreground mb-4">
                      Partagez vos expériences ou découvrez les récits d'autres voyageurs.
                    </p>
                    <Button variant="outline" asChild>
                      <Link to="/blog">Explorer le Blog</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Explorer la Carte du Maroc</h2>
                <Button variant="ghost" asChild>
                  <Link to="/explore" className="flex items-center">
                    Carte Plein Écran
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
                            <Button size="sm">Détails</Button>
                            <Button variant="outline" size="sm">Itinéraire</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                          <h3 className="text-lg font-medium mb-1">Sélectionnez un Lieu</h3>
                          <p className="text-sm text-muted-foreground">
                            Cliquez sur un point d'intérêt sur la carte pour voir les détails
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
                <h2 className="text-2xl font-bold">Assistant Culturel Marocain</h2>
                <Button variant="ghost" asChild>
                  <Link to="/search" className="flex items-center">
                    Recherche Avancée
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
                      <h3 className="text-lg font-medium mb-4">Questions Suggérées</h3>
                      
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Quelles sont les spécialités culinaires marocaines?
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Parlez-moi de l'histoire de la ville de Fès
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Quels sont les meilleurs souks à visiter à Marrakech?
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-3 text-left">
                          Comment se déroule une cérémonie de thé traditionnelle?
                        </Button>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-medium mb-3">Commandes Vocales</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Vous pouvez également parler à l'assistant en utilisant des commandes vocales. Cliquez sur le bouton microphone pour essayer.
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

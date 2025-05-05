
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { User, Settings, MapPin, Map } from "lucide-react";

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simulated user data - in a real app, this would come from your authentication system
  const userData = {
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    joined: "April 2025",
    language: "English",
    interests: ["Museums", "Architecture", "Modern Art"],
    savedLocations: [
      { id: 1, name: "Louvre Museum", date: "2025-05-02" },
      { id: 3, name: "Eiffel Tower", date: "2025-05-01" },
      { id: 5, name: "Musée d'Orsay", date: "2025-04-28" },
    ]
  };
  
  // Simulate login for demo purposes
  const handleDemoLogin = () => {
    setIsAuthenticated(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 mb-16 md:mb-0">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Account Access</h1>
            <AuthForm />
            <div className="mt-8 text-center">
              <Button variant="link" onClick={handleDemoLogin}>
                Try Demo Account
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-aiox-primary text-white flex items-center justify-center text-xl font-bold">
                  {userData.name.charAt(0)}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{userData.name}</h1>
                  <p className="text-muted-foreground">Member since {userData.joined}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
            
            <Tabs defaultValue="profile" className="mb-8">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="profile" className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">
                  <MapPin className="mr-2 h-4 w-4" />
                  Saved Places
                </TabsTrigger>
                <TabsTrigger value="itineraries" className="flex-1">
                  <Map className="mr-2 h-4 w-4" />
                  Itineraries
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Full Name</h3>
                          <p>{userData.name}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Email Address</h3>
                          <p>{userData.email}</p>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Preferred Language</h3>
                          <p>{userData.language}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-1">Interests</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {userData.interests.map((interest) => (
                              <span 
                                key={interest}
                                className="bg-aiox-light dark:bg-aiox-dark/50 text-sm px-3 py-1 rounded-full"
                              >
                                {interest}
                              </span>
                            ))}
                            <Button variant="outline" size="sm" className="rounded-full">
                              + Add Interest
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">App Settings</h2>
                      
                      <div className="space-y-5">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Language</h3>
                          <select 
                            className="w-full p-2 rounded-md border bg-background"
                          >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                          </select>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Notifications</h3>
                          <div className="space-y-2">
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded" defaultChecked />
                              <span className="ml-2 text-sm">Push notifications</span>
                            </label>
                            <label className="flex items-center">
                              <input type="checkbox" className="rounded" defaultChecked />
                              <span className="ml-2 text-sm">Email updates</span>
                            </label>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">Data & Privacy</h3>
                          <Button variant="link" className="h-auto p-0 text-sm">
                            Privacy settings
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="saved">
                <h2 className="text-xl font-semibold mb-4">Saved Places</h2>
                
                {userData.savedLocations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {userData.savedLocations.map((location) => (
                      <Card key={location.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-36 bg-aiox-light dark:bg-aiox-dark/30 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-aiox-primary/70" />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium mb-1">{location.name}</h3>
                          <p className="text-xs text-muted-foreground mb-2">Saved on {new Date(location.date).toLocaleDateString()}</p>
                          <div className="flex gap-2">
                            <Button size="sm" variant="default" className="flex-1">
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Card className="overflow-hidden border-dashed flex items-center justify-center h-[188px]">
                      <Button variant="ghost">
                        + Add New Place
                      </Button>
                    </Card>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No saved places yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start exploring and save your favorite cultural sites
                      </p>
                      <Button>Start Exploring</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="itineraries">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Create Your First Itinerary</h3>
                    <p className="text-muted-foreground mb-4">
                      Build custom cultural exploration routes based on your interests
                    </p>
                    <Button>Create Itinerary</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

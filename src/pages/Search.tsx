
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConversationInterface from "@/components/ConversationInterface";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search as SearchIcon, Info, Check } from "lucide-react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search handling would go here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 mb-16 md:mb-0">
        <h1 className="text-3xl font-bold mb-6">Cultural Knowledge Search</h1>
        
        <form onSubmit={handleSearch} className="relative mb-8">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Ask about any cultural landmark, art period, or historical event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 text-lg"
          />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
            Search
          </Button>
        </form>
        
        <Tabs defaultValue="conversation" className="mb-8">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="conversation" className="flex-1">Conversation</TabsTrigger>
            <TabsTrigger value="knowledge" className="flex-1">Knowledge Base</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversation">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ConversationInterface />
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-4">Popular Topics</h3>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start text-left">
                        Renaissance Art in Europe
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        Gothic Cathedral Architecture
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        Art Nouveau Movement
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-left">
                        Modern Museum Exhibitions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-aiox-light dark:bg-aiox-dark/50 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <Info className="h-5 w-5 text-aiox-primary mr-2 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-medium">About the AI Assistant</h3>
                        <p className="text-sm text-muted-foreground">
                          Our AI cultural guide can answer questions about:
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {[
                        'Historical landmarks and monuments',
                        'Art history and famous artworks',
                        'Cultural traditions and practices',
                        'Architecture and design periods',
                        'Local customs and cultural significance'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-aiox-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      The information provided is for educational purposes. For the most accurate information, always verify with official sources.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="knowledge">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">Knowledge Base Coming Soon</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Our comprehensive cultural knowledge database is under development. Please use the conversation interface in the meantime.
              </p>
              <Button onClick={() => document.querySelector('[value="conversation"]')?.dispatchEvent(new Event('click'))}>
                Try Conversation Instead
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}

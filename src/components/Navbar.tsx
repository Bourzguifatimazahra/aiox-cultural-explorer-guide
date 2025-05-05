
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Search, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchInput = (e.currentTarget.elements.namedItem("search") as HTMLInputElement).value;
    
    if (searchInput.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchInput}`,
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-background/95 backdrop-blur sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-aiox-primary text-white font-bold p-1 rounded">
              AIOX
            </div>
            <span className="font-bold text-lg">Explorer</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link to="/">Accueil</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/explore">Explorer</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/blog">Blog</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/travel-plan">Plan de Voyage</Link>
            </Button>
          </nav>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              name="search"
              placeholder="Rechercher..."
              className="w-52 pl-8"
            />
          </form>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
        </div>
        
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
      </div>
      
      {/* Mobile Menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-background border-t p-4">
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                name="search"
                placeholder="Rechercher..."
                className="w-full pl-8"
              />
            </form>
            
            <nav className="flex flex-col space-y-2">
              <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/">Accueil</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/explore">Explorer</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/blog">Blog</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/travel-plan">Plan de Voyage</Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                <Link to="/profile">Profil</Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

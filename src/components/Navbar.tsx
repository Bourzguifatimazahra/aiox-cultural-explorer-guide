
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Map, Home, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold text-aiox-primary">AIOX Explorer</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted">
                    <Home className="h-5 w-5" />
                    <span>Home</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/explore" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted">
                    <Map className="h-5 w-5" />
                    <span>Explore</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/search" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted">
                    <Search className="h-5 w-5" />
                    <span>Search</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-muted">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-aiox-primary">AIOX</span>
            <span className="text-xl font-light">Explorer</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-aiox-primary">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-aiox-primary">
            Explore
          </Link>
          <Link to="/search" className="text-sm font-medium hover:text-aiox-primary">
            Search
          </Link>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/profile">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

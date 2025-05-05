
import { Link } from "react-router-dom";
import { Home, Map, Search, User } from "lucide-react";

export default function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t md:hidden z-50">
      <div className="container flex items-center justify-between py-2">
        <Link to="/" className="flex-1 flex flex-col items-center py-2 text-xs">
          <Home className="h-5 w-5 mb-1" />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="flex-1 flex flex-col items-center py-2 text-xs">
          <Map className="h-5 w-5 mb-1" />
          <span>Explore</span>
        </Link>
        <Link to="/search" className="flex-1 flex flex-col items-center py-2 text-xs">
          <Search className="h-5 w-5 mb-1" />
          <span>Search</span>
        </Link>
        <Link to="/profile" className="flex-1 flex flex-col items-center py-2 text-xs">
          <User className="h-5 w-5 mb-1" />
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}

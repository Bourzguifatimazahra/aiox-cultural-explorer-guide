
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface FeaturedPlaceProps {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

export default function FeaturedPlace({ id, title, description, image, category }: FeaturedPlaceProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <AspectRatio ratio={16/9}>
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full" 
          />
        </AspectRatio>
        <div className="absolute top-2 right-2">
          <span className="text-xs bg-aiox-accent/90 text-white px-3 py-1 rounded-full backdrop-blur">
            {category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-5">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button variant="ghost" size="sm" className="text-aiox-primary" asChild>
          <Link to={`/poi/${id}`}>
            Discover
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

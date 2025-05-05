
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MessageSquare, User, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "The Hidden Gems of Marrakech",
    excerpt: "Discover secret spots in this ancient Moroccan city that most tourists never see.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=1000&auto=format&fit=crop",
    author: "Karima Alaoui",
    date: "May 3, 2025",
    category: "Destinations",
    comments: 12
  },
  {
    id: 2,
    title: "Traditional Moroccan Cuisine: Beyond Tagine",
    excerpt: "Explore the rich culinary traditions of Morocco, from street food to family recipes passed down generations.",
    image: "https://images.unsplash.com/photo-1575550999079-8979d2e39405?q=80&w=1000&auto=format&fit=crop",
    author: "Hassan Benali",
    date: "April 28, 2025",
    category: "Food & Culture",
    comments: 8
  },
  {
    id: 3,
    title: "Hiking the Atlas Mountains: A Complete Guide",
    excerpt: "Everything you need to know about planning a trek through Morocco's majestic mountain range.",
    image: "https://images.unsplash.com/photo-1504199393034-2f48698cf47c?q=80&w=1000&auto=format&fit=crop",
    author: "Omar Chaoui",
    date: "April 15, 2025",
    category: "Adventure",
    comments: 5
  },
  {
    id: 4,
    title: "Exploring Morocco's Imperial Cities",
    excerpt: "A journey through Fez, Meknes, Marrakech, and Rabat - the four historic capitals of Morocco.",
    image: "https://images.unsplash.com/photo-1548774605-5b75229b3705?q=80&w=1000&auto=format&fit=crop",
    author: "Leila Ziani",
    date: "April 10, 2025",
    category: "History",
    comments: 9
  }
];

export default function Blog() {
  const [commentText, setCommentText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  
  const handlePostSelect = (id: number) => {
    setSelectedPost(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your comment! It will appear after moderation.');
    setCommentText('');
    setName('');
    setEmail('');
  };
  
  const selectedBlogPost = blogPosts.find(post => post.id === selectedPost) || blogPosts[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container py-6 mb-16 md:mb-0">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Explorez le <span className="text-aiox-primary">Maroc</span> avec Nous
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez des articles, des conseils et des histoires sur la culture, les destinations et les expériences uniques du Maroc.
          </p>
        </section>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Selected Blog Post */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img 
                  src={selectedBlogPost.image} 
                  alt={selectedBlogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {selectedBlogPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {selectedBlogPost.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {selectedBlogPost.comments} commentaires
                  </span>
                </div>
                <CardTitle className="text-2xl">{selectedBlogPost.title}</CardTitle>
                <CardDescription>{selectedBlogPost.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Le Maroc est un pays aux multiples facettes, où les traditions ancestrales côtoient la modernité dans un équilibre parfait. Des médinas labyrinthiques de Fès aux plages ensoleillées d'Essaouira, en passant par les dunes dorées du Sahara, chaque région offre une expérience unique aux voyageurs.
                </p>
                <p className="mb-4">
                  Situé à la croisée de l'Afrique et de l'Europe, le Maroc bénéficie d'influences culturelles diverses qui se reflètent dans son architecture, sa cuisine et son artisanat. Les souks animés regorgent de trésors artisanaux, tandis que les riads traditionnels offrent un havre de paix au cœur des villes animées.
                </p>
                <p className="mb-4">
                  La cuisine marocaine, reconnue mondialement, est un festival de saveurs et d'épices. Des tajines mijotés aux couscous familiaux du vendredi, en passant par les pâtisseries au miel et aux amandes, chaque plat raconte une histoire et invite au voyage sensoriel.
                </p>
                <p>
                  Que vous soyez amateur d'histoire, de nature, d'aventure ou simplement à la recherche d'un dépaysement total, le Maroc saura vous séduire par sa diversité et son authenticité.
                </p>
              </CardContent>
              <CardFooter className="flex-col items-start">
                <h3 className="text-lg font-medium mb-4">Laissez un commentaire</h3>
                <form onSubmit={handleComment} className="w-full space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      placeholder="Votre nom" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input 
                      type="email" 
                      placeholder="Votre email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Textarea 
                    placeholder="Votre commentaire" 
                    className="min-h-[100px]" 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                  />
                  <Button type="submit">Publier le commentaire</Button>
                </form>
              </CardFooter>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            {/* Recent Posts */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Articles Récents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className={`flex gap-3 p-2 rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedPost === post.id ? 'bg-muted' : ''
                    }`}
                    onClick={() => handlePostSelect(post.id)}
                  >
                    <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Voir tous les articles</Button>
              </CardFooter>
            </Card>
            
            {/* Create Post Card */}
            <Card>
              <CardHeader>
                <CardTitle>Partagez Votre Expérience</CardTitle>
                <CardDescription>Créez votre propre article sur le Maroc</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Vous avez visité un lieu incroyable au Maroc? Partagez votre expérience, vos photos et vos conseils avec notre communauté.
                </p>
                <Button className="w-full">Créer un Article</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

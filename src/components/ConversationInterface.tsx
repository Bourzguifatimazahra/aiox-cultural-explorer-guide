
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Mic, Send, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ConversationInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Bonjour! Je suis votre guide culturel au Maroc. Comment puis-je vous aider à découvrir ce pays magnifique aujourd'hui?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "La médina de Fès est la plus grande zone urbaine sans voitures au monde, avec plus de 9000 rues étroites!",
        "Le Maroc est connu comme le 'Royaume des contrastes' en raison de ses paysages variés, des montagnes aux déserts et plages.",
        "Je vous recommande de visiter Chefchaouen, connue comme la 'ville bleue' pour ses bâtiments aux teintes azur!",
        "Le thé à la menthe est une tradition marocaine importante. On le sert très sucré et il symbolise l'hospitalité.",
        "Le Maroc compte quatre villes impériales historiques: Fès, Marrakech, Meknès et Rabat, chacune ayant été capitale."
      ];
      
      const aiResponse: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        variant: "destructive",
        title: "Non supporté",
        description: "La reconnaissance vocale n'est pas supportée dans ce navigateur.",
      });
      return;
    }
    
    setIsListening(true);
    toast({
      title: "Écoute en cours...",
      description: "Dites ce que vous souhaitez découvrir au Maroc.",
    });
    
    // Simulate voice recognition (in a real app, this would use the Web Speech API)
    setTimeout(() => {
      setIsListening(false);
      const fakeVoiceInputs = [
        "Parlez-moi de la médina de Fès",
        "Quelles sont les spécialités culinaires marocaines?",
        "Que visiter à Marrakech?",
        "Raconte-moi l'histoire de Chefchaouen",
        "Quelles sont les meilleures plages du Maroc?"
      ];
      
      const randomInput = fakeVoiceInputs[Math.floor(Math.random() * fakeVoiceInputs.length)];
      setUserInput(randomInput);
      
      toast({
        title: "Texte capturé",
        description: `"${randomInput}"`,
      });
    }, 2000);
  };

  const handleTextToSpeech = (text: string) => {
    // In a real app, this would use a Text-to-Speech API
    toast({
      title: "Synthèse vocale",
      description: "Lecture de la réponse... (simulée)",
    });
    
    console.log("Speaking:", text);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="border shadow-sm flex flex-col h-[500px] max-h-[80vh]">
      <div className="p-3 border-b">
        <h3 className="text-lg font-medium">Guide Culturel Marocain</h3>
        <p className="text-sm text-muted-foreground">Posez des questions sur les sites culturels, l'histoire ou les traditions</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === 'user'
                    ? 'bg-aiox-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  
                  {msg.sender === 'ai' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleTextToSpeech(msg.content)}
                    >
                      <Volume2 className="h-3 w-3" />
                      <span className="sr-only">Synthèse vocale</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t">
        <div className="flex gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="icon"
            className={isListening ? "animate-pulse bg-aiox-accent" : ""}
            onClick={handleVoiceInput}
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Entrée vocale</span>
          </Button>
          
          <Input
            placeholder="Posez une question sur le Maroc..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          
          <Button onClick={handleSendMessage} disabled={!userInput.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Envoyer message</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

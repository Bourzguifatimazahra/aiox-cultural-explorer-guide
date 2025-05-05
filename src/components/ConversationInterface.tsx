
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Microphone, Send, Volume2 } from 'lucide-react';

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
      content: "Hello! I'm your cultural guide. How can I help you discover new places today?",
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
        "That's a great question! The Louvre Museum was originally built as a fortress in the 12th century.",
        "Notre-Dame Cathedral took nearly 200 years to build, starting in 1163.",
        "I'd recommend visiting the Musée d'Orsay if you enjoy impressionist art!",
        "The Eiffel Tower was built for the 1889 World's Fair and was initially criticized by many Parisians.",
        "There are over 400 parks and gardens in Paris, covering more than 3,000 hectares."
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
        title: "Not supported",
        description: "Voice recognition is not supported in this browser.",
      });
      return;
    }
    
    setIsListening(true);
    toast({
      title: "Listening...",
      description: "Say something about what you'd like to discover.",
    });
    
    // Simulate voice recognition (in a real app, this would use the Web Speech API)
    setTimeout(() => {
      setIsListening(false);
      const fakeVoiceInputs = [
        "Tell me about the Louvre Museum",
        "What's the history of Notre-Dame?",
        "What museums should I visit in Paris?",
        "Facts about the Eiffel Tower",
        "Where are the best parks in Paris?"
      ];
      
      const randomInput = fakeVoiceInputs[Math.floor(Math.random() * fakeVoiceInputs.length)];
      setUserInput(randomInput);
      
      toast({
        title: "Voice captured",
        description: `"${randomInput}"`,
      });
    }, 2000);
  };

  const handleTextToSpeech = (text: string) => {
    // In a real app, this would use a Text-to-Speech API
    toast({
      title: "Text-to-Speech",
      description: "Speaking the response... (simulated)",
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
        <h3 className="text-lg font-medium">AIOX Cultural Guide</h3>
        <p className="text-sm text-muted-foreground">Ask about any cultural landmark or history</p>
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
                      <span className="sr-only">Text to speech</span>
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
            <Microphone className="h-4 w-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          
          <Input
            placeholder="Ask about any cultural landmark..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          
          <Button onClick={handleSendMessage} disabled={!userInput.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

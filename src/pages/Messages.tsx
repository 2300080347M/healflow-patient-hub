
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockMessages, mockPatients, mockProviders } from '@/lib/mockData';
import { Message, User } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Messages = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [newMessageSubject, setNewMessageSubject] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const { toast } = useToast();
  
  const isProvider = user?.role === 'provider';

  useEffect(() => {
    // Simulate fetching user data
    const userRole = localStorage.getItem('userRole') || 'patient';
    
    // For demo purposes, use mock data
    if (userRole === 'patient') {
      setUser(mockPatients[0]);
      
      // Filter messages for this patient
      const patientMessages = mockMessages.filter(message => 
        message.recipientId === mockPatients[0].id || message.senderId === mockPatients[0].id
      );
      
      setMessages(patientMessages);
      setFilteredMessages(patientMessages);
    } else {
      setUser(mockProviders[0]);
      
      // Filter messages for this provider
      const providerMessages = mockMessages.filter(message => 
        message.recipientId === mockProviders[0].id || message.senderId === mockProviders[0].id
      );
      
      setMessages(providerMessages);
      setFilteredMessages(providerMessages);
    }
  }, []);

  // Filter messages based on search
  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = messages.filter(message => 
        message.subject.toLowerCase().includes(term) || 
        message.content.toLowerCase().includes(term) ||
        message.senderName.toLowerCase().includes(term) ||
        message.recipientName.toLowerCase().includes(term)
      );
      
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [messages, searchTerm]);

  const handleViewMessage = (message: Message) => {
    // Mark as read if it's a received message and is unread
    if (message.recipientId === user?.id && !message.read) {
      const updatedMessages = messages.map(m =>
        m.id === message.id ? { ...m, read: true } : m
      );
      
      setMessages(updatedMessages);
    }
    
    setSelectedMessage(message);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !newMessageRecipient || !newMessageSubject || !newMessageContent) {
      toast({
        title: "Unable to Send",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would make an API call to send the message
    const newMessage: Message = {
      id: `m${messages.length + 1}`,
      senderId: user.id,
      senderName: user.name,
      recipientId: isProvider ? 'p1' : 'dr1',
      recipientName: isProvider ? 'John Doe' : 'Dr. Emily Johnson',
      timestamp: new Date().toISOString(),
      subject: newMessageSubject,
      content: newMessageContent,
      read: false,
      urgent: false,
    };
    
    setMessages([newMessage, ...messages]);
    setComposeOpen(false);
    
    // Reset form fields
    setNewMessageSubject('');
    setNewMessageContent('');
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  const handleReply = () => {
    if (selectedMessage) {
      setNewMessageRecipient(selectedMessage.senderId);
      setNewMessageSubject(`Re: ${selectedMessage.subject}`);
      setSelectedMessage(null);
      setComposeOpen(true);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
        <Button onClick={() => setComposeOpen(true)}>Compose New Message</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Your Messages</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <CardDescription>
            Secure communication with your healthcare providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    message.recipientId === user.id && !message.read
                      ? 'bg-blue-50 hover:bg-blue-100'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => handleViewMessage(message)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`font-medium ${message.recipientId === user.id && !message.read ? 'text-health-700' : ''}`}>
                        {message.senderId === user.id ? 'To: ' + message.recipientName : 'From: ' + message.senderName}
                      </span>
                      {message.recipientId === user.id && !message.read && (
                        <Badge className="bg-health-600">New</Badge>
                      )}
                      {message.urgent && (
                        <Badge variant="destructive">Urgent</Badge>
                      )}
                    </div>
                    <div className="text-sm truncate">
                      {message.subject}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDateTime(message.timestamp)}
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewMessage(message);
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-8 text-muted-foreground">No messages found.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Message Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={(open) => !open && setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              {selectedMessage?.senderId === user.id 
                ? `To: ${selectedMessage?.recipientName}` 
                : `From: ${selectedMessage?.senderName}`}
              {' • '}{selectedMessage && formatDateTime(selectedMessage.timestamp)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <p className="whitespace-pre-wrap">{selectedMessage?.content}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMessage(null)}>
              Close
            </Button>
            {selectedMessage?.senderId !== user.id && (
              <Button onClick={handleReply}>
                Reply
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compose Message Dialog */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Compose New Message</DialogTitle>
            <DialogDescription>
              Send a secure message to your healthcare provider
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">To:</label>
              <Input
                value={newMessageRecipient}
                onChange={(e) => setNewMessageRecipient(e.target.value)}
                placeholder={isProvider ? "Select patient..." : "Select provider..."}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject:</label>
              <Input
                value={newMessageSubject}
                onChange={(e) => setNewMessageSubject(e.target.value)}
                placeholder="Enter subject..."
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Message:</label>
              <Textarea
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => setComposeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;

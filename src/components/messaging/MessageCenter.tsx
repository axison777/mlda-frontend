import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Plus, 
  MoreHorizontal,
  Paperclip,
  Smile
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    participantId: '2',
    participantName: 'Dr. Hans Mueller',
    participantRole: 'professor',
    lastMessage: 'Excellent travail sur le dernier quiz !',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 1,
    messages: [
      {
        id: '1',
        senderId: '2',
        senderName: 'Dr. Hans Mueller',
        senderRole: 'professor',
        content: 'Bonjour Marie, j\'ai vu que vous aviez des difficultés avec les articles. Voulez-vous qu\'on en discute ?',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: '2',
        senderId: '1',
        senderName: 'Marie Dubois',
        senderRole: 'student',
        content: 'Bonjour Professeur, oui ce serait formidable ! J\'ai du mal avec der, die, das.',
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
        read: true,
      },
      {
        id: '3',
        senderId: '2',
        senderName: 'Dr. Hans Mueller',
        senderRole: 'professor',
        content: 'Excellent travail sur le dernier quiz !',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
      },
    ],
  },
];

export const MessageCenter = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [newConversation, setNewConversation] = useState({
    recipient: '',
    subject: '',
    message: '',
  });

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: user?.id || '1',
      senderName: user?.name || 'Utilisateur',
      senderRole: user?.role || 'student',
      content: newMessage,
      timestamp: new Date(),
      read: true,
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              messages: [...conv.messages, message],
              lastMessage: newMessage,
              lastMessageTime: new Date(),
            }
          : conv
      )
    );

    setNewMessage('');
    toast.success('Message envoyé !');
  };

  const handleStartNewConversation = () => {
    if (!newConversation.recipient || !newConversation.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const conversation: Conversation = {
      id: Date.now().toString(),
      participantId: Date.now().toString(),
      participantName: newConversation.recipient,
      participantRole: 'professor',
      lastMessage: newConversation.message,
      lastMessageTime: new Date(),
      unreadCount: 0,
      messages: [
        {
          id: Date.now().toString(),
          senderId: user?.id || '1',
          senderName: user?.name || 'Utilisateur',
          senderRole: user?.role || 'student',
          content: newConversation.message,
          timestamp: new Date(),
          read: true,
        },
      ],
    };

    setConversations(prev => [conversation, ...prev]);
    setNewConversation({ recipient: '', subject: '', message: '' });
    setShowNewMessageDialog(false);
    setSelectedConversation(conversation);
    toast.success('Conversation créée !');
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, unreadCount: 0, messages: conv.messages.map(msg => ({ ...msg, read: true })) }
          : conv
      )
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      admin: 'bg-red-100 text-red-800',
      professor: 'bg-blue-100 text-blue-800',
      student: 'bg-green-100 text-green-800',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="h-full flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Messages</h2>
            <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nouveau Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Destinataire</label>
                    <Input
                      value={newConversation.recipient}
                      onChange={(e) => setNewConversation(prev => ({ ...prev, recipient: e.target.value }))}
                      placeholder="Nom du destinataire"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sujet</label>
                    <Input
                      value={newConversation.subject}
                      onChange={(e) => setNewConversation(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Sujet du message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      value={newConversation.message}
                      onChange={(e) => setNewConversation(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Votre message..."
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowNewMessageDialog(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleStartNewConversation} className="bg-red-600 hover:bg-red-700">
                      Envoyer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => {
                setSelectedConversation(conversation);
                markAsRead(conversation.id);
              }}
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-red-600 text-white">
                    {conversation.participantName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">{conversation.participantName}</p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-red-600 text-white text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <Badge className={`${getRoleBadge(conversation.participantRole)} text-xs mb-1`}>
                    {conversation.participantRole === 'professor' ? 'Professeur' : 
                     conversation.participantRole === 'admin' ? 'Admin' : 'Étudiant'}
                  </Badge>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  <p className="text-xs text-gray-500">
                    {conversation.lastMessageTime.toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message View */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Message Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-red-600 text-white">
                    {selectedConversation.participantName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedConversation.participantName}</p>
                  <Badge className={getRoleBadge(selectedConversation.participantRole)}>
                    {selectedConversation.participantRole === 'professor' ? 'Professeur' : 
                     selectedConversation.participantRole === 'admin' ? 'Admin' : 'Étudiant'}
                  </Badge>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === user?.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.senderId === user?.id ? 'text-red-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Sélectionnez une conversation</p>
              <p className="text-sm">Choisissez une conversation pour commencer à discuter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
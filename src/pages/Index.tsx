import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: 'text' | 'voice' | 'image' | 'video' | 'document' | 'sticker';
  mediaUrl?: string;
  fileName?: string;
  isDeleted?: boolean;
  reactions?: { emoji: string; users: string[] }[];
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  type: 'contact' | 'group' | 'channel';
  description?: string;
  members?: number;
  isOnline?: boolean;
  wallpaper?: string;
  customSettings?: {
    theme: string;
    notifications: boolean;
    soundEnabled: boolean;
  };
}

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location: string;
  phone?: string;
  email?: string;
  customAvatar?: string;
  wallpaper?: string;
  theme: 'default' | 'forest' | 'aurora' | 'winter';
  language: 'ru' | 'en' | 'khanty' | 'mansi' | 'buryat';
}

interface SiberianSticker {
  id: string;
  name: string;
  emoji: string;
  category: 'bears' | 'forest' | 'weather' | 'sayings';
  animated?: boolean;
}

const RUSCHAT: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);
  const [showStickers, setShowStickers] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState('default');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  // Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Евгений Андреевич',
    username: 'evgeniy_a',
    bio: '💼 Работаю в IT компании\n📱 Люблю современные технологии\n🎮 Геймер в свободное время',
    avatar: '👤',
    location: 'Москва',
    phone: '+7 (999) 123-45-67',
    email: 'evgeniy@company.ru',
    theme: 'default',
    language: 'ru',
    wallpaper: 'default'
  });

  // Extended states
  const [newContactName, setNewContactName] = useState('');
  const [newContactUsername, setNewContactUsername] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Modern stickers
  const modernStickers: SiberianSticker[] = [
    { id: '1', name: 'Привет', emoji: '👋', category: 'sayings' },
    { id: '2', name: 'Супер', emoji: '👍', category: 'sayings' },
    { id: '3', name: 'Любовь', emoji: '❤️', category: 'sayings' },
    { id: '4', name: 'Смех', emoji: '😂', category: 'sayings' },
    { id: '5', name: 'Огонь', emoji: '🔥', category: 'sayings' },
    { id: '6', name: 'Победа', emoji: '🎉', category: 'sayings' },
    { id: '7', name: 'Работа', emoji: '💼', category: 'sayings' },
    { id: '8', name: 'Кофе', emoji: '☕', category: 'sayings' },
    { id: '9', name: 'Думаю', emoji: '🤔', category: 'sayings' },
    { id: '10', name: 'Окей', emoji: '👌', category: 'sayings' },
    { id: '11', name: 'Спасибо', emoji: '🙏', category: 'sayings' },
    { id: '12', name: 'Солнце', emoji: '☀️', category: 'weather' }
  ];

  // Wallpaper options
  const wallpapers = [
    { id: 'default', name: 'Классический', preview: '🎨' },
    { id: 'blue', name: 'Голубой', preview: '💙' },
    { id: 'coral', name: 'Коралловый', preview: '🪸' },
    { id: 'green', name: 'Зеленый', preview: '💚' },
    { id: 'sunset', name: 'Закат', preview: '🌅' },
    { id: 'minimal', name: 'Минимал', preview: '⚪' }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Виктор Павлович',
      content: 'Здравствуйте Виктор Павлович! Я прочитал ваше предложение о поступлении к нам на работу.',
      time: '14:32',
      type: 'text',
      reactions: [{ emoji: '👍', users: ['Я'] }]
    },
    {
      id: '2',
      sender: 'Я',
      content: 'Отлично! Когда можем встретиться для обсуждения?',
      time: '14:35',
      type: 'text'
    },
    {
      id: '3',
      sender: 'Виктор Павлович',
      content: '🎵 Голосовое сообщение',
      time: '14:38',
      type: 'voice'
    },
    {
      id: '4',
      sender: 'Виктор Павлович',
      content: '👍',
      time: '14:40',
      type: 'sticker'
    }
  ]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Виктор Павлович',
      lastMessage: '👍',
      time: '14:40',
      avatar: '👨‍💼',
      unread: 3,
      type: 'contact',
      isOnline: true
    },
    {
      id: '2',
      name: 'Команда разработки',
      lastMessage: 'Встречаемся завтра в 10:00',
      time: '12:15',
      avatar: '👥',
      unread: 5,
      type: 'group',
      members: 12,
      description: 'Группа разработчиков нашей компании'
    },
    {
      id: '3',
      name: 'Анна Сергеевна',
      lastMessage: 'Документы готовы ✓',
      time: '10:42',
      avatar: '👩‍💻',
      unread: 0,
      type: 'contact',
      isOnline: false
    },
    {
      id: '4',
      name: 'IT Новости',
      lastMessage: 'Новые технологии в разработке! 🚀',
      time: '09:15',
      avatar: '📺',
      unread: 1,
      type: 'channel',
      members: 1250
    }
  ]);

  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowChatList(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSendMessage = (messageType: string = 'text', content?: string) => {
    const messageContent = content || newMessage;
    if (messageContent.trim() || messageType !== 'text') {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Я',
        content: messageContent,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: messageType as any
      };
      setMessages([...messages, message]);
      if (messageType === 'text') {
        setNewMessage('');
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setShowChatList(false);
    }
    // Mark messages as read
    const updatedChats = chats.map(chat =>
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    );
    setChats(updatedChats);
  };

  const handleBackToChats = () => {
    if (isMobile) {
      setShowChatList(true);
      setSelectedChat(null);
    }
  };

  const createNewContact = () => {
    if (newContactName && newContactUsername) {
      const newChat: Chat = {
        id: Date.now().toString(),
        name: newContactName,
        lastMessage: 'Новый контакт добавлен',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👤',
        unread: 0,
        type: 'contact',
        isOnline: Math.random() > 0.5
      };
      setChats([...chats, newChat]);
      setNewContactName('');
      setNewContactUsername('');
    }
  };

  const createNewGroup = () => {
    if (newGroupName) {
      const newChat: Chat = {
        id: Date.now().toString(),
        name: newGroupName,
        lastMessage: 'Группа создана',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        avatar: '👥',
        unread: 0,
        type: 'group',
        members: 1,
        description: newGroupDescription
      };
      setChats([...chats, newChat]);
      setNewGroupName('');
      setNewGroupDescription('');
    }
  };

  const deleteMessage = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, isDeleted: true, content: 'Сообщение удалено' } : msg
    ));
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        const existingReaction = reactions.find(r => r.emoji === emoji);
        if (existingReaction) {
          if (existingReaction.users.includes('Я')) {
            existingReaction.users = existingReaction.users.filter(u => u !== 'Я');
          } else {
            existingReaction.users.push('Я');
          }
        } else {
          reactions.push({ emoji, users: ['Я'] });
        }
        return { ...msg, reactions: reactions.filter(r => r.users.length > 0) };
      }
      return msg;
    }));
  };

  const handleFileUpload = (type: string) => {
    switch (type) {
      case 'image':
        imageInputRef.current?.click();
        break;
      case 'video':
        videoInputRef.current?.click();
        break;
      case 'audio':
        audioInputRef.current?.click();
        break;
      case 'document':
        fileInputRef.current?.click();
        break;
    }
  };

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Я',
        content: `${file.name}`,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: type as any,
        fileName: file.name,
        mediaUrl: URL.createObjectURL(file)
      };
      setMessages([...messages, message]);
    }
    setShowMediaPicker(false);
  };

  const getWallpaperGradient = (wallpaper: string) => {
    switch (wallpaper) {
      case 'blue': return 'from-chat-bg via-chat-light to-chat-blue';
      case 'coral': return 'from-chat-coral via-chat-pink to-chat-red';
      case 'green': return 'from-chat-green via-chat-lime to-chat-green';
      case 'sunset': return 'from-chat-orange via-chat-yellow to-chat-coral';
      case 'minimal': return 'from-chat-white via-chat-cream to-chat-light';
      default: return 'from-chat-bg via-chat-light to-chat-blue';
    }
  };

  const ChatList = () => (
    <div className="h-full flex flex-col bg-chat-white/95 backdrop-blur-sm border-r border-chat-blue/20">
      <CardHeader className="pb-4 bg-gradient-to-r from-chat-blue to-chat-dark-blue text-chat-white">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="text-2xl animate-pulse-glow">💬</div>
            <span>Чаты</span>
            <div className="text-2xl animate-pulse-glow">📱</div>
          </CardTitle>
          <div className="flex space-x-2">
            {/* Add Contact */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-chat-white border-chat-white/30 hover:bg-chat-white/20">
                  <Icon name="UserPlus" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-chat-white border-chat-blue/30">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    👤 Добавить контакт
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input
                      id="contact-name"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Иван Петров"
                      className="bg-chat-light/70 border-chat-blue/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-username">Логин</Label>
                    <Input
                      id="contact-username"
                      value={newContactUsername}
                      onChange={(e) => setNewContactUsername(e.target.value)}
                      placeholder="@ivan_petrov"
                      className="bg-chat-light/70 border-chat-blue/30"
                    />
                  </div>
                  <Button onClick={createNewContact} className="w-full bg-chat-blue hover:bg-chat-dark-blue text-chat-white">
                    Добавить контакт
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Group */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-chat-white border-chat-white/30 hover:bg-chat-white/20">
                  <Icon name="Users" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-chat-white border-chat-blue/30">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    👥 Создать группу
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name">Название группы</Label>
                    <Input
                      id="group-name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Рабочая группа"
                      className="bg-chat-light/70 border-chat-blue/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-description">Описание</Label>
                    <Textarea
                      id="group-description"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      placeholder="Группа для обсуждения рабочих вопросов"
                      className="bg-chat-light/70 border-chat-blue/30"
                    />
                  </div>
                  <Button onClick={createNewGroup} className="w-full bg-chat-blue hover:bg-chat-dark-blue text-chat-white">
                    Создать группу
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto space-y-3 p-4">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all animate-fade-in hover:shadow-lg ${
              selectedChat === chat.id 
                ? 'bg-gradient-to-r from-chat-coral to-chat-red text-chat-white shadow-lg' 
                : 'bg-chat-white/80 hover:bg-chat-light/70 border border-chat-blue/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="text-2xl">{chat.avatar}</div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-chat-green rounded-full border-2 border-chat-white animate-pulse"></div>
                  )}
                  {chat.type === 'group' && (
                    <div className="absolute -top-1 -right-1 bg-chat-orange text-chat-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      <Icon name="Users" size={8} />
                    </div>
                  )}
                  {chat.type === 'channel' && (
                    <div className="absolute -top-1 -right-1 bg-chat-blue text-chat-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      <Icon name="Radio" size={8} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate flex items-center space-x-2">
                    <span>{chat.name}</span>
                    {chat.type === 'group' && chat.members && (
                      <Badge variant="secondary" className="text-xs">
                        {chat.members}
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm opacity-70 truncate">{chat.lastMessage}</div>
                  {chat.description && (
                    <div className="text-xs opacity-50 truncate">{chat.description}</div>
                  )}
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="text-xs opacity-60">{chat.time}</div>
                {chat.unread > 0 && (
                  <div className="bg-chat-red text-chat-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1 animate-pulse-glow">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );

  const ChatWindow = () => {
    const currentChat = chats.find(chat => chat.id === selectedChat);
    if (!selectedChat || !currentChat) {
      return (
        <div className={`flex items-center justify-center h-full bg-gradient-to-br ${getWallpaperGradient(selectedWallpaper)}`}>
          <div className="text-center text-chat-white">
            <div className="text-6xl mb-4 animate-float">💬📱✨</div>
            <p className="text-xl font-semibold">Выберите чат для начала общения</p>
            <p className="text-sm opacity-70 mt-2">Современный мессенджер для эффективного общения</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`h-full flex flex-col bg-gradient-to-br ${getWallpaperGradient(currentChat.wallpaper || selectedWallpaper)}`}>
        {/* Chat Header */}
        <CardHeader className="bg-chat-coral/90 backdrop-blur text-chat-white border-b border-chat-red/30">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToChats}
                className="text-chat-white hover:bg-chat-white/20 mr-2"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            <div className="text-2xl">{currentChat.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span>{currentChat.name}</span>
                {currentChat.type === 'group' && (
                  <Badge className="bg-chat-orange text-chat-white">
                    Группа
                  </Badge>
                )}
                {currentChat.type === 'channel' && (
                  <Badge className="bg-chat-blue text-chat-white">
                    Канал
                  </Badge>
                )}
              </div>
              <div className="text-sm opacity-70">
                {currentChat.isOnline ? (
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-chat-green rounded-full animate-pulse"></div>
                    <span>В сети</span>
                  </span>
                ) : (
                  `${currentChat.type === 'group' ? `${currentChat.members} участников` : 'Был(а) недавно'}`
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-chat-white hover:bg-chat-white/20">
                <Icon name="Phone" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-chat-white hover:bg-chat-white/20">
                <Icon name="Video" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-chat-white hover:bg-chat-white/20">
                <Icon name="MoreVertical" size={18} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'Я' ? 'justify-end' : 'justify-start'} animate-fade-in group`}
            >
              <div className="max-w-xs lg:max-w-md">
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'Я'
                      ? 'bg-chat-blue text-chat-white ml-auto'
                      : 'bg-chat-white/90 text-chat-text backdrop-blur border border-chat-blue/10'
                  } ${message.isDeleted ? 'opacity-50 italic' : ''} shadow-lg`}
                >
                  {message.type === 'voice' ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="Play" size={16} />
                      <div className="w-20 h-2 bg-current opacity-30 rounded"></div>
                      <span className="text-xs">0:15</span>
                    </div>
                  ) : message.type === 'image' ? (
                    <div className="space-y-2">
                      {message.mediaUrl && (
                        <img src={message.mediaUrl} alt="Изображение" className="rounded max-w-full h-auto" />
                      )}
                      {message.content && <div>{message.content}</div>}
                    </div>
                  ) : message.type === 'video' ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-2 bg-black/20 rounded">
                        <Icon name="PlayCircle" size={24} />
                        <span>{message.fileName}</span>
                      </div>
                      {message.content && <div>{message.content}</div>}
                    </div>
                  ) : message.type === 'document' ? (
                    <div className="flex items-center space-x-2">
                      <Icon name="FileText" size={16} />
                      <span className="text-sm">{message.fileName}</span>
                    </div>
                  ) : message.type === 'sticker' ? (
                    <div className="text-4xl">{message.content}</div>
                  ) : (
                    <div>{message.content}</div>
                  )}
                  
                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.reactions.map((reaction, index) => (
                        <button
                          key={index}
                          onClick={() => addReaction(message.id, reaction.emoji)}
                          className="bg-chat-light/50 px-2 py-1 rounded-full text-xs flex items-center space-x-1 hover:bg-chat-light/70 transition-colors"
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.users.length}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs opacity-60">{message.time}</div>
                    {!message.isDeleted && (
                      <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                        <button
                          onClick={() => addReaction(message.id, '👍')}
                          className="text-xs hover:bg-chat-light/50 p-1 rounded"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => addReaction(message.id, '❤️')}
                          className="text-xs hover:bg-chat-light/50 p-1 rounded"
                        >
                          ❤️
                        </button>
                        {message.sender === 'Я' && (
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="text-xs hover:bg-chat-red/50 p-1 rounded"
                          >
                            <Icon name="Trash2" size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Sticker Panel */}
        {showStickers && (
          <div className="bg-chat-white/90 backdrop-blur border-t border-chat-blue/30 p-4">
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
              {modernStickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => {
                    handleSendMessage('sticker', sticker.emoji);
                    setShowStickers(false);
                  }}
                  className="text-2xl p-2 hover:bg-chat-light/50 rounded-lg transition-all hover:scale-110"
                  title={sticker.name}
                >
                  {sticker.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 bg-chat-white/90 backdrop-blur border-t border-chat-blue/30">
          <div className="flex items-center space-x-2">
            {/* Media Picker */}
            <Dialog open={showMediaPicker} onOpenChange={setShowMediaPicker}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-chat-blue border-chat-blue/30 hover:bg-chat-blue/10">
                  <Icon name="Paperclip" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-chat-white">
                <DialogHeader>
                  <DialogTitle>📎 Отправить файл</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleFileUpload('image')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-chat-blue/30 hover:bg-chat-light/50"
                  >
                    <Icon name="Image" size={24} />
                    <span>Фото</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('video')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-chat-blue/30 hover:bg-chat-light/50"
                  >
                    <Icon name="Video" size={24} />
                    <span>Видео</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('audio')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-chat-blue/30 hover:bg-chat-light/50"
                  >
                    <Icon name="Music" size={24} />
                    <span>Аудио</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('document')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-chat-blue/30 hover:bg-chat-light/50"
                  >
                    <Icon name="FileText" size={24} />
                    <span>Документ</span>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileSelected(e, 'document')}
            />
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileSelected(e, 'image')}
            />
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleFileSelected(e, 'video')}
            />
            <input
              ref={audioInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => handleFileSelected(e, 'audio')}
            />

            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="flex-1 bg-chat-light/70 border-chat-blue/30"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowStickers(!showStickers)}
              className={`border-chat-blue/30 ${showStickers ? 'bg-chat-blue/20 text-chat-blue' : 'text-chat-blue hover:bg-chat-blue/10'}`}
            >
              <Icon name="Smile" size={16} />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-chat-blue border-chat-blue/30 hover:bg-chat-blue/10"
            >
              <Icon name="Mic" size={16} />
            </Button>
            
            <Button 
              onClick={() => handleSendMessage()}
              className="bg-chat-blue hover:bg-chat-dark-blue text-chat-white"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${getWallpaperGradient(userProfile.wallpaper || 'default')}`}
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-chat-bg via-chat-blue to-chat-dark-blue text-chat-white p-4 shadow-lg border-b-4 border-chat-green">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-chat-lime rounded-full flex items-center justify-center text-chat-white font-bold text-xl animate-float">
              R
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              RUSCHAT
            </h1>
            <div className="hidden md:block text-sm opacity-75 ml-4">
              Ваш профиль
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block p-2 rounded-lg bg-chat-white/10">
              <Icon name="Search" size={20} />
            </div>
            <div className="hidden md:block">
              <div className="flex flex-col space-y-1">
                <div className="w-6 h-1 bg-chat-white rounded"></div>
                <div className="w-6 h-1 bg-chat-white rounded"></div>
                <div className="w-6 h-1 bg-chat-white rounded"></div>
              </div>
            </div>
            <Avatar className="border-2 border-chat-green">
              <AvatarFallback className="bg-chat-coral text-chat-white text-xl">{userProfile.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-chat-white/90 backdrop-blur border border-chat-blue/30">
            <TabsTrigger value="chats" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="Radio" size={16} />
              <span className="hidden sm:inline">Каналы</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Контакты</span>
            </TabsTrigger>
            <TabsTrigger value="stickers" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="Smile" size={16} />
              <span className="hidden sm:inline">Стикеры</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-chat-blue data-[state=active]:text-chat-white">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab - Responsive Layout */}
          <TabsContent value="chats" className="space-y-4">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 h-[600px] shadow-xl">
              {isMobile ? (
                <div className="h-full">
                  {showChatList ? <ChatList /> : <ChatWindow />}
                </div>
              ) : (
                <div className="flex h-full">
                  <div className="w-1/3">
                    <ChatList />
                  </div>
                  <div className="flex-1">
                    <ChatWindow />
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Other tabs placeholder */}
          <TabsContent value="profile">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 shadow-xl p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">👤</div>
                <h2 className="text-2xl font-bold text-chat-text mb-2">{userProfile.name}</h2>
                <p className="text-chat-text-light">@{userProfile.username}</p>
                <div className="mt-4 p-4 bg-chat-light/50 rounded-lg">
                  <p className="text-chat-text whitespace-pre-line">{userProfile.bio}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="stickers">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 shadow-xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">😊</div>
                <p className="text-chat-text">Коллекция стикеров</p>
                <div className="grid grid-cols-6 gap-4 mt-6">
                  {modernStickers.map((sticker) => (
                    <div key={sticker.id} className="text-4xl p-4 bg-chat-light/50 rounded-lg hover:bg-chat-light/70 cursor-pointer transition-all hover:scale-110">
                      {sticker.emoji}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 shadow-xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <p className="text-chat-text">Настройки приложения</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="channels">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 shadow-xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">📡</div>
                <p className="text-chat-text">Каналы и подписки</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-chat-white/95 backdrop-blur border-chat-blue/30 shadow-xl p-8">
              <div className="text-center">
                <div className="text-4xl mb-4">👥</div>
                <p className="text-chat-text">Список контактов</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RUSCHAT;
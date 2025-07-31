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

const SibCHAT: React.FC = () => {
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

  // Profile state with extended customization
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Мишаня Сибирякович',
    username: 'siberian_cosmonaut',
    bio: '🚀 Покоритель тайги и космоса\n🐻 Дружу с медведями\n❄️ Морозостойкий до -50°C',
    avatar: '🧑‍🚀',
    location: 'Байкальская тайга',
    phone: '+7 (999) 123-45-67',
    email: 'mishanya@taiga.ru',
    theme: 'default',
    language: 'ru',
    wallpaper: 'aurora'
  });

  // Extended states
  const [newContactName, setNewContactName] = useState('');
  const [newContactUsername, setNewContactUsername] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [showProfileEditor, setShowProfileEditor] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Siberian stickers with mascots
  const siberianStickers: SiberianSticker[] = [
    { id: '1', name: 'Мишаня приветствует', emoji: '🐻👋', category: 'bears' },
    { id: '2', name: 'Писец удивляется', emoji: '🦊😲', category: 'forest' },
    { id: '3', name: 'Волк воет', emoji: '🐺🌙', category: 'forest' },
    { id: '4', name: 'Морозец', emoji: '❄️🥶', category: 'weather' },
    { id: '5', name: 'Ничё так', emoji: '👍🌲', category: 'sayings' },
    { id: '6', name: 'Заяц в шоке', emoji: '🐰😱', category: 'forest' },
    { id: '7', name: 'Олень гордый', emoji: '🦌✨', category: 'forest' },
    { id: '8', name: 'Северное сияние', emoji: '🌌💚', category: 'weather' },
    { id: '9', name: 'Медведь спит', emoji: '🐻😴', category: 'bears' },
    { id: '10', name: 'Тайга зовет', emoji: '🌲📞', category: 'sayings' },
    { id: '11', name: 'Рыбка поймалась', emoji: '🐟🎣', category: 'sayings' },
    { id: '12', name: 'Баня готова', emoji: '🔥🏠', category: 'sayings' }
  ];

  // Wallpaper options
  const wallpapers = [
    { id: 'default', name: 'Классический', preview: '🌨️' },
    { id: 'taiga', name: 'Тайга', preview: '🌲' },
    { id: 'baikal', name: 'Байкал', preview: '🏔️' },
    { id: 'aurora', name: 'Северное сияние', preview: '🌌' },
    { id: 'winter', name: 'Зимний лес', preview: '❄️' },
    { id: 'sunset', name: 'Сибирский закат', preview: '🌅' }
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Медведь Миша',
      content: 'Братан, как дела в тайге? ❄️',
      time: '14:32',
      type: 'text',
      reactions: [{ emoji: '👍', users: ['Я'] }]
    },
    {
      id: '2',
      sender: 'Я',
      content: 'Ничё так, мороз крепчает! 🐻',
      time: '14:35',
      type: 'text'
    },
    {
      id: '3',
      sender: 'Медведь Миша',
      content: '🎵 Голосовое сообщение',
      time: '14:38',
      type: 'voice'
    },
    {
      id: '4',
      sender: 'Медведь Миша',
      content: '🐻👋',
      time: '14:40',
      type: 'sticker'
    }
  ]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Медведь Миша',
      lastMessage: '🐻👋',
      time: '14:40',
      avatar: '🐻',
      unread: 3,
      type: 'contact',
      isOnline: true
    },
    {
      id: '2',
      name: 'Сибирские Волки',
      lastMessage: 'Завтра на рыбалку?',
      time: '12:15',
      avatar: '🐺',
      unread: 5,
      type: 'group',
      members: 12,
      description: 'Стойбище настоящих сибирских охотников'
    },
    {
      id: '3',
      name: 'Шаман Айыы',
      lastMessage: 'Завтра снег будет ❄️',
      time: '10:42',
      avatar: '🔮',
      unread: 0,
      type: 'contact',
      isOnline: false
    },
    {
      id: '4',
      name: 'Байкальские Новости',
      lastMessage: 'Ледостав начался! 🧊',
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
        lastMessage: 'Стойбище создано',
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
      case 'taiga': return 'from-forest via-taiga to-forest';
      case 'baikal': return 'from-lake via-river to-glacier';
      case 'aurora': return 'from-aurora-purple via-aurora-green to-aurora-blue';
      case 'winter': return 'from-glacier via-snow to-glacier';
      case 'sunset': return 'from-sunset via-amber to-sunset';
      default: return 'from-glacier via-snow to-river';
    }
  };

  const ChatList = () => (
    <div className="h-full flex flex-col bg-snow/95 backdrop-blur-sm">
      <CardHeader className="pb-4 bg-gradient-to-r from-taiga to-forest text-snow">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="text-2xl animate-aurora-glow">❄️</div>
            <span>Чаты</span>
            <div className="text-2xl animate-aurora-glow">🏔️</div>
          </CardTitle>
          <div className="flex space-x-2">
            {/* Add Contact */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-snow border-snow/30 hover:bg-snow/20">
                  <Icon name="UserPlus" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-snow border-river/30">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    🐻 Добавить товарища
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя в тайге</Label>
                    <Input
                      id="contact-name"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Медведь Федя"
                      className="bg-glacier/70 border-river/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-username">Позывной</Label>
                    <Input
                      id="contact-username"
                      value={newContactUsername}
                      onChange={(e) => setNewContactUsername(e.target.value)}
                      placeholder="@siberian_bear"
                      className="bg-glacier/70 border-river/30"
                    />
                  </div>
                  <Button onClick={createNewContact} className="w-full bg-taiga hover:bg-forest text-snow">
                    Добавить в стойбище
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Group */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-snow border-snow/30 hover:bg-snow/20">
                  <Icon name="Users" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-snow border-river/30">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    🏕️ Создать стойбище
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name">Название стойбища</Label>
                    <Input
                      id="group-name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Охотники Севера"
                      className="bg-glacier/70 border-river/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-description">Описание</Label>
                    <Textarea
                      id="group-description"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      placeholder="Группа для настоящих сибирских охотников"
                      className="bg-glacier/70 border-river/30"
                    />
                  </div>
                  <Button onClick={createNewGroup} className="w-full bg-taiga hover:bg-forest text-snow">
                    Создать стойбище
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
                ? 'bg-gradient-to-r from-taiga to-forest text-snow shadow-lg' 
                : 'bg-glacier/50 hover:bg-glacier/70 border border-river/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="text-2xl">{chat.avatar}</div>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-aurora-green rounded-full border-2 border-snow"></div>
                  )}
                  {chat.type === 'group' && (
                    <div className="absolute -top-1 -right-1 bg-amber text-taiga text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      <Icon name="Users" size={8} />
                    </div>
                  )}
                  {chat.type === 'channel' && (
                    <div className="absolute -top-1 -right-1 bg-river text-snow text-xs rounded-full w-4 h-4 flex items-center justify-center">
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
                  <div className="bg-amber text-taiga text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1 animate-bear-tracks">
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
          <div className="text-center text-snow">
            <div className="text-6xl mb-4 animate-aurora-glow">❄️💬🐻</div>
            <p className="text-xl font-semibold">Выберите чат для начала общения</p>
            <p className="text-sm opacity-70 mt-2">Тайга ждет ваших сообщений</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`h-full flex flex-col bg-gradient-to-br ${getWallpaperGradient(currentChat.wallpaper || selectedWallpaper)}`}>
        {/* Chat Header */}
        <CardHeader className="bg-taiga/90 backdrop-blur text-snow border-b border-river/30">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToChats}
                className="text-snow hover:bg-snow/20 mr-2"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            <div className="text-2xl">{currentChat.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span>{currentChat.name}</span>
                {currentChat.type === 'group' && (
                  <Badge className="bg-amber text-taiga">
                    Стойбище
                  </Badge>
                )}
                {currentChat.type === 'channel' && (
                  <Badge className="bg-river text-snow">
                    Канал
                  </Badge>
                )}
              </div>
              <div className="text-sm opacity-70">
                {currentChat.isOnline ? (
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-aurora-green rounded-full"></div>
                    <span>В тайге</span>
                  </span>
                ) : (
                  `${currentChat.type === 'group' ? `${currentChat.members} участников` : 'Был в тайге недавно'}`
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="text-snow hover:bg-snow/20">
                <Icon name="Phone" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-snow hover:bg-snow/20">
                <Icon name="Video" size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="text-snow hover:bg-snow/20">
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
              className={`flex ${message.sender === 'Я' ? 'justify-end' : 'justify-start'} animate-bear-tracks group`}
            >
              <div className="max-w-xs lg:max-w-md">
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === 'Я'
                      ? 'bg-taiga text-snow ml-auto'
                      : 'bg-snow/90 text-taiga backdrop-blur'
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
                          className="bg-glacier/50 px-2 py-1 rounded-full text-xs flex items-center space-x-1 hover:bg-glacier/70"
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
                          className="text-xs hover:bg-glacier/50 p-1 rounded"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => addReaction(message.id, '❤️')}
                          className="text-xs hover:bg-glacier/50 p-1 rounded"
                        >
                          ❤️
                        </button>
                        {message.sender === 'Я' && (
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="text-xs hover:bg-red-500/50 p-1 rounded"
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
          <div className="bg-snow/90 backdrop-blur border-t border-river/30 p-4">
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
              {siberianStickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => {
                    handleSendMessage('sticker', sticker.emoji);
                    setShowStickers(false);
                  }}
                  className="text-2xl p-2 hover:bg-glacier/50 rounded-lg transition-all hover:scale-110"
                  title={sticker.name}
                >
                  {sticker.emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-4 bg-snow/90 backdrop-blur border-t border-river/30">
          <div className="flex items-center space-x-2">
            {/* Media Picker */}
            <Dialog open={showMediaPicker} onOpenChange={setShowMediaPicker}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-taiga border-river/30 hover:bg-river/10">
                  <Icon name="Paperclip" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-snow">
                <DialogHeader>
                  <DialogTitle>📎 Отправить файл</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleFileUpload('image')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-river/30"
                  >
                    <Icon name="Image" size={24} />
                    <span>Фото</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('video')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-river/30"
                  >
                    <Icon name="Video" size={24} />
                    <span>Видео</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('audio')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-river/30"
                  >
                    <Icon name="Music" size={24} />
                    <span>Аудио</span>
                  </Button>
                  <Button
                    onClick={() => handleFileUpload('document')}
                    variant="outline"
                    className="flex flex-col items-center p-4 h-auto space-y-2 border-river/30"
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
              placeholder="Напиши что-то сибирское..."
              className="flex-1 bg-glacier/70 border-river/30"
            />
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowStickers(!showStickers)}
              className={`border-river/30 ${showStickers ? 'bg-river/20 text-river' : 'text-taiga hover:bg-river/10'}`}
            >
              <Icon name="Smile" size={16} />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="text-taiga border-river/30 hover:bg-river/10"
            >
              <Icon name="Mic" size={16} />
            </Button>
            
            <Button 
              onClick={() => handleSendMessage()}
              className="bg-taiga hover:bg-forest text-snow"
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
      {/* Header with Siberian design */}
      <div className="bg-gradient-to-r from-taiga via-forest to-taiga text-snow p-4 shadow-lg border-b-4 border-amber">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-aurora-glow">❄️</div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              SibCHAT
            </h1>
            <div className="text-3xl animate-aurora-glow">🐻</div>
            <div className="hidden md:block text-sm opacity-75">
              Сибирский мессенджер для настоящих таёжников
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-amber animate-aurora-glow hidden md:block">
              🌟 Северное сияние в сети
            </div>
            <Avatar className="border-2 border-amber">
              <AvatarFallback className="bg-amber text-taiga text-xl">{userProfile.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-snow/90 backdrop-blur border border-river/30">
            <TabsTrigger value="chats" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="Radio" size={16} />
              <span className="hidden sm:inline">Каналы</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Избушка</span>
            </TabsTrigger>
            <TabsTrigger value="maps" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="Map" size={16} />
              <span className="hidden sm:inline">Тайга</span>
            </TabsTrigger>
            <TabsTrigger value="stickers" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="Smile" size={16} />
              <span className="hidden sm:inline">Стикеры</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-taiga data-[state=active]:text-snow">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab - Responsive Layout */}
          <TabsContent value="chats" className="space-y-4">
            <Card className="bg-snow/95 backdrop-blur border-river/30 h-[600px] shadow-xl">
              {isMobile ? (
                <div className="h-full">
                  {showChatList ? <ChatList /> : <ChatWindow />}
                </div>
              ) : (
                <div className="flex h-full">
                  <div className="w-1/3 border-r border-river/30">
                    <ChatList />
                  </div>
                  <div className="flex-1">
                    <ChatWindow />
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Other tabs would continue... */}
          <TabsContent value="profile">
            <div className="text-center text-taiga">
              <div className="text-4xl mb-4">🏠</div>
              <p>Профиль пользователя будет здесь</p>
            </div>
          </TabsContent>

          <TabsContent value="stickers">
            <div className="text-center text-taiga">
              <div className="text-4xl mb-4">😊</div>
              <p>Сибирские стикеры будут здесь</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center text-taiga">
              <div className="text-4xl mb-4">⚙️</div>
              <p>Настройки будут здесь</p>
            </div>
          </TabsContent>

          <TabsContent value="channels">
            <div className="text-center text-taiga">
              <div className="text-4xl mb-4">📡</div>
              <p>Каналы будут здесь</p>
            </div>
          </TabsContent>

          <TabsContent value="maps">
            <div className="text-center text-taiga">
              <div className="text-4xl mb-4">🗺️</div>
              <p>Карта тайги будет здесь</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Shaman bot notification with new styling */}
      <div className="fixed bottom-4 right-4 animate-bounce">
        <div className="bg-gradient-to-r from-amber to-sunset text-taiga p-4 rounded-lg shadow-xl border-2 border-aurora-gold">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-aurora-glow">🔮</div>
            <div>
              <div className="font-semibold text-lg">Шаман Айыы</div>
              <div className="text-sm">Завтра будет снег! ❄️</div>
              <div className="text-xs opacity-70">Кликни для подробностей</div>
            </div>
          </div>
        </div>
      </div>

      {/* Snowfall animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="animate-snowfall text-white/20 text-xl absolute">❄️</div>
        <div className="animate-snowfall text-white/10 text-sm absolute" style={{ left: '20%', animationDelay: '2s' }}>❄️</div>
        <div className="animate-snowfall text-white/20 text-lg absolute" style={{ left: '40%', animationDelay: '4s' }}>❄️</div>
        <div className="animate-snowfall text-white/10 text-sm absolute" style={{ left: '60%', animationDelay: '1s' }}>❄️</div>
        <div className="animate-snowfall text-white/20 text-xl absolute" style={{ left: '80%', animationDelay: '3s' }}>❄️</div>
      </div>
    </div>
  );
};

export default SibCHAT;
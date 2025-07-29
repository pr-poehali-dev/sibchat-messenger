import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  sender: string;
  content: string;
  time: string;
  type: 'text' | 'voice';
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unread: number;
  type: 'contact' | 'group';
}

interface UserProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location: string;
}

const SibCHAT: React.FC = () => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);

  // Profile state
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Космический Сибиряк',
    username: 'siberian_astronaut',
    bio: '🌲 Покоритель тайги и космоса',
    avatar: '🧑‍🚀',
    location: 'Красноярская тайга'
  });

  // New contact/group states
  const [newContactName, setNewContactName] = useState('');
  const [newContactUsername, setNewContactUsername] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'Медведь Миша',
      content: 'Братан, как дела в тайге? ❄️',
      time: '14:32',
      type: 'text'
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
    }
  ]);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Медведь Миша',
      lastMessage: '🎵 Голосовое сообщение',
      time: '14:38',
      avatar: '🐻',
      unread: 2,
      type: 'contact'
    },
    {
      id: '2',
      name: 'Сибирские Волки',
      lastMessage: 'Завтра на рыбалку?',
      time: '12:15',
      avatar: '🐺',
      unread: 5,
      type: 'group'
    },
    {
      id: '3',
      name: 'Шаман Айыы',
      lastMessage: 'Завтра снег будет ❄️',
      time: '10:42',
      avatar: '🔮',
      unread: 0,
      type: 'contact'
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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'Я',
        content: newMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setShowChatList(false);
    }
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
        type: 'contact'
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
        type: 'group'
      };
      setChats([...chats, newChat]);
      setNewGroupName('');
      setNewGroupDescription('');
    }
  };

  const updateProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const ChatList = () => (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Icon name="MessageCircle" size={20} />
            <span>Чаты</span>
          </CardTitle>
          <div className="flex space-x-2">
            {/* Add Contact Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-taiga border-taiga/30">
                  <Icon name="UserPlus" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-snow">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Добавить контакт
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Имя</Label>
                    <Input
                      id="contact-name"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      placeholder="Медведь Федя"
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-username">Username</Label>
                    <Input
                      id="contact-username"
                      value={newContactUsername}
                      onChange={(e) => setNewContactUsername(e.target.value)}
                      placeholder="@siberian_bear"
                      className="bg-white/70"
                    />
                  </div>
                  <Button onClick={createNewContact} className="w-full bg-taiga hover:bg-taiga/80 text-snow">
                    Добавить контакт
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Group Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-taiga border-taiga/30">
                  <Icon name="Users" size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-snow">
                <DialogHeader>
                  <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Создать стойбище
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="group-name">Название группы</Label>
                    <Input
                      id="group-name"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      placeholder="Охотники Севера"
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="group-description">Описание</Label>
                    <Textarea
                      id="group-description"
                      value={newGroupDescription}
                      onChange={(e) => setNewGroupDescription(e.target.value)}
                      placeholder="Группа для настоящих сибирских охотников"
                      className="bg-white/70"
                    />
                  </div>
                  <Button onClick={createNewGroup} className="w-full bg-taiga hover:bg-taiga/80 text-snow">
                    Создать стойбище
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-3">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatSelect(chat.id)}
            className={`p-3 rounded-lg cursor-pointer transition-all animate-fade-in ${
              selectedChat === chat.id 
                ? 'bg-taiga text-snow' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="text-2xl">{chat.avatar}</div>
                  {chat.type === 'group' && (
                    <div className="absolute -bottom-1 -right-1 bg-amber text-taiga text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      <Icon name="Users" size={8} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{chat.name}</div>
                  <div className="text-sm opacity-70 truncate">{chat.lastMessage}</div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <div className="text-xs opacity-60">{chat.time}</div>
                {chat.unread > 0 && (
                  <div className="bg-amber text-taiga text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
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
        <div className="flex items-center justify-center h-full text-taiga/50">
          <div className="text-center">
            <div className="text-6xl mb-4">💬</div>
            <p>Выберите чат для начала общения</p>
          </div>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col">
        <CardHeader className="bg-taiga text-snow">
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBackToChats}
                className="text-snow hover:bg-taiga/80 mr-2"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
            )}
            <div className="text-2xl">{currentChat.avatar}</div>
            <span>{currentChat.name}</span>
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">В тайге</span>
              {currentChat.type === 'group' && (
                <span className="text-xs bg-amber text-taiga px-2 py-1 rounded">
                  Стойбище
                </span>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        
        {/* Messages */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'Я' ? 'justify-end' : 'justify-start'} animate-bear-tracks`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'Я'
                    ? 'bg-taiga text-snow'
                    : 'bg-white/70 text-taiga'
                }`}
              >
                {message.type === 'voice' ? (
                  <div className="flex items-center space-x-2">
                    <Icon name="Play" size={16} />
                    <div className="w-20 h-2 bg-current opacity-30 rounded"></div>
                    <span className="text-xs">0:15</span>
                  </div>
                ) : (
                  <div>{message.content}</div>
                )}
                <div className="text-xs opacity-60 mt-1">{message.time}</div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Message Input */}
        <div className="p-4 bg-white/50 backdrop-blur border-t border-taiga/20">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="text-taiga border-taiga/30">
              <Icon name="Paperclip" size={16} />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напиши что-то сибирское..."
              className="flex-1 bg-white/70 border-taiga/30"
            />
            <Button 
              variant="outline" 
              size="sm" 
              className="text-taiga border-taiga/30"
            >
              <Icon name="Mic" size={16} />
            </Button>
            <Button 
              onClick={handleSendMessage}
              className="bg-taiga hover:bg-taiga/80 text-snow"
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
      className="min-h-screen bg-gradient-to-br from-arctic via-snow to-blue-100"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {/* Header */}
      <div className="bg-taiga text-snow p-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">❄️</div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              SibCHAT
            </h1>
            <div className="text-2xl">🐻</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-amber">🌟 Северное сияние онлайн</div>
            <Avatar>
              <AvatarFallback className="bg-amber text-taiga">{userProfile.avatar}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-snow/80 backdrop-blur">
            <TabsTrigger value="chats" className="flex items-center space-x-2">
              <Icon name="MessageCircle" size={16} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center space-x-2">
              <Icon name="Radio" size={16} />
              <span className="hidden sm:inline">Каналы</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Избушка</span>
            </TabsTrigger>
            <TabsTrigger value="maps" className="flex items-center space-x-2">
              <Icon name="Map" size={16} />
              <span className="hidden sm:inline">Тайга</span>
            </TabsTrigger>
            <TabsTrigger value="stickers" className="flex items-center space-x-2">
              <Icon name="Smile" size={16} />
              <span className="hidden sm:inline">Стикеры</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Стойбища</span>
            </TabsTrigger>
          </TabsList>

          {/* Chats Tab - Responsive Layout */}
          <TabsContent value="chats" className="space-y-4">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20 h-[600px]">
              {isMobile ? (
                <div className="h-full">
                  {showChatList ? <ChatList /> : <ChatWindow />}
                </div>
              ) : (
                <div className="flex h-full">
                  <div className="w-1/3 border-r border-taiga/20">
                    <ChatList />
                  </div>
                  <div className="flex-1">
                    <ChatWindow />
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Profile with Edit */}
          <TabsContent value="profile">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    🏠 Моя избушка
                  </CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-taiga border-taiga/30">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-snow">
                      <DialogHeader>
                        <DialogTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Редактировать профиль
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="profile-name">Имя</Label>
                          <Input
                            id="profile-name"
                            value={userProfile.name}
                            onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            className="bg-white/70"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profile-username">Username</Label>
                          <Input
                            id="profile-username"
                            value={userProfile.username}
                            onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                            className="bg-white/70"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profile-bio">Описание</Label>
                          <Textarea
                            id="profile-bio"
                            value={userProfile.bio}
                            onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                            className="bg-white/70"
                          />
                        </div>
                        <div>
                          <Label htmlFor="profile-location">Локация</Label>
                          <Input
                            id="profile-location"
                            value={userProfile.location}
                            onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                            className="bg-white/70"
                          />
                        </div>
                        <Button 
                          onClick={() => updateProfile(userProfile)} 
                          className="w-full bg-taiga hover:bg-taiga/80 text-snow"
                        >
                          Сохранить изменения
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-amber text-taiga text-3xl">{userProfile.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-taiga" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {userProfile.name}
                    </h2>
                    <p className="text-taiga/70">@{userProfile.username}</p>
                    <p className="text-sm mt-2">{userProfile.bio}</p>
                    <p className="text-xs text-amber mt-1">📍 {userProfile.location}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h3 className="font-semibold text-taiga mb-2">🔐 Безопасность</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Шифрование</span>
                        <span className="text-green-600">Включено</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Двухфакторная аутентификация</span>
                        <span className="text-green-600">Активна</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/50 rounded-lg">
                    <h3 className="font-semibold text-taiga mb-2">⚙️ Настройки</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Сибирский сленг</span>
                        <span className="text-amber">Включен</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Морозостойкость</span>
                        <span className="text-blue-600">-40°C</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs remain the same */}
          <TabsContent value="channels">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  📡 Сибирские каналы
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all animate-fade-in">
                  <div className="text-2xl mb-2">🌨️</div>
                  <h3 className="font-semibold text-taiga">Сибирская Погода</h3>
                  <p className="text-sm opacity-70">Прогнозы и новости о погоде</p>
                  <div className="text-xs text-amber mt-2">1.2K подписчиков</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all animate-fade-in">
                  <div className="text-2xl mb-2">🐺</div>
                  <h3 className="font-semibold text-taiga">Дикая Природа</h3>
                  <p className="text-sm opacity-70">Фото и видео животных Сибири</p>
                  <div className="text-xs text-amber mt-2">856 подписчиков</div>
                </div>
                <div className="p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all animate-fade-in">
                  <div className="text-2xl mb-2">🔥</div>
                  <h3 className="font-semibold text-taiga">Выживание в Тайге</h3>
                  <p className="text-sm opacity-70">Советы для жизни в суровых условиях</p>
                  <div className="text-xs text-amber mt-2">2.1K подписчиков</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maps">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  🗺️ Сибирская тайга
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-br from-green-800 to-green-600 h-96 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="text-6xl animate-pulse">🌲🌲🌲🌲🌲</div>
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 p-3 rounded-lg">
                    <div className="text-sm font-semibold text-taiga">Текущая локация</div>
                    <div className="text-xs text-taiga/70">{userProfile.location}</div>
                    <div className="text-xs text-amber mt-1">🐻 Медведи замечены</div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg">
                    <div className="text-sm font-semibold text-taiga">Погода</div>
                    <div className="text-2xl">❄️ -25°C</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stickers">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  😊 Сибирские стикеры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {['🐻', '❄️', '🌲', '🔥', '🐺', '🦌', '🌨️', '🏔️', '🔮', '⭐', '🌟', '🎿', '🛷', '🧊', '🦉', '🐰'].map((sticker, index) => (
                    <div
                      key={index}
                      className="text-4xl p-4 bg-white/50 rounded-lg hover:bg-white/70 cursor-pointer transition-all hover:scale-110 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {sticker}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups">
            <Card className="bg-snow/90 backdrop-blur border-taiga/20">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  👥 Сибирские стойбища
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'Охотники Севера', members: 234, icon: '🏹' },
                  { name: 'Рыбаки Байкала', members: 189, icon: '🎣' },
                  { name: 'Космические Сибиряки', members: 67, icon: '🚀' },
                  { name: 'Грибники Тайги', members: 156, icon: '🍄' }
                ].map((group, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover:bg-white/70 transition-all animate-fade-in">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{group.icon}</div>
                      <div>
                        <h3 className="font-semibold text-taiga">{group.name}</h3>
                        <p className="text-sm text-taiga/70">{group.members} участников</p>
                      </div>
                    </div>
                    <Button variant="outline" className="border-taiga/30 text-taiga hover:bg-taiga hover:text-snow">
                      Войти
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Shaman bot notification */}
      <div className="fixed bottom-4 right-4 animate-bounce">
        <div className="bg-amber text-taiga p-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🔮</div>
            <div>
              <div className="font-semibold text-sm">Шаман Айыы</div>
              <div className="text-xs">Завтра будет снег! ❄️</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SibCHAT;
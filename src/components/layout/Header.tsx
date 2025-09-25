import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { NotificationCenter } from '@/components/NotificationCenter';
import { useNotifications } from '@/hooks/useNotifications';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings, LogOut, ChevronDown, CircleUser as UserCircle, User } from 'lucide-react'ort const Header = () => {

export const Header = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleViewProfile = () => {
    const basePath = user?.role === 'admin' ? '/admin' : 
                     user?.role === 'professor' ? '/professor' : '/student';
    window.location.href = `${basePath}/profile`;
  };

  return (
    <>
      <header className="fixed top-0 left-70 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30 w-full">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              className="pl-10 w-64 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100 px-4 py-2 rounded-lg h-auto">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-red-600 text-white text-sm font-medium">
                    {user?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuItem onClick={handleViewProfile}>
                <UserCircle className="w-4 h-4 mr-2" />
                <span>Mon profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleViewProfile}>
                <Settings className="w-4 h-4 mr-2" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Connecté en tant que</p>
                <p className="text-sm font-medium capitalize text-red-600">
                  {user?.role === 'admin' ? 'Administrateur' :
                   user?.role === 'professor' ? 'Professeur' : 'Étudiant'}
                </p>
                <p className="text-xs text-gray-500 mt-1">{user?.email || 'email@example.com'}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600">
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      
      <NotificationCenter
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
    </>
  );
};
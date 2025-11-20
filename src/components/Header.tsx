import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Header Component
 * Navigation header with user info and logout functionality
 */
export function Header() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="border-b bg-white/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center size-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
          >
            <Briefcase className="size-5" />
          </motion.div>
          <div>
            <h1 className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career Advisor
            </h1>
            <p className="text-xs text-muted-foreground">Personalized Career Guidance</p>
          </div>
        </motion.div>

        {/* User Info and Logout */}
        {user && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100"
            >
              <User className="size-4 text-primary" />
              <span className="text-sm">{user.name}</span>
            </motion.div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-red-50 hover:border-red-200"
            >
              <LogOut className="size-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
import React, { useState } from 'react';
import { Home, User, FolderOpen, Mail, Menu, X, Code2, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface ModernNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ModernNavigation: React.FC<ModernNavigationProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'apropos', label: 'À propos', icon: User },
    { id: 'projets', label: 'Projets', icon: FolderOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-white/10 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Code2 className="w-8 h-8 text-primary-500 dark:text-primary-400" />
                <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>

            {/* Desktop Tabs and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full p-2 border border-gray-300/30 dark:border-white/20 flex items-center">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg transform scale-105'
                          : 'text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                className="p-2 text-gray-700 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 h-full bg-white/10 backdrop-blur-xl border-l border-white/20">
            <div className="p-6 pt-20">
              <div className="space-y-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-4 p-4 rounded-xl font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                          : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
              activeTab === tab.id ? 'bg-gradient-to-r from-primary-400 to-primary-500' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default ModernNavigation;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { items } = useCart();
  const { language, setLanguage } = useLanguage();

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-white tracking-wider font-montserrat">Armornasvap</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-white hover:text-gray-300 transition-colors duration-300 font-montserrat">
              {language === 'ru' ? 'Товары' : 'Products'}
            </Link>
            <Link to="/create-mask" className="text-white hover:text-gray-300 transition-colors duration-300 font-montserrat">
              {language === 'ru' ? 'Создать Маску' : 'Make Oni Mask'}
            </Link>
            <Link to="/create-ring" className="text-white hover:text-gray-300 transition-colors duration-300 font-montserrat">
              {language === 'ru' ? 'Создать Кольцо' : 'Make Ring'}
            </Link>
            <Link to="/about" className="text-white hover:text-gray-300 transition-colors duration-300 font-montserrat">
              {language === 'ru' ? 'О Нас' : 'About Us'}
            </Link>
            <Link to="/delivery" className="text-white hover:text-gray-300 transition-colors duration-300 font-montserrat">
              {language === 'ru' ? 'Доставка' : 'Delivery'}
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="text-white hover:text-gray-300 transition-colors duration-300 flex items-center"
              >
                <Globe className="h-6 w-6" />
                <span className="ml-2">{language.toUpperCase()}</span>
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        language === 'en' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('ru');
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${
                        language === 'ru' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } hover:bg-gray-100`}
                    >
                      Русский
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Link to="/account" className="text-white hover:text-gray-300 transition-colors duration-300">
              <User className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-white hover:text-gray-300 transition-colors duration-300 relative">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-black/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/30 backdrop-blur-md">
          <Link
            to="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'Товары' : 'Products'}
          </Link>
          <Link
            to="/create-mask"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'Создать Маску' : 'Make Oni Mask'}
          </Link>
          <Link
            to="/create-ring"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'Создать Кольцо' : 'Make Ring'}
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'О Нас' : 'About Us'}
          </Link>
          <Link
            to="/delivery"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'Доставка' : 'Delivery'}
          </Link>
          <Link
            to="/account"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat"
            onClick={() => setIsMenuOpen(false)}
          >
            {language === 'ru' ? 'Аккаунт' : 'Account'}
          </Link>
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-black/20 font-montserrat relative"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <span>{language === 'ru' ? 'Корзина' : 'Cart'}</span>
              {getTotalItems() > 0 && (
                <span className="ml-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
          </Link>
          {/* Language Selector for Mobile */}
          <div className="px-3 py-2">
            <div className="flex space-x-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded ${
                  language === 'en'
                    ? 'bg-amber-600 text-white'
                    : 'text-white hover:bg-black/20'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1 rounded ${
                  language === 'ru'
                    ? 'bg-amber-600 text-white'
                    : 'text-white hover:bg-black/20'
                }`}
              >
                RU
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
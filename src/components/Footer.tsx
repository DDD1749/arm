import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Instagram, Facebook, X } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const Footer: React.FC = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <>
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Armornasvap</h2>
              <p className="text-gray-300 mb-4">
                {t.footer.description}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {t.nav.makeOniMask}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {t.nav.aboutUs}
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {t.nav.delivery}
                  </Link>
                </li>
                <li>
                  <Link to="/account" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {t.nav.account}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {t.nav.cart}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{t.footer.contactUs}</h3>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-500" />
                <span className="text-gray-300">info@armornasvap.com</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row md:justify-between">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Armornasvap. {t.footer.rights}
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => setShowPrivacyPolicy(true)} 
                className="text-gray-400 hover:text-white text-sm"
              >
                {t.footer.privacyPolicy}
              </button>
              <button 
                onClick={() => setShowTermsOfService(true)} 
                className="text-gray-400 hover:text-white text-sm"
              >
                {t.footer.termsOfService}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{t.footer.privacyPolicy}</h2>
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <PrivacyPolicy />
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsOfService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">{t.footer.termsOfService}</h2>
              <button 
                onClick={() => setShowTermsOfService(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              <TermsOfService />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
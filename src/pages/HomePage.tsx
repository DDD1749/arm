import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const HomePage: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: "url('/FCC_SPECULAR.jpg')",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl">
            {t.home.hero.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 max-w-2xl mb-8">
            {t.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#categories" className="px-8 py-3 bg-amber-600 text-white text-lg font-medium rounded-md hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center">
              {t.home.hero.exploreCollection}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <a 
            href="#categories" 
            className="animate-bounce bg-white bg-opacity-20 p-2 w-10 h-10 ring-1 ring-white ring-opacity-20 rounded-full flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6 text-white transform rotate-90" />
          </a>
        </div>
      </div>

      {/* Product Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">{t.home.products.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Masks Category */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-96">
                <img 
                  src="\maskaaa.png" 
                  alt={t.home.products.masks.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{t.home.products.masks.title}</h3>
                  <p className="text-gray-200 mb-4">{t.home.products.masks.description}</p>
                  <Link
                    to="/create-mask"
                    className="inline-block px-6 py-2 bg-white text-slate-900 font-medium rounded hover:bg-gray-100 transition-colors duration-300"
                  >
                    {t.home.products.masks.button}
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Rings Category */}
            <div className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-96">
                <img 
                  src="\ringgg.png" 
                  alt={t.home.products.rings.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{t.home.products.rings.title}</h3>
                  <p className="text-gray-200 mb-4">{t.home.products.rings.description}</p>
                  <Link
                    to="/create-ring"
                    className="inline-block px-6 py-2 bg-white text-slate-900 font-medium rounded hover:bg-gray-100 transition-colors duration-300"
                  >
                    {t.home.products.rings.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">{t.home.features.title}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.home.features.quality.title}</h3>
              <p className="text-gray-600">{t.home.features.quality.description}</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.home.features.delivery.title}</h3>
              <p className="text-gray-600">{t.home.features.delivery.description}</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.home.features.satisfaction.title}</h3>
              <p className="text-gray-600">{t.home.features.satisfaction.description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
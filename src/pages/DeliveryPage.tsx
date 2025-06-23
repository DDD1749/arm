import React from 'react';
import { Truck, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const DeliveryPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center">{t.delivery.hero.title}</h1>
          <p className="mt-4 text-xl text-gray-300 text-center">
            {t.delivery.hero.subtitle}
          </p>
        </div>
      </div>

      {/* Shipping Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-amber-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{t.delivery.shipping.title}</h3>
            </div>
            <ul className="space-y-3 mb-6">
              {t.delivery.shipping.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <p className="text-gray-600">{point}</p>
                </li>
              ))}
            </ul>
            <p className="text-2xl font-bold text-green-600">FREE</p>
          </div>
        </div>
      </section>

      {/* Security & Insurance */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <ShieldCheck className="h-6 w-6 text-amber-600 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900">{t.delivery.security.title}</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              {t.delivery.security.points.map((point, index) => (
                <li key={index}>• {point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-12">
            <HelpCircle className="h-8 w-8 text-amber-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">{t.delivery.faq.title}</h2>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {t.delivery.faq.questions.map((question, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{question.q}</h3>
                <p className="text-gray-600">{question.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.delivery.contact.title}</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.delivery.contact.email}
          </p>
        </div>
      </section>
    </div>
  );
};

export default DeliveryPage;
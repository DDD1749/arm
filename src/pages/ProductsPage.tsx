import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

interface Product {
  id: string;
  data: {
    id: string;
    name: string;
    price: number;
    image: string;
    model: string;
    basePart: string;
    customization: {
      sections: Array<{
        label: string;
        type: string;
        options: Array<{
          name: string;
          partName?: string;
          material?: {
            color: string;
            metalness: number;
            roughness: number;
            opacity: number;
            transparent: boolean;
            clearcoat: number;
            clearcoatRoughness: number;
            envMapIntensity: number;
          };
          visible?: string[];
        }>;
      }>;
    };
  };
}

const ProductsPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.products.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-96">
                <img
                  src={`/images/${product.data.image}`}
                  alt={product.data.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{product.data.name}</h3>
                  <p className="text-gray-200 mb-4">₽{product.data.price}</p>
                  <Link
                    to={`/customize/${product.id}`}
                    className="inline-block px-6 py-2 bg-white text-slate-900 font-medium rounded hover:bg-gray-100 transition-colors duration-300"
                  >
                    {t.products.customize}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
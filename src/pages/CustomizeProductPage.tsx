import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import LoadingSpinner from '../components/LoadingSpinner';
import * as THREE from 'three';

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

interface ModelProps {
  modelPath: string;
  visibleParts: string[];
  basePart: string;
  customMaterials: Record<string, THREE.Material>;
}

function Model({ modelPath, visibleParts, basePart, customMaterials }: ModelProps) {
  const { scene } = useGLTF(`/models/${modelPath}`);

  useEffect(() => {
    scene.rotation.x = Math.PI / 2;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Set visibility
        mesh.visible = mesh.name === basePart || visibleParts.includes(mesh.name);

        // Apply materials
        if (customMaterials[mesh.name]) {
          mesh.material = customMaterials[mesh.name].clone();
        }

        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene, visibleParts, basePart, customMaterials]);

  return <primitive object={scene} scale={0.017} />;
}

const CustomizeProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleParts, setVisibleParts] = useState<string[]>([]);
  const [customMaterials, setCustomMaterials] = useState<Record<string, THREE.Material>>({});
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { name: string; type: string; value?: string }>>({});

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then((data: Product[]) => {
        const foundProduct = data.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);

          // Set default visible parts
          const defaultVisible = foundProduct.data.customization.sections
            .filter(section => section.type === 'visibility')
            .flatMap(section => section.options[0]?.visible || []);
          setVisibleParts(defaultVisible);

          // Set default materials and options
          const defaultMaterials: Record<string, THREE.Material> = {};
          const defaults: Record<string, { name: string; type: string; value?: string }> = {};

          foundProduct.data.customization.sections.forEach(section => {
            if (section.options.length > 0) {
              const defaultOption = section.options[0];
              defaults[section.label] = { 
                name: defaultOption.name,
                type: section.type,
                value: section.type === 'color' ? defaultOption.material?.color : undefined
              };

              if (section.type === 'color' && defaultOption.material && defaultOption.partName) {
                defaultMaterials[defaultOption.partName] = new THREE.MeshPhysicalMaterial({
                  ...defaultOption.material,
                  color: new THREE.Color(defaultOption.material.color)
                });
              }
            }
          });

          setCustomMaterials(defaultMaterials);
          setSelectedOptions(defaults);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading product:', error);
        setIsLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const customizedProduct = {
        ...product.data,
        id: `${product.data.id}-${Object.values(selectedOptions).map(opt => opt.name).join('-')}`,
        name: product.data.name, // Только название!
        customization: selectedOptions, // Только опции, без склеек!
        price: product.data.price
      };
      addToCart(customizedProduct);
    }
  };

  if (isLoading || !product) {
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

  const CustomizationButton = ({ 
    selected, 
    onClick, 
    children 
  }: { 
    selected: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
        selected
          ? 'bg-amber-600 text-white'
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 3D Model Viewer */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Canvas 
              camera={{ position: [0, 0, 6], fov: 50 }}
              shadows
            >
              <color attach="background" args={['#f3f4f6']} />
              <ambientLight intensity={0.5} />
              <directionalLight 
                position={[5, 5, 5]} 
                intensity={2}
                castShadow
                shadow-mapSize={[1024, 1024]}
              />
              <Environment preset="city" />
              <Suspense fallback={null}>
                <Model
                  modelPath={product.data.model}
                  visibleParts={visibleParts}
                  basePart={product.data.basePart}
                  customMaterials={customMaterials}
                />
              </Suspense>
              <OrbitControls 
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 1.5}
                enableZoom={true}
                enablePan={false}
              />
            </Canvas>
            {isLoading && <LoadingSpinner />}
          </div>

          {/* Product Details and Customization */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.data.name}</h1>
            <p className="text-2xl text-amber-600 mb-6">₽{product.data.price}</p>

            {product.data.customization.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">{section.label}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {section.options.map((option, optionIndex) => (
                    <CustomizationButton
                      key={optionIndex}
                      selected={selectedOptions[section.label]?.name === option.name}
                      onClick={() => {
                        // Update selected options
                        setSelectedOptions(prev => ({
                          ...prev,
                          [section.label]: { 
                            name: option.name,
                            type: section.type,
                            value: section.type === 'color' ? option.material?.color : undefined
                          }
                        }));

                        // Handle visibility changes
                        if (section.type === 'visibility' && option.visible) {
                          const otherSections = product.data.customization.sections
                            .filter(s => s.type === 'visibility' && s.label !== section.label);

                          const preservedParts = otherSections.flatMap(s => {
                            const selectedOption = s.options.find(o => 
                              selectedOptions[s.label]?.name === o.name
                            ) || s.options[0];
                            return selectedOption.visible || [];
                          });

                          setVisibleParts([...preservedParts, ...option.visible]);
                        }
                        
                        // Handle color changes
                        if (section.type === 'color' && option.material && option.partName) {
                          const newMaterial = new THREE.MeshPhysicalMaterial({
                            ...option.material,
                            color: new THREE.Color(option.material.color)
                          });
                          
                          setCustomMaterials(prev => ({
                            ...prev,
                            [option.partName!]: newMaterial
                          }));
                        }
                      }}
                    >
                      {option.name}
                    </CustomizationButton>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-300"
            >
              {t.createMask.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeProductPage;

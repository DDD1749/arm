import React, { useState, useEffect, Suspense } from 'react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { TextureLoader, MeshStandardMaterial } from 'three';
import { RingModel, INITIAL_VISIBLE, groups, icosphereExtras } from '../components/RingModel';
import LoadingSpinner from '../components/LoadingSpinner';

const RING_SIZES = Array.from({ length: 13 }, (_, i) => i + 5); 


const RING_PRODUCT = {
  id: 'custom-ring-1',
  name: 'Кастомное кольцо Дракон', 
  price: 7000,
  image: '/ring-preview.png',
  category: 'ring' as const,
  description: 'Кольцо с драконом, ручная работа из премиальных материалов.',
};

const PART_NAMES = {
  'First type': 'Первый тип',
  'Second type': 'Второй тип',
  'Third type': 'Третий тип',
};
const STONE_NAMES = {
  Onyx: 'Оникс',
  Travertine: 'Травертин',
  Terrazzo: 'Терраццо',
};

const CreateRingPage: React.FC = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);

  const [customization, setCustomization] = useState({
    firstPart: 'First type',
    secondPart: 'First type',
    thirdPart: 'First type',
    stone: 'Onyx',
    size: 7
  });
  const { addToCart } = useCart();

  // 3D Model State
  const [visibleParts, setVisibleParts] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    INITIAL_VISIBLE.forEach((name) => (state[name] = true));
    return state;
  });

  const [metalMaterial, setMetalMaterial] = useState<MeshStandardMaterial | null>(null);
  const [icosphereMaterial, setIcosphereMaterial] = useState<MeshStandardMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = new TextureLoader();

    const loadInitialMaterials = async () => {
      try {
        const [map, rough, metal, normal] = await Promise.all([
          loader.loadAsync('/Metal049C_1K-JPG_Color.webp'),
          loader.loadAsync('/Metal049C_1K-JPG_Roughness.webp'),
          loader.loadAsync('/Metal049C_1K-JPG_Metalness.webp'),
          loader.loadAsync('/Metal049C_1K-JPG_NormalGL.webp'),
        ]);

        map.colorSpace = 'srgb';

        setMetalMaterial(
          new MeshStandardMaterial({
            map,
            roughnessMap: rough,
            metalnessMap: metal,
            normalMap: normal,
            metalness: 1,
            roughness: 0.5,
            envMapIntensity: 1.2,
          })
        );

        await handleMaterialChange('Onyx');
        setIsLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки материала:', err);
        setIsLoading(false);
      }
    };

    loadInitialMaterials();
    // eslint-disable-next-line
  }, []);

  const updateGroupVisibility = (groupKey: keyof typeof groups, activeName: string) => {
    const updated = { ...visibleParts };

    groups[groupKey].forEach((name) => {
      updated[name] = false;
    });

    updated[activeName] = true;

    if (activeName === 'Cylinder006') {
      icosphereExtras.forEach((name) => {
        updated[name] = true;
      });
    } else if (groupKey === 'firstPart') {
      icosphereExtras.forEach((name) => {
        updated[name] = false;
      });
    }

    setVisibleParts(updated);

    const partType = groupKey;
    const partIndex = groups[groupKey].indexOf(activeName);
    const partValue = partIndex === 0 ? 'First type' :
                     partIndex === 1 ? 'Second type' : 'Third type';
    
    setCustomization(prev => ({
      ...prev,
      [partType]: partValue
    }));
  };

  const handleMaterialChange = async (type: 'Travertine' | 'Terrazzo' | 'Onyx') => {
    setIsLoading(true);
    const loader = new TextureLoader();
    let prefix = '';

    switch (type) {
      case 'Travertine':
        prefix = 'Travertine010';
        break;
      case 'Terrazzo':
        prefix = 'Terrazzo006';
        break;
      case 'Onyx':
        prefix = 'Onyx011';
        break;
    }

    try {
      const [map, rough, normal] = await Promise.all([
        loader.loadAsync(`/${prefix}_1K-JPG_Color.webp`),
        loader.loadAsync(`/${prefix}_1K-JPG_Roughness.webp`),
        loader.loadAsync(`/${prefix}_1K-JPG_NormalGL.webp`),
      ]);

      map.colorSpace = 'srgb';

      const newMat = new MeshStandardMaterial({
        map,
        roughnessMap: rough,
        normalMap: normal,
        metalness: 0,
        roughness: 1,
      });

      setIcosphereMaterial(newMat);
      setCustomization(prev => ({ ...prev, stone: type }));
    } catch (err) {
      console.error(`Ошибка загрузки материала ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  // Кнопка: в корзину только название и значения опций!
  const handleAddToCart = () => {
    const customizedProduct = {
      ...RING_PRODUCT,
      id: `${RING_PRODUCT.id}-${customization.firstPart}-${customization.secondPart}-${customization.thirdPart}-${customization.stone}-${customization.size}`,
      name: RING_PRODUCT.name,
      customization: { ...customization },
    };
    addToCart(customizedProduct);
  };

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
            <Canvas camera={{ position: [0, 1.5, 20], fov: 50 }}>
              <color attach="background" args={['#f3f4f6']} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={2} castShadow />
              <Environment preset="city" />
              <Suspense fallback={null}>
                {metalMaterial && icosphereMaterial && (
                  <RingModel
                    visibleParts={visibleParts}
                    materials={{ metal: metalMaterial, icosphere: icosphereMaterial }}
                  />
                )}
              </Suspense>
              <OrbitControls />
            </Canvas>
            {isLoading && <LoadingSpinner />}
          </div>

          {/* Product Details and Customization */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Создать своё кольцо</h1>
            <p className="text-2xl text-amber-600 mb-6">{RING_PRODUCT.price} ₽</p>

            {/* First Part Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Первая часть</h3>
              <div className="grid grid-cols-3 gap-2">
                {groups.firstPart.map((name, index) => (
                  <CustomizationButton
                    key={name}
                    selected={visibleParts[name]}
                    onClick={() => updateGroupVisibility('firstPart', name)}
                  >
                    {['Первый тип', 'Второй тип', 'Третий тип'][index]}
                  </CustomizationButton>
                ))}
              </div>
            </div>

            {/* Second Part Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Вторая часть</h3>
              <div className="grid grid-cols-3 gap-2">
                {groups.secondPart.map((name, index) => (
                  <CustomizationButton
                    key={name}
                    selected={visibleParts[name]}
                    onClick={() => updateGroupVisibility('secondPart', name)}
                  >
                    {['Первый тип', 'Второй тип', 'Третий тип'][index]}
                  </CustomizationButton>
                ))}
              </div>
            </div>

            {/* Third Part Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Третья часть</h3>
              <div className="grid grid-cols-3 gap-2">
                {groups.thirdPart.map((name, index) => (
                  <CustomizationButton
                    key={name}
                    selected={visibleParts[name]}
                    onClick={() => updateGroupVisibility('thirdPart', name)}
                  >
                    {['Первый тип', 'Второй тип', 'Третий тип'][index]}
                  </CustomizationButton>
                ))}
              </div>
            </div>

            {/* Stone Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Камень</h3>
              <div className="grid grid-cols-3 gap-2">
                <CustomizationButton
                  selected={customization.stone === 'Onyx'}
                  onClick={() => handleMaterialChange('Onyx')}
                >
                  Оникс
                </CustomizationButton>
                <CustomizationButton
                  selected={customization.stone === 'Travertine'}
                  onClick={() => handleMaterialChange('Travertine')}
                >
                  Травертин
                </CustomizationButton>
                <CustomizationButton
                  selected={customization.stone === 'Terrazzo'}
                  onClick={() => handleMaterialChange('Terrazzo')}
                >
                  Терраццо
                </CustomizationButton>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Размер</h3>
              <div className="grid grid-cols-4 gap-2">
                {RING_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setCustomization(prev => ({ ...prev, size }))}
                    className={`py-2 px-4 rounded-md text-sm font-medium ${
                      customization.size === size
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-300"
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRingPage;

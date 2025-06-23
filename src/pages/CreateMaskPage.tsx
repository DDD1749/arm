import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';
import LoadingSpinner from '../components/LoadingSpinner';
import ButtonGlass from './ButtonGlass';
import './ButtonGlass.css';

const MASK_PRODUCT = {
  id: 'custom-oni-mask-1',
  name: 'Кастомная маска Они',
  price: 17000,
  image: '/mask-preview.png',
  category: 'mask' as const,
  description: 'Ручная работа. Маска Они с возможностью кастомизации.',
};

const epoxyColors = {
  red: new THREE.Color('#4B000F'),
  purple: new THREE.Color(0.5, 0.2, 0.7),
  yellow: new THREE.Color(1.0, 0.9, 0.2),
};

function Model({
  showLeft,
  showRight,
  epoxyColor,
  kogMaterial,
}: {
  showLeft: boolean;
  showRight: boolean;
  epoxyColor: THREE.Color;
  kogMaterial: THREE.MeshStandardMaterial | null;
}) {
  const { scene } = useGLTF('/maskr.glb');

  useEffect(() => {
    scene.rotation.x = Math.PI / 2;
    scene.traverse((child) => {
      // @ts-ignore
      if (child.isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === 'mask' || mesh.name === 'ko') {
          mesh.visible = true;
        } else if (['lp', 'lc', 'rp', 'rc'].includes(mesh.name)) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: epoxyColor,
            transparent: true,
            opacity: 0.98,
            roughness: 10,
            metalness: 0.2,
            clearcoat: 1,
            clearcoatRoughness: 10.1,
            envMapIntensity: 1.5,
          });
          mesh.visible =
            (mesh.name === 'lp' && showLeft) ||
            (mesh.name === 'lc' && !showLeft) ||
            (mesh.name === 'rp' && showRight) ||
            (mesh.name === 'rc' && !showRight);
        } else if (mesh.name === 'kog') {
          if (kogMaterial) mesh.material = kogMaterial;
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      }
    });
  }, [scene, showLeft, showRight, epoxyColor, kogMaterial]);

  return <primitive object={scene} scale={0.017} />;
}

function AutoUpdate({ deps }: { deps: any[] }) {
  const { invalidate } = useThree();
  useEffect(() => {
    invalidate();
  }, deps);
  return null;
}

function Controls() {
  const { invalidate } = useThree();
  return (
    <OrbitControls
      onChange={() => invalidate()}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 1.5}
      enableZoom
      enablePan={false}
    />
  );
}

const CreateMaskPage: React.FC = () => {
  const { addToCart } = useCart();
  const { language } = useLanguage();
  useTranslation(language);

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);
  const [epoxyColor, setEpoxyColor] = useState<THREE.Color>(epoxyColors.red);
  const [kogMaterial, setKogMaterial] = useState<THREE.MeshStandardMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customization, setCustomization] = useState({
    rightHorn: 'цёлый',
    leftHorn: 'цёлый',
    color: 'красный',
  });

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    Promise.all([
      loader.loadAsync('/Leather038_1K-JPG_Color.jpg'),
      loader.loadAsync('/Leather038_1K-JPG_Roughness.jpg'),
      loader.loadAsync('/Leather038_1K-JPG_NormalDX.jpg'),
      loader.loadAsync('/Leather038_1K-JPG_Displacement.jpg'),
    ])
      .then(([color, roughness, normal, displacement]) => {
        // @ts-ignore
        color.encoding = THREE.sRGBEncoding;
        [color, roughness, normal, displacement].forEach((tex) => {
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(1, 1);
        });
        const mat = new THREE.MeshStandardMaterial({
          map: color,
          roughnessMap: roughness,
          normalMap: normal,
          displacementMap: displacement,
          displacementScale: 0.06,
        });
        setKogMaterial(mat);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Ошибка загрузки kog текстур:', err);
        setIsLoading(false);
      });
  }, []);

  const handleAddToCart = () => {
    addToCart({
      ...MASK_PRODUCT,
      id: `${MASK_PRODUCT.id}-${customization.rightHorn}-${customization.leftHorn}-${customization.color}`,
      customization,
    } as any);
  };

  const updateDeps = useMemo(
    () => [showLeft, showRight, epoxyColor, kogMaterial],
    [showLeft, showRight, epoxyColor, kogMaterial]
  );

  // Стили вынесены в отдельные объекты для читабельности (можно вынести в CSS)
  const rootStyle: React.CSSProperties = {
    paddingTop: 96,
    paddingBottom: 64,
  };
  const contentStyle: React.CSSProperties = {
    maxWidth: 1280,
    margin: '0 auto',
    padding: 16,
  };
  const gridStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 32,
  };
  const leftColStyle: React.CSSProperties = {
    flex: 1,
    position: 'relative',
    minWidth: 0,
    aspectRatio: '1/1',
    overflow: 'hidden',
    borderRadius: 16,
    background: '#f3f4f6'
  };
  const rightColStyle: React.CSSProperties = {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    zIndex: 1,
    isolation: 'isolate',
  };
  const customizationPanelStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 24,
    padding: 24,
    background: 'rgba(255,255,255,0)',
    overflow: 'visible',
  };
  const h1Style: React.CSSProperties = {
    fontSize: 28,
    fontWeight: 700,
    color: '#111'
  };
  const priceStyle: React.CSSProperties = {
    fontSize: 22,
    color: '#D97706'
  };
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 8
  };
  const buttonRowStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  };

  return (
    <div style={rootStyle}>
      <div style={contentStyle}>
        <div style={gridStyle}>
          {/* 3D Viewer */}
          <div style={leftColStyle}>
            <Canvas
              frameloop="demand"
              camera={{ position: [0, 0, 6], fov: 50 }}
              gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                outputColorSpace: THREE.SRGBColorSpace,
              }}
            >
              <color attach="background" args={['#f3f4f6']} />
              <ambientLight color="#ffffff" intensity={4.2} />
              <hemisphereLight args={['#ffffff', '#444444', 0.6]} />
              <directionalLight position={[5, 12, 5]} intensity={5.0} />
              <directionalLight position={[-3, 5, -2]} intensity={4.5} color="#ffffff" />
              <pointLight position={[0, 5, 5]} intensity={2.0} />
              <pointLight position={[0, -5, 5]} intensity={1.5} />
              <Suspense fallback={null}>
                {kogMaterial && (
                  <Model
                    showLeft={showLeft}
                    showRight={showRight}
                    epoxyColor={epoxyColor}
                    kogMaterial={kogMaterial}
                  />
                )}
              </Suspense>
              <Controls />
              <AutoUpdate deps={updateDeps} />
            </Canvas>
            {isLoading && <LoadingSpinner />}
          </div>

          {/* Customization Panel */}
          <div style={rightColStyle}>
            <img
              src="/bkog.png"
              alt="pattern"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                pointerEvents: 'none'
              }}
            />
            <div style={customizationPanelStyle}>
              <h1 style={h1Style}>Создать свою маску</h1>
              <p style={priceStyle}>{MASK_PRODUCT.price} ₽</p>

              {/* Правый рог */}
              <div>
                <h3 style={sectionTitleStyle}>Правый рог</h3>
                <div style={buttonRowStyle}>
                  <ButtonGlass
                    selected={showRight}
                    onClick={() => {
                      setShowRight(true);
                      setCustomization((prev) => ({ ...prev, rightHorn: 'цёлый' }));
                    }}
                    size="medium"
                  >
                    Цёлый
                  </ButtonGlass>
                  <ButtonGlass
                    selected={!showRight}
                    onClick={() => {
                      setShowRight(false);
                      setCustomization((prev) => ({ ...prev, rightHorn: 'сломан' }));
                    }}
                    size="medium"
                  >
                    Сломан
                  </ButtonGlass>
                </div>
              </div>

              {/* Левый рог */}
              <div>
                <h3 style={sectionTitleStyle}>Левый рог</h3>
                <div style={buttonRowStyle}>
                  <ButtonGlass
                    selected={showLeft}
                    onClick={() => {
                      setShowLeft(true);
                      setCustomization((prev) => ({ ...prev, leftHorn: 'цёлый' }));
                    }}
                    size="medium"
                  >
                    Цёлый
                  </ButtonGlass>
                  <ButtonGlass
                    selected={!showLeft}
                    onClick={() => {
                      setShowLeft(false);
                      setCustomization((prev) => ({ ...prev, leftHorn: 'сломан' }));
                    }}
                    size="medium"
                  >
                    Сломан
                  </ButtonGlass>
                </div>
              </div>

              {/* Цвет эпоксидки */}
              <div>
                <h3 style={sectionTitleStyle}>Цвет эпоксидки</h3>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                  <ButtonGlass
                    selected={customization.color === 'красный'}
                    onClick={() => {
                      setEpoxyColor(epoxyColors.red);
                      setCustomization((p) => ({ ...p, color: 'красный' }));
                    }}
                    size="medium"
                  >
                    Красный
                  </ButtonGlass>
                  <ButtonGlass
                    selected={customization.color === 'фиолетовый'}
                    onClick={() => {
                      setEpoxyColor(epoxyColors.purple);
                      setCustomization((p) => ({ ...p, color: 'фиолетовый' }));
                    }}
                    size="medium"
                  >
                    Фиолетовый
                  </ButtonGlass>
                  <ButtonGlass
                    selected={customization.color === 'жёлтый'}
                    onClick={() => {
                      setEpoxyColor(epoxyColors.yellow);
                      setCustomization((p) => ({ ...p, color: 'жёлтый' }));
                    }}
                    size="medium"
                  >
                    Жёлтый
                  </ButtonGlass>
                </div>
              </div>

              {/* Добавить в корзину */}
              <ButtonGlass
                selected={false}
                onClick={handleAddToCart}
                size="medium"
              >
                Добавить в корзину
              </ButtonGlass>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMaskPage;

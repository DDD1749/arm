import React, { useEffect, useState } from 'react';

interface VisibilityOption {
  partName: string;
  buttonLabel: string;
}

interface ColorOption {
  buttonLabel: string;
  material: {
    color?: string;
    metalness?: number;
    roughness?: number;
    opacity?: number;
    transparent?: boolean;
    clearcoat?: number;
    clearcoatRoughness?: number;
    envMapIntensity?: number;
    [key: string]: any;
  };
}

interface DummyOption {
  buttonLabel: string;
}

type CustomizationType = 'visibility' | 'color' | 'dummy';

interface CustomizationSection {
  sectionName: string;
  type: CustomizationType;
  partName?: string;
  options: (VisibilityOption | ColorOption | DummyOption)[];
}

const API_BASE_URL = `http://localhost:3001/api`;

const AdminUpload: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [basePart, setBasePart] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [customizations, setCustomizations] = useState<CustomizationSection[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const res = await fetch(`${API_BASE_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить товар?')) return;
    const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Товар удалён');
      fetchProducts();
    } else {
      alert('Ошибка при удалении');
    }
  };

  const handleFileUpload = async (image: File, model: File) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('model', model);

    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('Ошибка загрузки файлов');
    }

    return await res.json();
  };

  const handleAddCustomization = (type: CustomizationType) => {
    setCustomizations((prev) => [
      ...prev,
      {
        sectionName: '',
        type,
        partName: type === 'color' ? '' : undefined,
        options: [],
      },
    ]);
  };

  const handleAddOption = (sectionIndex: number) => {
    const updated = [...customizations];
    const section = updated[sectionIndex];

    if (section.type === 'visibility') {
      (section.options as VisibilityOption[]).push({ partName: '', buttonLabel: '' });
    } else if (section.type === 'color') {
      (section.options as ColorOption[]).push({
        buttonLabel: '',
        material: {
          color: '#ffffff',
          metalness: 0,
          roughness: 0,
          opacity: 1,
          transparent: false,
          clearcoat: 0,
          clearcoatRoughness: 0,
          envMapIntensity: 1,
        },
      });
    } else {
      (section.options as DummyOption[]).push({ buttonLabel: '' });
    }

    setCustomizations(updated);
  };

  const handleSubmit = async () => {
    if (!name || !price || !basePart || !imageFile || !modelFile) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      const { image, model } = await handleFileUpload(imageFile, modelFile);

      const productData = {
        name,
        price: parseFloat(price),
        basePart,
        image,
        model,
        customization: {
          sections: customizations.map((section) => ({
            label: section.sectionName,
            type: section.type,
            options: section.options.map((opt) => {
              if (section.type === 'visibility') {
                const o = opt as VisibilityOption;
                return { name: o.buttonLabel, visible: [o.partName] };
              } else if (section.type === 'color') {
                const o = opt as ColorOption;
                return {
                  name: o.buttonLabel,
                  partName: section.partName,
                  material: o.material,
                };
              } else {
                const o = opt as DummyOption;
                return { name: o.buttonLabel };
              }
            }),
          })),
        },
      };

      const res = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error('Ошибка сохранения товара');
      alert('Товар успешно сохранён!');
      fetchProducts();
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при загрузке или сохранении');
    }
  };

  return (
    <div className="p-8 space-y-6 pt-24"> {/* Добавлен pt-24 */}
      <h1 className="text-2xl font-bold">Добавить товар</h1>

      <div className="grid grid-cols-1 gap-4">
        <input type="text" placeholder="Название" className="border p-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Цена" className="border p-2" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input type="text" placeholder="Имя базовой детали (basePart)" className="border p-2" value={basePart} onChange={(e) => setBasePart(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <input type="file" accept=".glb" onChange={(e) => setModelFile(e.target.files?.[0] || null)} />
      </div>

      <div>
        <h2 className="font-semibold mb-2">Кастомизация</h2>
        {customizations.map((section, idx) => (
          <div key={idx} className="border p-3 mb-3 rounded-md">
            <input
              type="text"
              placeholder="Название раздела"
              className="border px-2 py-1 mb-2 w-full"
              value={section.sectionName}
              onChange={(e) => {
                const updated = [...customizations];
                updated[idx].sectionName = e.target.value;
                setCustomizations(updated);
              }}
            />

            {section.type === 'color' && (
              <input
                type="text"
                placeholder="Имя детали (partName)"
                className="border px-2 py-1 mb-2 w-full"
                value={section.partName || ''}
                onChange={(e) => {
                  const updated = [...customizations];
                  updated[idx].partName = e.target.value;
                  setCustomizations(updated);
                }}
              />
            )}

            {section.options.map((opt, optIdx) => (
              <div key={optIdx} className="mb-2 space-y-1">
                <input
                  type="text"
                  placeholder="Подпись кнопки"
                  className="border px-2 py-1 w-full"
                  value={(opt as any).buttonLabel}
                  onChange={(e) => {
                    const updated = [...customizations];
                    (updated[idx].options[optIdx] as any).buttonLabel = e.target.value;
                    setCustomizations(updated);
                  }}
                />

                {section.type === 'visibility' && (
                  <input
                    type="text"
                    placeholder="Имя детали"
                    className="border px-2 py-1 w-full"
                    value={(opt as VisibilityOption).partName}
                    onChange={(e) => {
                      const updated = [...customizations];
                      (updated[idx].options[optIdx] as VisibilityOption).partName = e.target.value;
                      setCustomizations(updated);
                    }}
                  />
                )}

                {section.type === 'color' && (
                  <div className="space-y-2">
                    <label className="block">
                      Цвет:
                      <input
                        type="text"
                        placeholder="#ffffff"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.color || ''}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.color = e.target.value;
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Металличность (metalness):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.metalness ?? 0}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.metalness = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Шероховатость (roughness):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.roughness ?? 0}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.roughness = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Прозрачность (opacity):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.opacity ?? 1}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.opacity = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Прозрачный (transparent):
                      <input
                        type="checkbox"
                        checked={(opt as ColorOption).material.transparent || false}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.transparent = e.target.checked;
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Лак (clearcoat):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.clearcoat ?? 0}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.clearcoat = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Шероховатость лака (clearcoatRoughness):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.clearcoatRoughness ?? 0}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.clearcoatRoughness = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                    <label className="block">
                      Яркость окружения (envMapIntensity):
                      <input
                        type="number"
                        step="any"
                        className="border px-2 py-1 w-full"
                        value={(opt as ColorOption).material.envMapIntensity ?? 1}
                        onChange={(e) => {
                          const updated = [...customizations];
                          (updated[idx].options[optIdx] as ColorOption).material.envMapIntensity = parseFloat(e.target.value);
                          setCustomizations(updated);
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
            <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={() => handleAddOption(idx)}>+ Опция</button>
          </div>
        ))}
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => handleAddCustomization('visibility')}>+ Видимость</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => handleAddCustomization('color')}>+ Цвет</button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded" onClick={() => handleAddCustomization('dummy')}>+ Раздел без действия</button>
        </div>
      </div>

      <button className="bg-amber-600 text-white px-6 py-2 rounded" onClick={handleSubmit}>Сохранить товар</button>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Существующие товары</h2>
        <ul className="space-y-2">
          {products.map((p) => (
            <li key={p.id} className="flex justify-between items-center border p-2 rounded">
              <span>{p.name}</span>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => handleDelete(p.id || p.data?.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminUpload;

import express, { Request, Response } from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Получаем __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Пути для загрузок
const uploadPath = path.join(__dirname, '../public');
const imagePath = path.join(uploadPath, 'images');
const modelPath = path.join(uploadPath, 'models');
const dbPath = path.join(uploadPath, 'products.json');

// Создание директорий если их нет
[uploadPath, imagePath, modelPath].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Статика для доступа к файлам
app.use('/uploads', express.static(uploadPath));
app.use('/images', express.static(imagePath));
app.use('/models', express.static(modelPath));

// Настройка Multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = file.mimetype.startsWith('image') ? imagePath : modelPath;
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

// Загрузка файлов
app.post(
  '/api/upload',
  upload.fields([{ name: 'image' }, { name: 'model' }]),
  (req: Request, res: Response): void => {
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const image = files?.image?.[0]?.filename || '';
    const model = files?.model?.[0]?.filename || '';

    res.json({ image, model });
  }
);

// 📦 Сохранение продукта
app.post('/api/save', (req: Request, res: Response): void => {
  const { name, price, description, image, model, basePart, customization } = req.body;

  const newProduct = {
    id: uuidv4(),
    data: {
      id: uuidv4(),
      name,
      price,
      description,
      image,
      model,
      basePart,
      customization,
    },
  };

  let products: any[] = [];
  if (fs.existsSync(dbPath)) {
    const data = fs.readFileSync(dbPath, 'utf-8');
    products = JSON.parse(data);
  }

  products.push(newProduct);
  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf-8');

  res.json({ status: 'ok', product: newProduct });
});

// 📦 Получение списка продуктов
app.get('/api/products', (_req: Request, res: Response): void => {
  if (!fs.existsSync(dbPath)) {
    res.json([]);
    return;
  }

  const data = fs.readFileSync(dbPath, 'utf-8');
  const rawProducts = JSON.parse(data);
  const products = rawProducts.map((p: any) => ({
    id: p.id,
    ...p.data,
  }));

  res.json(products);
});

// 📦 Удаление продукта
app.delete('/api/delete/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  if (!fs.existsSync(dbPath)) {
    res.status(404).json({ error: 'База данных не найдена' });
    return;
  }

  const data = fs.readFileSync(dbPath, 'utf-8');
  let products = JSON.parse(data);

  const initialLength = products.length;

  products = products.filter(
    (p: any) => p.id !== id && p.data?.id !== id
  );

  if (products.length === initialLength) {
    res.status(404).json({ error: 'Товар не найден' });
    return;
  }

  fs.writeFileSync(dbPath, JSON.stringify(products, null, 2), 'utf-8');
  res.json({ status: 'deleted', id });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
});

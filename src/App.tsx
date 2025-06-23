import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DeliveryPage from './pages/DeliveryPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import CreateRingPage from './pages/CreateRingPage';
import CreateMaskPage from './pages/CreateMaskPage';
import ProductsPage from './pages/ProductsPage';
import CustomizeProductPage from './pages/CustomizeProductPage';
import AuthPage from './pages/AuthPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AdminUpload from './pages/AdminUpload';
import ButtonTestPage from './pages/ButtonTestPage';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/delivery" element={<DeliveryPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/create-ring" element={<CreateRingPage />} />
                  <Route path="/create-mask" element={<CreateMaskPage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/customize/:id" element={<CustomizeProductPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/adminu" element={<AdminUpload />} />
                  {/* 🆕 Новый маршрут для проверки кнопок */}
                  <Route path="/button-test" element={<ButtonTestPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

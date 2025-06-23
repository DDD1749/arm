import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../translations';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          setLoginError('The email or password you entered is incorrect. Please try again.');
        } else if (error.message.includes('Email not confirmed')) {
          setLoginError('Please check your email to confirm your account before logging in.');
        } else {
          setLoginError('An error occurred during login. Please try again.');
        }
        return;
      }

      if (data.user) {
        navigate('/account');
      }
    } catch (err) {
      setLoginError('An unexpected error occurred. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    try {
      if (formData.password.length < 6) {
        setLoginError('Password must be at least 6 characters long');
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: {
            email: formData.email,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setLoginError('An account with this email already exists. Please try logging in instead.');
        } else {
          setLoginError(error.message);
        }
        return;
      }

      if (data.user && !data.session) {
        setLoginError('Registration successful! Please check your email to verify your account.');
        setFormData({ email: '', password: '' });
        setIsRegistering(false);
      } else if (data.session) {
        navigate('/account');
      }
    } catch (err) {
      setLoginError('An unexpected error occurred during registration. Please try again later.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setLoginError('Failed to send password reset email. Please try again.');
        return;
      }

      setSuccessMessage('Password reset instructions have been sent to your email.');
      setFormData(prev => ({ ...prev, email: '' }));
    } catch (err) {
      setLoginError('An unexpected error occurred. Please try again later.');
      console.error('Password reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setIsForgotPassword(false);
    setIsRegistering(false);
    setLoginError('');
    setSuccessMessage('');
    setFormData({ email: '', password: '' });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {isForgotPassword 
              ? t.auth.forgotPassword.title 
              : isRegistering 
                ? t.auth.signUp.title 
                : t.auth.signIn.title}
          </h2>
          
          {loginError && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
              {loginError}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              {successMessage}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={isForgotPassword ? handleForgotPassword : isRegistering ? handleSignUp : handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {t.auth.signIn.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
            
            {!isForgotPassword && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  {t.auth.signIn.password}
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  minLength={6}
                />
                {isRegistering && (
                  <p className="mt-1 text-sm text-gray-500">
                    {t.auth.signUp.passwordRequirement}
                  </p>
                )}
              </div>
            )}
            
            {!isRegistering && !isForgotPassword && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    {t.auth.signIn.rememberMe}
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm font-medium text-amber-600 hover:text-amber-500"
                >
                  {t.auth.signIn.forgotPassword}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
            >
              {isLoading 
                ? isForgotPassword 
                  ? t.auth.forgotPassword.loading
                  : isRegistering 
                    ? t.auth.signUp.loading
                    : t.auth.signIn.loading
                : isForgotPassword 
                  ? t.auth.forgotPassword.submit
                  : isRegistering 
                    ? t.auth.signUp.submit
                    : t.auth.signIn.submit}
            </button>
          </form>

          <div className="mt-6 space-y-2">
            {isForgotPassword ? (
              <button
                type="button"
                onClick={resetState}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                {t.auth.forgotPassword.backToSignIn}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
              >
                {isRegistering
                  ? t.auth.signUp.hasAccount
                  : t.auth.signIn.noAccount}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
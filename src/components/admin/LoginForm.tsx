import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import FormField from './FormField';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(formData.email, formData.password);
      navigate('/admin');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg">
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900">
        Admin Login
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Sign in to access your dashboard
      </p>
    </div>

    {/* Back to Home Link */}
    <div className="text-center">
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm"
      >
        ← Back to Home
      </Link>
    </div>

    {/* Error Message */}
    {error && (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
        {error}
      </div>
    )}

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
      >
        Sign In
      </button>
    </form>
  </div>
</div>

  );
}
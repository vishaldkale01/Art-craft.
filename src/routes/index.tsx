import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import AdminLayout from '../components/admin/AdminLayout';
import Home from '../pages/Home';
import Gallery from '../pages/Gallery';
import Blog from '../pages/Blog';
import About from '../pages/About';
import Contact from '../pages/Contact';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminGallery from '../pages/admin/Gallery';
import AdminBlog from '../pages/admin/Blog';
import LoginForm from '../components/admin/LoginForm';
import AdminMessages from '../pages/admin/Messages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'gallery', element: <Gallery /> },
      { path: 'blog', element: <Blog /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  {
    path: '/admin/login',
    element: <LoginForm />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'gallery', element: <AdminGallery /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'messages', element: <AdminMessages /> },
    ],
  },
]);
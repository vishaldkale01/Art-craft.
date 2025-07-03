import { Outlet, useLocation } from 'react-router-dom';
import AdminNavigation from './admin/AdminNavigation';
import Navigation from './navigation/Navigation';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="min-h-screen bg-neutral-50">
      {isAdmin ? <AdminNavigation /> : <Navigation />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
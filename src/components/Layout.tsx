import { Outlet } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
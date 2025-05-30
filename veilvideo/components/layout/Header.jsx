
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, LogOut, ShieldCheck } from 'lucide-react';
import useAuth from '@/hooks/useAuth';

const DEV_MODE_SKIP_AUTH = false; // Disable dev mode in production

const Header = () => {
  const { isAuthenticated, profile, logout, loading } = useAuth();
  const navigate = useNavigate();
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2eec53f9-43fa-4fe6-bcca-ce0c7d56c3e2/d585467ac076595e384bb6d548ca2889.jpg";

  const handleLogout = async () => {
    if (DEV_MODE_SKIP_AUTH) {
      alert("Logout is disabled in Development Mode.");
      return;
    }
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/50">
            <img src={logoUrl} alt="VielViewVideo Logo" className="w-full h-full object-cover" />
          </div>
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/interview">Interview Room</Link>
          </Button>
          {loading && !DEV_MODE_SKIP_AUTH ? (
            <Button variant="ghost" disabled>Loading...</Button>
          ) : isAuthenticated ? ( 
            <>
              {DEV_MODE_SKIP_AUTH && (
                <span className="text-xs text-yellow-500 flex items-center">
                  <ShieldCheck className="mr-1 h-4 w-4" /> Dev Mode
                </span>
              )}
              <span className="text-sm text-muted-foreground hidden md:inline">
                Welcome, {profile?.full_name || 'User'}!
              </span>
              <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary/10 hover:text-primary" disabled={DEV_MODE_SKIP_AUTH}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => navigate('/login')}>
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" onClick={() => navigate('/signup')}>
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

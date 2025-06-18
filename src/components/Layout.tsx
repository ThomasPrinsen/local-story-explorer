import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, PlusCircle, User, Book, DollarSign, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const shouldShowFooter = location.pathname !== '/kaart';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo */}
              <Link to="/" className="flex items-center mr-8">
                <span className="text-xl font-bold text-primary">Yaro</span>
              </Link>

              {/* Main Navigation */}
              <div className="hidden sm:flex sm:space-x-8">
                <Link
                  to="/kaart"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                    isActive('/kaart')
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-900 hover:border-primary"
                  )}
                >
                  <Map className="w-4 h-4 mr-2" />
                  Kaart
                </Link>
                <Link
                  to="/verhalen"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                    isActive('/verhalen')
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-900 hover:border-primary"
                  )}
                >
                  <Book className="w-4 h-4 mr-2" />
                  Verhalen
                </Link>
                <Link
                  to="/budget-tips"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                    isActive('/budget-tips')
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-900 hover:border-primary"
                  )}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Budget & Tips
                </Link>
                <Link
                  to="/dos-and-donts"
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2",
                    isActive('/dos-and-donts')
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-900 hover:border-primary"
                  )}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Do's & Don'ts
                </Link>
              </div>
            </div>

            {/* Right side buttons */}
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <Link to="/verhaal-delen">
                <Button variant="default">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Verhaal Delen
                </Button>
              </Link>
              <Button variant="ghost">
                <User className="w-4 h-4 mr-2" />
                Inloggen
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <Button variant="ghost" size="icon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/kaart"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                isActive('/kaart')
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              Kaart
            </Link>
            <Link
              to="/verhalen"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                isActive('/verhalen')
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              Verhalen
            </Link>
            <Link
              to="/budget-tips"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                isActive('/budget-tips')
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              Budget & Tips
            </Link>
            <Link
              to="/dos-and-donts"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                isActive('/dos-and-donts')
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              Do's & Don'ts
            </Link>
            <Link
              to="/verhaal-delen"
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                isActive('/verhaal-delen')
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              )}
            >
              Verhaal Delen
            </Link>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow bg-background">
        {children}
      </main>

      {/* Footer */}
      {shouldShowFooter && (
        <footer className="bg-gradient-to-t from-white via-orange-50 to-orange-100 border-t border-orange-100 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex-1 min-w-[160px]">
                <span className="block text-sm font-semibold text-primary mb-1">Yaro</span>
                <span className="text-xs text-gray-500">Helpt reizigers om steden te ontdekken door de ogen van locals.</span>
              </div>
              <nav className="flex-1 min-w-[160px] flex flex-col md:items-center">
                <ul className="flex flex-col md:flex-row gap-1 md:gap-4 text-xs text-gray-600">
                  <li><Link to="/kaart" className="hover:text-primary transition-colors">Kaart</Link></li>
                  <li><Link to="/verhalen" className="hover:text-primary transition-colors">Verhalen</Link></li>
                  <li><Link to="/budget-tips" className="hover:text-primary transition-colors">Budget & Tips</Link></li>
                  <li><Link to="/dos-and-donts" className="hover:text-primary transition-colors">Do's & Don'ts</Link></li>
                </ul>
              </nav>
              <div className="flex-1 min-w-[160px] flex flex-col items-start md:items-end gap-1">
                <span className="text-xs text-gray-500">
                  <span className="hidden md:inline">Contact: </span>
                  <a href="mailto:info@yaro.nl" className="text-primary hover:text-primary/90 underline underline-offset-2">info@yaro.nl</a>
                </span>
                <span className="text-[11px] text-gray-400">&copy; {new Date().getFullYear()} Yaro</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout; 
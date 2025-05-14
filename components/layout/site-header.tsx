'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/theme-toggle';
import { LanguageSwitcher } from '../ui/language-switcher';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { Menu, X, Droplet } from 'lucide-react';

export function SiteHeader() {
  const pathname = usePathname();
  const { t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: '/', label: 'navHome' },
    { href: '/personal-info', label: 'navPersonalInfo' },
    { href: '/resume', label: 'navResume' },
    { href: '/gallery', label: 'navGallery' },
    { href: '/memoirs', label: 'navMemoirs' },
    { href: '/contact', label: 'navContact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold md:text-xl">IWRM</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav className="hidden md:flex items-center space-x-6">
            <ul className={cn("flex space-x-6", dir === 'rtl' && "space-x-reverse")}>
              {routes.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === route.href ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {t(route.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className={cn("flex items-center space-x-4", dir === 'rtl' && "space-x-reverse flex-row-reverse")}>
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4">
            <nav className="flex flex-col space-y-3">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "px-2 py-1 text-sm font-medium transition-colors hover:text-primary",
                    pathname === route.href ? "text-foreground" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {t(route.label)}
                </Link>
              ))}
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
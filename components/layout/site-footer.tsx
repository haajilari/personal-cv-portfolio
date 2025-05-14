'use client';

import { Heart } from 'lucide-react';
import { useLanguage } from '@/lib/i18n/context';
import { cn } from '@/lib/utils';

export function SiteFooter() {
  const { dir } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8">
        <div className={cn("flex flex-col-reverse md:flex-row justify-between items-center", 
          dir === 'rtl' ? "md:flex-row-reverse text-right" : "text-left")}>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Iran Water Resources Management Company
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for water conservation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
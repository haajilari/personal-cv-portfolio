'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function WelcomePopup() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Check if this is the first visit in this session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      // Wait a short time before showing the popup for a better UX
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem('hasVisited', 'true');
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{t('welcomeTitle')}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{t('close')}</span>
          </Button>
        </DialogHeader>
        <DialogDescription className="text-base">{t('welcomeMessage')}</DialogDescription>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} className="w-full">
            {t('close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
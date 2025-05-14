'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  title: string;
  description: string;
  url: string;
}

export default function Gallery() {
  const { t, dir } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const galleryImages = t('galleryImages') as GalleryImage[];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className={cn("text-3xl md:text-4xl font-bold mb-4",
          dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
          {t('galleryTitle')}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('galleryDescription')}
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {galleryImages.map((image) => (
          <motion.div 
            key={image.id}
            variants={item}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="overflow-hidden cursor-pointer h-full" onClick={() => setSelectedImage(image)}>
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative group">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className={cn("text-white", dir === 'rtl' ? "text-right" : "text-left")}>
                      <h3 className="font-medium text-lg">{image.title}</h3>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Image Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className={cn("text-xl", dir === 'rtl' ? "text-right" : "text-left")}>
              {selectedImage?.title}
            </DialogTitle>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <DialogDescription className={cn("text-sm", dir === 'rtl' ? "text-right" : "text-left")}>
              {selectedImage?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={selectedImage?.url}
              alt={selectedImage?.title}
              className="w-full rounded-md"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
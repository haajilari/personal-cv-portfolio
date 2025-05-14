'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function PersonalInfo() {
  const { t, dir } = useLanguage();
  
  const expertiseList = t('expertiseList') as string[];
  
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={cn("text-3xl md:text-4xl font-bold mb-8 text-center",
          dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
          {t('personalInfoTitle')}
        </h1>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('aboutMe')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={cn("space-y-4 text-muted-foreground", 
                dir === 'rtl' ? "text-right" : "text-left")}>
                {t('aboutMeContent').split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('expertise')}</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.ul 
                className={cn("space-y-2", dir === 'rtl' ? "text-right" : "text-left")}
                variants={container}
                initial="hidden"
                animate="show"
              >
                {expertiseList.map((expertise, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    variants={item}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                    <span>{expertise}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3760603/pexels-photo-3760603.jpeg"
                  alt="Dr. Mohammad Ahmadi"
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Memoir {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function Memoirs() {
  const { t, dir, lang } = useLanguage();
  
  const memoirs = t('memoirs') as Memoir[];
  const directionIcon = dir === 'ltr' ? <ArrowRight className="ml-2 h-4 w-4" /> : <ArrowLeft className="mr-2 h-4 w-4" />;
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
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
        className="text-center mb-12"
      >
        <h1 className={cn("text-3xl md:text-4xl font-bold mb-4",
          dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
          {t('memoirsTitle')}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('memoirsDescription')}
        </p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {memoirs.map((memoir) => (
          <motion.div key={memoir.id} variants={item}>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className={cn("text-xl", dir === 'rtl' ? "text-right" : "text-left")}>
                  {memoir.title}
                </CardTitle>
                <div className={cn("flex items-center text-sm text-muted-foreground", 
                  dir === 'rtl' ? "justify-end" : "justify-start")}>
                  <Calendar className={cn("h-4 w-4", dir === 'rtl' ? "ml-2" : "mr-2")} />
                  <span>{t('publishedOn')} {memoir.date}</span>
                </div>
              </CardHeader>
              <CardContent className={cn("flex-grow", dir === 'rtl' ? "text-right" : "text-left")}>
                <p className="text-muted-foreground">{memoir.excerpt}</p>
              </CardContent>
              <CardFooter className={cn(dir === 'rtl' ? "justify-start" : "justify-end")}>
                <Link href={`/memoirs/${memoir.id}`}>
                  <Button variant="outline" className={cn("group", dir === 'rtl' && "flex-row-reverse")}>
                    {t('readMore')}
                    {directionIcon}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
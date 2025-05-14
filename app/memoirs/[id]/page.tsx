'use client';

import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Memoir {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export default function MemoirDetails() {
  const params = useParams();
  const router = useRouter();
  const { t, dir, lang } = useLanguage();
  
  const memoirId = params.id as string;
  const memoirs = t('memoirs') as Memoir[];
  const memoir = memoirs.find(m => m.id === memoirId);
  
  const directionIconBack = dir === 'ltr' ? 
    <ArrowLeft className="mr-2 h-4 w-4" /> : 
    <ArrowRight className="ml-2 h-4 w-4" />;
  
  if (!memoir) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Memoir not found</h1>
        <Button onClick={() => router.push('/memoirs')}>
          {directionIconBack}
          Back to Memoirs
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          onClick={() => router.push('/memoirs')}
          className={cn("mb-8", dir === 'rtl' && "flex-row-reverse")}
        >
          {directionIconBack}
          <span>{lang === 'en' ? 'Back to Memoirs' : 'بازگشت به خاطرات'}</span>
        </Button>
        
        <article className={cn("max-w-3xl mx-auto", dir === 'rtl' ? "text-right" : "text-left")}>
          <h1 className={cn("text-3xl md:text-4xl font-bold mb-4",
            dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
            {memoir.title}
          </h1>
          
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Calendar className={cn("h-4 w-4", dir === 'rtl' ? "ml-2" : "mr-2")} />
            <span>{t('publishedOn')} {memoir.date}</span>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {memoir.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-muted-foreground">{paragraph}</p>
            ))}
          </div>
        </article>
      </motion.div>
    </div>
  );
}
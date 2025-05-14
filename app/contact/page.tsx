'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Building, Linkedin, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ContactDetails {
  email: string;
  phone: string;
  office: string;
  linkedin: string;
  twitter: string;
}

export default function Contact() {
  const { t, dir } = useLanguage();
  
  const contactDetails = t('contactDetails') as ContactDetails;
  
  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5" />, 
      label: t('emailLabel'), 
      value: contactDetails.email,
      link: `mailto:${contactDetails.email}` 
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      label: t('phoneLabel'), 
      value: contactDetails.phone,
      link: null
    },
    { 
      icon: <Building className="h-5 w-5" />, 
      label: t('officeLabel'), 
      value: contactDetails.office,
      link: null
    }
  ];
  
  const socialLinks = [
    { 
      icon: <Linkedin className="h-5 w-5" />, 
      label: t('linkedinLabel'), 
      value: contactDetails.linkedin,
      link: `https://${contactDetails.linkedin}` 
    },
    { 
      icon: <Twitter className="h-5 w-5" />, 
      label: t('twitterLabel'), 
      value: contactDetails.twitter,
      link: `https://twitter.com/${contactDetails.twitter.replace('@', '')}` 
    }
  ];
  
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
        className="text-center mb-12"
      >
        <h1 className={cn("text-3xl md:text-4xl font-bold",
          dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
          {t('contactTitle')}
        </h1>
      </motion.div>
      
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>{t('contactTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="space-y-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {contactInfo.map((info, index) => (
                <motion.div key={index} variants={item}>
                  <div className={cn("flex items-start space-x-4", dir === 'rtl' && "flex-row-reverse space-x-reverse")}>
                    <div className="mt-0.5 bg-muted p-2 rounded-md">
                      {info.icon}
                    </div>
                    <div className={cn(dir === 'rtl' ? "text-right" : "text-left")}>
                      <h3 className="font-medium">{info.label}</h3>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-primary hover:underline"
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              <Separator className="my-4" />
              
              <div className={cn(dir === 'rtl' ? "text-right" : "text-left")}>
                <h3 className="font-medium mb-4">{t('socialMediaLabel')}</h3>
                <div className="space-y-4">
                  {socialLinks.map((social, index) => (
                    <motion.div key={index} variants={item}>
                      <div className={cn("flex items-center space-x-4", dir === 'rtl' && "flex-row-reverse space-x-reverse")}>
                        <div className="bg-muted p-2 rounded-md">
                          {social.icon}
                        </div>
                        <div>
                          <a 
                            href={social.link} 
                            className="text-primary hover:underline"
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {social.value}
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
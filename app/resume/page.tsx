'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Resume() {
  const { t, dir } = useLanguage();
  
  const workExperiences = t('workExperiences') as Array<{
    position: string;
    company: string;
    period: string;
    description: string;
  }>;
  
  const educationEntries = t('educationEntries') as Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
  }>;
  
  const skillsList = t('skillsList') as string[];
  
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
        className="flex flex-col md:flex-row justify-between items-center mb-8"
      >
        <h1 className={cn("text-3xl md:text-4xl font-bold",
          dir === 'rtl' ? "font-vazirmatn" : "font-inter")}>
          {t('resumeTitle')}
        </h1>
        
        <Button className="mt-4 md:mt-0">
          <FileDown className="mr-2 h-4 w-4" />
          {t('downloadResume')}
        </Button>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle>{t('experience')}</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {workExperiences.map((exp, index) => (
                  <motion.div 
                    key={index} 
                    className={cn("border-b last:border-0 pb-6 last:pb-0", 
                      dir === 'rtl' ? "text-right" : "text-left")}
                    variants={item}
                  >
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{exp.company}</p>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
          
          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle>{t('education')}</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div 
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {educationEntries.map((edu, index) => (
                  <motion.div 
                    key={index} 
                    className={cn("border-b last:border-0 pb-6 last:pb-0", 
                      dir === 'rtl' ? "text-right" : "text-left")}
                    variants={item}
                  >
                    <div className="flex flex-col md:flex-row justify-between mb-2">
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <Badge variant="outline" className="mt-2 md:mt-0 w-fit">
                        {edu.year}
                      </Badge>
                    </div>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    <p className="text-muted-foreground">{edu.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>{t('skills')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Publications preview */}
          <Card>
            <CardHeader>
              <CardTitle>{t('publications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className={cn("list-disc list-inside space-y-2 text-muted-foreground",
                dir === 'rtl' ? "text-right" : "text-left")}>
                <li>Ahmadi, M., et al. (2022). "Sustainable Water Management in Arid Regions." Journal of Water Resources Management, 45(2), 112-128.</li>
                <li>Ahmadi, M., et al. (2020). "Climate Change Impacts on Water Resources in Iran." International Journal of Environmental Studies, 77(3), 228-241.</li>
                <li>Ahmadi, M., et al. (2018). "Groundwater Modeling in Semi-arid Regions." Hydrology Journal, 29(4), 342-356.</li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>{t('certifications')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className={cn("list-disc list-inside space-y-2 text-muted-foreground",
                dir === 'rtl' ? "text-right" : "text-left")}>
                <li>International Water Association Professional Certification (2019)</li>
                <li>Advanced Project Management for Water Infrastructure (2017)</li>
                <li>UNESCO Water Leadership Program (2014)</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
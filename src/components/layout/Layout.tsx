
import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '../WhatsAppButton';

interface LayoutProps {
  children: React.ReactNode;
  withHeader?: boolean;
  withFooter?: boolean;
  withWhatsApp?: boolean;
}

export const Layout = ({ 
  children, 
  withHeader = true, 
  withFooter = true,
  withWhatsApp = true
}: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {withHeader && <Header />}
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
      {withWhatsApp && <WhatsAppButton />}
    </div>
  );
};

export const LayoutHeader: React.FC<{
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ title, description, className, children }) => {
  return (
    <div className={`py-12 md:py-16 ${className}`}>
      <div className="container-custom">
        {title && <h1 className="heading-lg mb-3">{title}</h1>}
        {description && <p className="text-muted-foreground max-w-2xl">{description}</p>}
        {children}
      </div>
    </div>
  );
};

export const LayoutContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return (
    <div className={`py-8 md:py-12 ${className}`}>
      <div className="container-custom">
        {children}
      </div>
    </div>
  );
};

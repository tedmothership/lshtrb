import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const siteName = "CamHub - Premium Adult Entertainment";
  const defaultDescription = "Discover live webcam models on CamHub. Your top spot for adult entertainment, featuring a wide variety of performers and interactive shows.";
  const siteUrl = "https://lushturbate.com";
  const defaultOgImage = `${siteUrl}/logo.png`; 

  return (
    <>
      <Helmet>
        <meta property="og:site_name" content={siteName} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Default tags for pages using this layout, can be overridden by specific pages */}
        <title>{siteName}</title>
        <meta name="description" content={defaultDescription} />
        <meta property="og:title" content={siteName} />
        <meta property="og:description" content={defaultDescription} />
        <meta property="og:image" content={defaultOgImage} />
        <meta property="twitter:title" content={siteName} />
        <meta property="twitter:description" content={defaultDescription} />
        <meta property="twitter:image" content={defaultOgImage} />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, ShieldCheck } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Lushturbate</title>
        <meta name="description" content="Get in touch with Lushturbate. For inquiries, support, or feedback, find our contact information here. We value your input." />
        <link rel="canonical" href="https://lushturbate.com/contact" /> {/* Replace with your actual domain */}
      </Helmet>
      <div className="max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-400">Contact Lushturbate</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl mb-10">
          <p className="text-gray-300 leading-relaxed mb-6 text-center">
            We value your feedback, questions, and suggestions. Please feel free to reach out to us.
            As an affiliate site, we primarily direct users to Chaturbate. For issues related to specific performers,
            billing, or account problems on Chaturbate, please contact Chaturbate support directly.
          </p>

          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg w-full md:w-auto justify-center">
              <Mail className="h-6 w-6 text-pink-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">General Inquiries & Feedback</h2>
                <a href="mailto:support@lushturbate.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                  support@lushturbate.com {/* Replace with your actual email */}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg w-full md:w-auto justify-center">
              <ShieldCheck className="h-6 w-6 text-green-400" />
              <div>
                <h2 className="text-lg font-semibold text-white">DMCA & Legal Matters</h2>
                <a href="mailto:legal@lushturbate.com" className="text-purple-300 hover:text-purple-200 transition-colors">
                  legal@lushturbate.com {/* Replace with your actual email */}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400 text-center">Important Note</h2>
          <p className="text-gray-400 leading-relaxed text-sm text-center">
            Lushturbate is an aggregator and affiliate partner. We do not directly manage performers, accounts, or financial transactions that occur on the Chaturbate platform.
            For assistance with your Chaturbate account, payment issues, or technical problems on their site, please visit the official Chaturbate support channels.
          </p>
          <div className="text-center mt-6">
            <a 
              href="https://support.chaturbate.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Chaturbate Support
            </a>
          </div>
        </div>
        
        <p className="text-center text-gray-500 mt-12 text-sm">
          We typically respond to emails within 24-48 business hours.
        </p>
      </div>
    </>
  );
};

export default ContactPage;

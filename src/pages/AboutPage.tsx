import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Lushturbate</title>
        <meta name="description" content="Learn more about Lushturbate, your premium destination for interactive adult entertainment. Discover our mission and commitment to providing the best live cam experience." />
        <link rel="canonical" href="https://lushturbate.com/about" /> {/* Replace with your actual domain */}
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-4xl font-bold mb-8 text-purple-400">About Lushturbate</h1>
        
        <section className="mb-10 p-6 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">Our Mission</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            At Lushturbate, our mission is to provide a premier, user-friendly platform for discovering and connecting with a diverse range of live adult entertainers from around the globe. We aim to enhance your interactive experience by offering advanced search and filtering capabilities, ensuring you can always find the performers and content that excite you the most.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We are passionate about creating a safe, respectful, and engaging environment for both users and performers. While we operate as an affiliate aggregator, we are committed to promoting responsible adult entertainment.
          </p>
        </section>

        <section className="mb-10 p-6 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 pl-4">
            <li>
              <strong>Vast Selection:</strong> Access thousands of live cam models, including women, men, trans performers, and couples, catering to a wide array of preferences.
            </li>
            <li>
              <strong>Advanced Filtering:</strong> Easily find performers based on gender, region, tags, HD availability, and more with our intuitive filtering system.
            </li>
            <li>
              <strong>Real-time Updates:</strong> See who's online right now and discover new and trending models as they come live.
            </li>
            <li>
              <strong>Direct Access:</strong> Seamlessly connect to Chaturbate's platform to interact with models, tip, and enjoy private shows, all while supporting performers through our affiliate links.
            </li>
            <li>
              <strong>User-Focused Design:</strong> Enjoy a clean, modern, and mobile-friendly interface designed for optimal browsing and discovery.
            </li>
          </ul>
        </section>

        <section className="mb-10 p-6 bg-gray-800 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4 text-pink-400">Our Commitment</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Lushturbate is dedicated to ethical practices. We strictly adhere to legal age requirements (18+) and promote content from consenting adult performers. We do not host any content directly but provide a curated gateway to established platforms.
          </p>
          <p className="text-gray-300 leading-relaxed">
            We believe in transparency and strive to provide accurate information about performers based on publicly available data from our partners. Your privacy and security are important to us; please review our Privacy Policy for more details.
          </p>
        </section>
        
        <section className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Thank you for choosing Lushturbate. Explore, connect, and enjoy responsibly!
          </p>
        </section>
      </div>
    </>
  );
};

export default AboutPage;

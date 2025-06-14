import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Lushturbate</title>
        <meta name="description" content="Read the Privacy Policy for Lushturbate. Understand how we collect, use, and protect your data when you use our adult entertainment aggregation service." />
        <link rel="canonical" href="https://lushturbate.com/privacy-policy" /> {/* Replace with your actual domain */}
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Privacy Policy for Lushturbate</h1>
        <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">1. Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Welcome to Lushturbate ("us", "we", or "our"). We operate [Your Website URL] (hereinafter referred to as the "Service"). Our Privacy Policy governs your visit to [Your Website URL] and explains how we collect, safeguard, and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">2. Information Collection and Use</h2>
          <p className="text-gray-300 leading-relaxed mb-2">
            We collect several different types of information for various purposes to provide and improve our Service to you.
          </p>
          <h3 className="text-lg font-medium mb-1 text-gray-200">Types of Data Collected:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
            <li><strong>Usage Data:</strong> We may collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device. This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers, and other diagnostic data. When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers, and other diagnostic data.</li>
            <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</li>
          </ul>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">3. Use of Data</h2>
          <p className="text-gray-300 leading-relaxed">
            Lushturbate uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
            <li>To provide and maintain our Service.</li>
            <li>To notify you about changes to our Service.</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so.</li>
            <li>To provide customer support.</li>
            <li>To gather analysis or valuable information so that we can improve our Service.</li>
            <li>To monitor the usage of our Service.</li>
            <li>To detect, prevent and address technical issues.</li>
            <li>As an affiliate, clicks on links to Chaturbate may be tracked for commission purposes. This tracking is typically handled by Chaturbate and is subject to their privacy policy.</li>
          </ul>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">4. Data Disclosure</h2>
          <p className="text-gray-300 leading-relaxed">
            We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.
          </p>
        </section>
        
        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">5. Third-Party Links</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Service links to Chaturbate.com. When you click on these links, you will be directed to Chaturbate's website. Chaturbate has its own privacy policy, and we strongly advise you to review it. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">6. Children's Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Service is intended for use by individuals 18 years of age or older. We do not knowingly collect personally identifiable information from children under 18. If you become aware that a child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-300 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </section>

        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">8. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@lushturbate.com" className="text-purple-300 hover:text-purple-200">privacy@lushturbate.com</a> {/* Replace with your actual email */}
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;

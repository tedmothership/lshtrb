import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Lushturbate</title>
        <meta name="description" content="Review the Terms of Service for Lushturbate. Understand the rules and guidelines for using our adult entertainment aggregation platform." />
        <link rel="canonical" href="https://lushturbate.com/terms-of-service" /> {/* Replace with your actual domain */}
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">Terms of Service for Lushturbate</h1>
        <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">1. Acceptance of Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            By accessing and using Lushturbate ([Your Website URL], "the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. All such guidelines or rules are hereby incorporated by reference into the TOS. IF YOU DO NOT AGREE TO ABIDE BY THE ABOVE, PLEASE DO NOT USE THE SERVICE.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">2. Age Restriction</h2>
          <p className="text-gray-300 leading-relaxed">
            This Service is intended solely for users who are 18 years of age or older. Any access to or use of the Service by anyone under 18 is expressly prohibited. By accessing or using the Service, you represent and warrant that you are 18 or older.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">3. Service Description</h2>
          <p className="text-gray-300 leading-relaxed">
            Lushturbate is an adult entertainment aggregator that provides links to third-party live webcam services, primarily Chaturbate.com. We do not host any video content or operate the webcam services ourselves. Our Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties of any kind, whether express or implied.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">4. User Conduct</h2>
          <p className="text-gray-300 leading-relaxed">
            You agree not to use the Service to:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4">
            <li>Violate any local, state, national, or international law.</li>
            <li>Engage in any activity that is harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
            <li>Attempt to gain unauthorized access to any part of the Service or its related systems or networks.</li>
          </ul>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">5. Intellectual Property</h2>
          <p className="text-gray-300 leading-relaxed">
            The Service and its original content (excluding content provided by users or third parties), features, and functionality are and will remain the exclusive property of Lushturbate and its licensors.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">6. Third-Party Links</h2>
          <p className="text-gray-300 leading-relaxed">
            Our Service contains links to third-party web sites or services that are not owned or controlled by Lushturbate, primarily Chaturbate.com. Lushturbate has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Lushturbate shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services. We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">7. Limitation of Liability</h2>
          <p className="text-gray-300 leading-relaxed">
            In no event shall Lushturbate, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">8. Changes to Terms</h2>
          <p className="text-gray-300 leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">9. Contact Us</h2>
          <p className="text-gray-300 leading-relaxed">
            If you have any questions about these Terms, please contact us at: <a href="mailto:legal@lushturbate.com" className="text-purple-300 hover:text-purple-200">legal@lushturbate.com</a> {/* Replace with your actual email */}
          </p>
        </section>
      </div>
    </>
  );
};

export default TermsOfServicePage;

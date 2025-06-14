import React from 'react';
import { Helmet } from 'react-helmet-async';

const DMCAPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>DMCA Policy - Lushturbate</title>
        <meta name="description" content="Lushturbate DMCA (Digital Millennium Copyright Act) Policy. Information on how to submit a copyright infringement notification." />
        <link rel="canonical" href="https://lushturbate.com/dmca" /> {/* Replace with your actual domain */}
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-purple-400">DMCA Copyright Policy</h1>
        <p className="text-sm text-gray-400 mb-6">Last Updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">Introduction</h2>
          <p className="text-gray-300 leading-relaxed">
            Lushturbate ([Your Website URL]) respects the intellectual property rights of others and expects its users to do the same. In accordance with the Digital Millennium Copyright Act (DMCA), we will respond expeditiously to notices of alleged copyright infringement that are reported to Lushturbate's Designated Copyright Agent, identified below.
          </p>
          <p className="text-gray-300 leading-relaxed mt-2">
            Please note that Lushturbate is an aggregator service that links to content hosted on third-party platforms (primarily Chaturbate.com). We do not host any of the video streams or performer content ourselves. If your copyright complaint pertains to content hosted on Chaturbate or another third-party platform, you should direct your DMCA notice to that platform directly, as they are the content hosts.
          </p>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">Reporting Copyright Infringement (Content on Lushturbate.com itself)</h2>
          <p className="text-gray-300 leading-relaxed">
            If you are a copyright owner, or are authorized to act on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement that is taking place through the Service (referring to content on Lushturbate.com itself, not on third-party sites we link to), you must submit your notice in writing to the attention of our Copyright Agent (see below) and include in your notice a detailed description of the alleged infringement.
          </p>
          <p className="text-gray-300 leading-relaxed mt-2">
            Your DMCA takedown notice must include the following information:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 pl-4 mt-2">
            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
            <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
            <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material on Lushturbate.com.</li>
            <li>Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an electronic mail address at which you may be contacted.</li>
            <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          </ul>
        </section>

        <section className="mb-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">Designated Copyright Agent</h2>
          <p className="text-gray-300 leading-relaxed">
            You can submit your DMCA takedown notice to our Designated Copyright Agent via email:
          </p>
          <p className="text-gray-300 leading-relaxed mt-2">
            Email: <a href="mailto:dmca@lushturbate.com" className="text-purple-300 hover:text-purple-200">dmca@lushturbate.com</a> {/* Replace with your actual email */}
          </p>
          <p className="text-gray-300 leading-relaxed mt-2">
            Please note that this contact information is exclusively for copyright infringement notices related to content on Lushturbate.com. For inquiries or issues related to content on Chaturbate.com, please contact Chaturbate directly.
          </p>
        </section>
        
        <section className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">Counter-Notification</h2>
          <p className="text-gray-300 leading-relaxed">
            If you believe that your content that was removed (or to which access was disabled) is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the material in your content, you may send a counter-notice containing the prescribed information to our Copyright Agent.
          </p>
        </section>
      </div>
    </>
  );
};

export default DMCAPage;

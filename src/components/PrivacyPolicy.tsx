import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We collect information that you provide directly to us, including:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Name and contact information</li>
          <li>Billing and shipping addresses</li>
          <li>Payment information</li>
          <li>Order history</li>
          <li>Communication preferences</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
        <p className="text-gray-600 mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Process your orders and payments</li>
          <li>Communicate with you about your orders</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our products and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
        <p className="text-gray-600 mb-4">
          We do not sell your personal information. We may share your information with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Service providers who assist in our operations</li>
          <li>Payment processors</li>
          <li>Shipping partners</li>
          <li>Law enforcement when required by law</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You have the right to:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mb-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
          <li>Lodge a complaint with supervisory authorities</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-gray-600">
          Email: info@armornasvap.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
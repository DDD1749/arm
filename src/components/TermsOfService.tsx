import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="prose prose-lg max-w-none">
      <p className="mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing and using our website, you agree to be bound by these Terms of Service
          and all applicable laws and regulations. If you do not agree with any of these terms,
          you are prohibited from using or accessing this site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
        <p className="text-gray-600 mb-4">
          Permission is granted to temporarily download one copy of the materials on our website
          for personal, non-commercial transitory viewing only. This is the grant of a license,
          not a transfer of title.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Product Information</h2>
        <p className="text-gray-600 mb-4">
          We strive to provide accurate product descriptions and pricing. However, we do not
          warrant that product descriptions or prices are accurate, complete, reliable, current,
          or error-free.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Shipping and Delivery</h2>
        <p className="text-gray-600 mb-4">
          We offer worldwide shipping on all orders. Delivery times may vary depending on your
          location. We are not responsible for delays caused by customs or other factors
          outside our control.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Returns and Refunds</h2>
        <p className="text-gray-600 mb-4">
          We accept returns within 30 days of delivery. Items must be unused and in their
          original packaging. Custom-made items cannot be returned unless defective.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer</h2>
        <p className="text-gray-600 mb-4">
          The materials on our website are provided on an 'as is' basis. We make no
          warranties, expressed or implied, and hereby disclaim and negate all other
          warranties including, without limitation, implied warranties or conditions of
          merchantability, fitness for a particular purpose, or non-infringement of
          intellectual property or other violation of rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
        <p className="text-gray-600 mb-4">
          If you have any questions about these Terms of Service, please contact us at:
        </p>
        <p className="text-gray-600">
          Email: info@armornasvap.com
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
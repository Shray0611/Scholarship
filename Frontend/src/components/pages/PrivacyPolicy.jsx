import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Privacy{" "}
            <span className="text-blue-600 dark:text-blue-400">Policy</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Last Updated: May 15, 2023
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Vivekanand Seva Mandal ("we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website and use our scholarship application services.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We take your privacy seriously and have implemented measures to
              ensure that the information you share with us remains secure.
              Please read this policy carefully to understand our practices
              regarding your personal data.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect information that you voluntarily provide to us when you
              register on our website, apply for scholarships, or otherwise
              communicate with us. This may include:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
              <li>
                Personal identification information (name, email address, phone
                number, postal address)
              </li>
              <li>
                Educational information (school/college name, course of study,
                academic records)
              </li>
              <li>
                Financial information (family income, other scholarships
                received)
              </li>
              <li>
                Demographic information (age, gender, caste, religion - only
                when required for specific scholarship requirements)
              </li>
              <li>
                Documents you upload (ID proofs, academic certificates, income
                certificates)
              </li>
              <li>Your responses to surveys or feedback forms</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              We also automatically collect certain information when you visit
              our website, including your IP address, browser type, operating
              system, referring URLs, access times, and pages viewed. This
              information helps us improve our website and services.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may use the information we collect for various purposes,
              including:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Processing and evaluating scholarship applications</li>
              <li>
                Communicating with you about your application status and
                scholarship details
              </li>
              <li>Disbursing scholarship funds to selected recipients</li>
              <li>Verifying your identity and the information you provide</li>
              <li>Conducting research and analysis to improve our services</li>
              <li>Complying with legal obligations</li>
              <li>Preventing fraudulent use of our services</li>
              <li>
                Sending periodic emails about our programs, events, or other
                relevant information (you may opt out at any time)
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Information Sharing and Disclosure
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may share your information in the following situations:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <span className="font-medium">With Scholarship Sponsors:</span>{" "}
                Information about scholarship recipients may be shared with the
                organizations that fund the scholarships, but only with your
                consent.
              </li>
              <li>
                <span className="font-medium">
                  With Educational Institutions:
                </span>{" "}
                We may verify your enrollment status and academic performance
                with your educational institution.
              </li>
              <li>
                <span className="font-medium">With Service Providers:</span> We
                may share your information with third-party vendors who provide
                services on our behalf, such as payment processing or data
                analysis. These parties are bound by confidentiality agreements.
              </li>
              <li>
                <span className="font-medium">For Legal Compliance:</span> We
                may disclose your information if required to do so by law or in
                response to valid requests by public authorities.
              </li>
              <li>
                <span className="font-medium">With Your Consent:</span> We may
                share your information for other purposes with your explicit
                consent.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We do not sell, trade, or otherwise transfer your personally
              identifiable information to outside parties for marketing
              purposes.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement appropriate security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                Secure Sockets Layer (SSL) encryption for data transmission
              </li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage practices</li>
              <li>Staff training on privacy and security practices</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              While we strive to use commercially acceptable means to protect
              your personal information, no method of transmission over the
              Internet or electronic storage is 100% secure. We cannot guarantee
              absolute security.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Rights and Choices
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have certain rights regarding your personal information,
              including:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>
                <span className="font-medium">Access and Update:</span> You can
                review and update your personal information by logging into your
                account on our website.
              </li>
              <li>
                <span className="font-medium">Data Deletion:</span> You may
                request deletion of your personal data, subject to certain
                exceptions.
              </li>
              <li>
                <span className="font-medium">Marketing Communications:</span>{" "}
                You can opt out of receiving marketing emails by following the
                unsubscribe instructions in those emails.
              </li>
              <li>
                <span className="font-medium">Cookies:</span> Most web browsers
                allow you to control cookies through their settings. You may
                choose to disable cookies, but this may affect your ability to
                use certain features of our site.
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              To exercise these rights or if you have questions about your
              personal information, please contact us using the information
              provided at the end of this policy.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our website and services are not directed to individuals under the
              age of 13. We do not knowingly collect personal information from
              children under 13. If we become aware that we have collected
              personal information from a child under the age of 13 without
              verification of parental consent, we will take steps to remove
              that information from our servers. If you believe we might have
              any information from or about a child under 13, please contact us.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date at the top. You are
              advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <div className="ml-5 text-gray-600 dark:text-gray-300">
              <p>Vivekanand Seva Mandal</p>
              <p>123 Education Street, Knowledge Park</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p>Email: privacy@vsmandal.org</p>
              <p>Phone: +91 22 1234 5678</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

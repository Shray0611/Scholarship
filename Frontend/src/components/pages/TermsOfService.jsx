import React from "react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Terms of{" "}
            <span className="text-blue-600 dark:text-blue-400">Service</span>
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
              Welcome to the Vivekanand Seva Mandal scholarship portal. These
              Terms of Service ("Terms") govern your access to and use of our
              website and scholarship application services.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              By accessing or using our services, you agree to be bound by these
              Terms. If you disagree with any part of the Terms, you may not
              access the service. Please read these Terms carefully before using
              our services.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Use of Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our scholarship portal is designed to help students apply for
              financial assistance for their educational needs. By using our
              services, you agree to:
            </p>
            <ol className="list-decimal pl-5 text-gray-600 dark:text-gray-300 space-y-3">
              <li>
                <span className="font-medium">
                  Provide Accurate Information:
                </span>{" "}
                All information provided during registration and scholarship
                application must be truthful, accurate, and complete.
                Misrepresentation of information may result in disqualification
                from scholarship consideration and termination of your account.
              </li>
              <li>
                <span className="font-medium">Maintain Account Security:</span>{" "}
                You are responsible for maintaining the confidentiality of your
                account credentials and for all activities that occur under your
                account. Notify us immediately of any unauthorized use of your
                account or any other security breach.
              </li>
              <li>
                <span className="font-medium">Use Services as Intended:</span>{" "}
                You agree to use our services only for their intended purpose of
                applying for scholarships and managing your scholarship
                applications. Any unauthorized or improper use is prohibited.
              </li>
              <li>
                <span className="font-medium">
                  Comply with Eligibility Requirements:
                </span>{" "}
                You must meet the specific eligibility criteria for each
                scholarship program you apply for. Applying for scholarships for
                which you are not eligible may result in disqualification from
                future consideration.
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Prohibited Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              When using our services, you agree not to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Submit false, misleading, or fraudulent information</li>
              <li>
                Use the service for any illegal purpose or in violation of any
                local, state, national, or international law
              </li>
              <li>
                Infringe on the intellectual property rights or other rights of
                third parties
              </li>
              <li>
                Interfere with or disrupt the service or servers or networks
                connected to the service
              </li>
              <li>
                Attempt to gain unauthorized access to any portion of the
                service or any other systems or networks
              </li>
              <li>
                Use automated methods (bots, scripts, etc.) to access the
                service or create accounts
              </li>
              <li>
                Transmit any viruses, worms, defects, Trojan horses, or other
                items of a destructive nature
              </li>
              <li>
                Create multiple accounts for the purpose of receiving additional
                scholarships
              </li>
              <li>
                Sell, trade, or transfer your account or scholarship eligibility
                to anyone else
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Intellectual Property
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The content on our website, including text, graphics, logos,
              icons, images, audio clips, digital downloads, and software, is
              the property of Vivekanand Seva Mandal or its content suppliers
              and is protected by Indian and international copyright, trademark,
              and other intellectual property laws.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You may not use, reproduce, modify, distribute, or display any
              portion of our website content without our prior written consent.
              The Vivekanand Seva Mandal name and logo are trademarks of our
              organization and may not be used without permission.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              User Content
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By submitting content (including application information,
              documents, and feedback) to our website, you grant Vivekanand Seva
              Mandal a non-exclusive, royalty-free, perpetual, irrevocable, and
              fully sublicensable right to use, reproduce, modify, adapt,
              publish, translate, and distribute such content for the purpose of
              operating our scholarship programs and improving our services.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              You represent and warrant that you own or control all rights to
              the content you submit, that the content is accurate, and that use
              of the content does not violate these Terms and will not cause
              injury to any person or entity.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Scholarship Decisions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              All scholarship decisions are made at the sole discretion of
              Vivekanand Seva Mandal and our scholarship committee. We reserve
              the right to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
              <li>Modify scholarship criteria at any time</li>
              <li>Adjust scholarship amounts based on available funding</li>
              <li>
                Request additional information or verification before making a
                decision
              </li>
              <li>
                Revoke a scholarship if it is determined that the recipient
                provided false information or violated these Terms
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              All scholarship decisions are final. While we strive to provide
              feedback when possible, we cannot guarantee individual feedback
              for all applicants.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our services are provided on an "as is" and "as available" basis.
              Vivekanand Seva Mandal makes no representations or warranties of
              any kind, express or implied, regarding the operation of our
              website or the information, content, materials, or services
              included on the website.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              To the full extent permissible by applicable law, Vivekanand Seva
              Mandal disclaims all warranties, express or implied, including but
              not limited to, implied warranties of merchantability and fitness
              for a particular purpose. We do not warrant that our website, its
              servers, or communications sent from us are free of viruses or
              other harmful components.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Vivekanand Seva Mandal shall not be liable for any direct,
              indirect, incidental, special, consequential, or punitive damages
              arising out of or relating to your use of or inability to use our
              services, even if we have been advised of the possibility of such
              damages. In no event shall our total liability to you for all
              damages, losses, and causes of action exceed the amount paid by
              you, if any, for accessing our website.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Indemnification
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              You agree to indemnify, defend, and hold harmless Vivekanand Seva
              Mandal, its officers, directors, employees, agents, and affiliates
              from and against any and all claims, liabilities, damages, losses,
              costs, expenses, or fees (including reasonable attorneys' fees)
              that arise from or relate to your use of our services, violation
              of these Terms, or violation of any rights of a third party.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to Terms
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to modify or replace these Terms at any time
              at our sole discretion. We will provide notice of any significant
              changes by posting the new Terms on our website and updating the
              "Last Updated" date. Your continued use of our services after any
              such changes constitutes your acceptance of the new Terms.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms shall be governed by and construed in accordance with
              the laws of India, without regard to its conflict of law
              provisions. You agree to submit to the personal and exclusive
              jurisdiction of the courts located in Mumbai, Maharashtra for the
              resolution of any disputes arising from these Terms or your use of
              our services.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="ml-5 text-gray-600 dark:text-gray-300">
              <p>Vivekanand Seva Mandal</p>
              <p>123 Education Street, Knowledge Park</p>
              <p>Mumbai, Maharashtra 400001</p>
              <p>Email: legal@vsmandal.org</p>
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

export default TermsOfService;

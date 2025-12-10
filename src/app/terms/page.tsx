import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: "Terms & Conditions",
  description: `Review the Terms & Conditions governing your use of ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div
      className="
        min-h-screen bg-white dark:bg-black 
        transition-colors duration-300 
        text-neutral-900 dark:text-neutral-200 
        px-5 pt-10 pb-20
      "
    >
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          By accessing or using {siteConfig.name} (“the platform”), you agree to 
          follow these Terms & Conditions. Please read them carefully.
        </p>


        {/* Section 1 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Use of the Platform</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          {siteConfig.name} is a platform where users explore questions, share 
          perspectives, and participate in current affairs quizzes. You may use 
          the platform only in compliance with these terms and applicable laws.
        </p>


        {/* Section 2 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">2. User-Submitted Content</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          You are responsible for any content you submit, including questions, 
          thoughts, perspectives, comments, or voice notes. By submitting content, 
          you grant {siteConfig.name} permission to display, store, and moderate it.
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          You agree not to submit:
          <br />• Harmful, abusive, or hateful content
          <br />• Illegal, misleading, or defamatory material
          <br />• Spam, advertising, or promotional content
          <br />• Content that infringes on another person’s rights
        </p>


        {/* Section 3 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">3. Accuracy of Content</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          The platform may show user-generated content and informational quiz content. 
          While we aim to provide meaningful experiences, {siteConfig.name} does not 
          guarantee completeness, accuracy, or reliability of content. Always verify 
          important information independently.
        </p>


        {/* Section 4 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Voting, Interaction & Participation</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          Users may interact by sharing perspectives, reacting to questions, or 
          participating in quizzes. {siteConfig.name} reserves the right to remove 
          or moderate interactions that violate platform guidelines.
        </p>


        {/* Section 5 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Limitations of Liability</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          {siteConfig.name} is provided “as is.” We are not responsible for:
          <br />• Losses resulting from reliance on platform content
          <br />• Issues caused by user-submitted content
          <br />• Service interruptions, errors, or technical issues
        </p>


        {/* Section 6 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">6. Modification of Services</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We may update, change, or remove features at any time without prior notice.
        </p>


        {/* Section 7 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">7. Account or Access Termination</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We may restrict or terminate access for users who violate these terms, 
          submit harmful content, or misuse the platform.
        </p>


        {/* Section 8 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to Terms</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          These Terms & Conditions may be updated occasionally. Continued use 
          of the platform means you accept the updated terms.
        </p>


        {/* Section 9 */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Information</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          For questions regarding these terms, reach out to us at:
        </p>

        <a
          href={`mailto:${siteConfig.supportEmail}`}
          className="text-blue-600 dark:text-blue-400 font-medium underline"
        >
          {siteConfig.supportEmail}
        </a>

        <p className="text-neutral-500 dark:text-neutral-500 text-sm mt-10">
          Updated: 2025
        </p>

      </div>
    </div>
  );
}

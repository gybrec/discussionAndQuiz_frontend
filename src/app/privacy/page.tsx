import { siteConfig } from "@/config/siteConfig";

export const metadata = {
  title: "Privacy Policy",
  description: `Learn how ${siteConfig.name} collects, uses, and protects your information with transparency and care.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
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

        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          This Privacy Policy explains how {siteConfig.name} (“we”, “our”, “the platform”) 
          collects, uses, and protects your information when you interact with our services. 
          By using {siteConfig.name}, you agree to the practices described below.
        </p>

        {/* 1. Information We Collect */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">1.1 Information You Provide</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We collect information you voluntarily submit, such as:
          <br />• Questions you ask
          <br />• Perspectives, thoughts, or voice notes you share
          <br />• Optional profile details (only if provided)
          <br />• Feedback or communication sent to us
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">1.2 Automatically Collected Information</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We may automatically collect:
          <br />• Device and browser details
          <br />• IP address (used only for security)
          <br />• Interaction patterns and usage analytics
          <br />• Quiz attempts and session data
        </p>

        {/* 2. Cookies & Local Storage */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">2. Cookies & Local Storage</h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          {siteConfig.name} uses cookies and localStorage to enhance usability.
          These help us:
          <br />• Save preferences (theme, settings, etc.)
          <br />• Maintain login/session continuity
          <br />• Improve quiz functionality
          <br />• Optimize platform performance
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          You may disable cookies in your browser, but certain features may not work properly.
        </p>

        {/* 3. How We Use Your Information */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">3. How We Use Your Information</h2>

        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          Information is used to:
          <br />• Deliver and improve platform features
          <br />• Support question-based discussions and perspectives
          <br />• Enhance current affairs quiz experience
          <br />• Prevent spam, abuse, or harmful activity
          <br />• Analyze trends and improve performance
        </p>

        {/* 4. Data Security */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">4. Data Protection & Security</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We use reasonable measures to protect your data. We do not sell or trade personal information.
          However, no method of online transmission is 100% secure.
        </p>

        {/* 5. Your Rights */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">5. Your Rights</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          You may request:
          <br />• Removal of content you submitted
          <br />• Access to your data
          <br />• Corrections or updates to your information
          <br />• Disabling of cookies
        </p>

        {/* 6. User-Generated Content */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">6. User-Generated Content</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          Content you post—questions, thoughts, perspectives, or voice—may be visible to other users.
          Content violating policies may be moderated or removed.
        </p>

        {/* 7. Children’s Privacy */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">7. Children’s Privacy</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          {siteConfig.name} is not intended for children under 13, and we do not knowingly collect their data.
        </p>

        {/* 8. Updates */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to This Policy</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
          We may update this Privacy Policy periodically. Continued use of the platform 
          means you accept any updated changes.
        </p>

        {/* 9. Contact */}
        <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Us</h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          For privacy-related questions or requests, contact us at:
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

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the AIQAAN team for inquiries, support, or suggestions. We're here to help.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
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

        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          {"Have a question, feedback, or suggestion? We'd love to hear from you."}
        </p>

        <p className="text-neutral-600 dark:text-neutral-400 mb-8">
          You can reach us directly via email at:
        </p>

        <a
          href="mailto:support@aiqaan.com"
          className="font-medium text-blue-600 dark:text-blue-400 text-lg underline"
        >
          support@aiqaan.com
        </a>

        <p className="text-neutral-500 dark:text-neutral-500 mt-10 text-sm">
          We typically respond within 48 hours.
        </p>

      </div>
    </div>
  );
}

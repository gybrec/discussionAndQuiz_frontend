import { ThemeProvider } from "@/context/theme/theme-provider";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Prevents hydration mismatch caused by browser extensions */}
      <body suppressHydrationWarning={true}>
        <ThemeProvider>
          <Providers>
            <Navbar />

            <Toaster position="top-center" richColors />

            <main>{children}</main>

            <Footer />

            {/* <CookieConsent /> */}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

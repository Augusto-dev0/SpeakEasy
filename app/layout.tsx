import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OnboardingModal from "@/components/OnboardingModal";

const baloo = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SpeakEasy | Pratique inglês falado todos os dias",
  description:
    "SpeakEasy ajuda iniciantes brasileiros a praticarem inglês falado com lições, flashcards e reconhecimento de voz no navegador.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${baloo.variable} ${inter.variable} font-body min-h-screen bg-[rgb(var(--bg))] text-ink-800 dark:text-ink-50 antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <OnboardingModal />
            <Header />
            <main className="min-h-[calc(100vh-64px)]">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import Header from "@/components/Header";
import getDocuments from "@/lib/doc";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "docu-craft-home",
  description: "DocuCraft by create next app",
};

export default function RootLayout({ children }) {
  const allDocuments = getDocuments();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full lg:ml-72 xl:ml-80">
          <Header docs={allDocuments} />
          <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
            <main className="flex-auto py-16">
              <article className="prose dark:prose-invert">{children}</article>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";
import Header from "@/components/Header";
import { getNav } from "@/lib/home";
import { site } from "@/lib/content";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} – ${site.role}`, template: `%s – ${site.name}` },
  description:
    "Wendy Chu is a staff-level product designer in Los Angeles with 14+ years of experience across B2B and B2C.",
  openGraph: { type: "website", siteName: site.name },
  icons: { icon: "/favicon.ico", apple: "/images/wclogo.png" },
};

export const viewport = { themeColor: "#ffede5" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Roboto+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/fonts/canelaweb-regular.woff" as="font" type="font/woff" crossOrigin="" />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header nav={getNav()} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}

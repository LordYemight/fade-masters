import { Oswald, Inter } from 'next/font/google';
import './globals.css';

const headingFont = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Fade Masters | Precision Cuts. Urban Edge.',
  description: 'The premier high-end barbershop in Brooklyn, NY.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans bg-primary text-white`}>
        {children}
      </body>
    </html>
  );
}
import { Oswald, Inter } from 'next/font/google';
import './globals.css';

const heading = Oswald({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Fade Masters | Precision Cuts & Urban Edge',
  description: 'Brooklyn\'s premier high-end barbershop, blending traditional techniques with street-luxe aesthetic.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans bg-primary text-secondary`}>
        {children}
      </body>
    </html>
  );
}
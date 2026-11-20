import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bài tập của tôi — IELTS Master E-Learning',
  description: 'Hệ thống quản lý và nộp bài tập học viên IELTS Master E-Learning Platform',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full bg-slate-50">
      <body className="min-h-full flex flex-col text-slate-900 bg-slate-50 antialiased selection:bg-slate-900 selection:text-white">
        <div className="flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}

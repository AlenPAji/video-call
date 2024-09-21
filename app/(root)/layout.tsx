import StreamVideoProvider from '@/providers/StreamClientProvider'// Named import
import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: "Video Call",
  description: "A video calling clone",
  icons:{
    icon:'/icons/logo.svg'
  }
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;

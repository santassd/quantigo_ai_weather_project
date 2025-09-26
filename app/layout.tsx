'use client';

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '../styles/globals.css'; // keep your CSS

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light', // or 'dark'
          }}
        >
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}

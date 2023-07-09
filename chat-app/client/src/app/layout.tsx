'use client';

import './globals.css';
import store from '@/redux/store/store';
import { Provider } from 'react-redux';

function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <Provider store={store}>
            <body>{children}</body>
         </Provider>
      </html>
   );
}

export default RootLayout;

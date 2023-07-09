export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body>
            <main>
               <section className="flex justify-center items-center min-h-screen bg-slate-200">{children}</section>
            </main>
         </body>
      </html>
   );
}

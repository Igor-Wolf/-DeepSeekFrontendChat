'use client'


import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>  
        <title>Chat Frontend</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"></link>
    </head>
      <body>
          
        {children}
        
       
    </body>
  </html>
  );
}
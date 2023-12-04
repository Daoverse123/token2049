import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

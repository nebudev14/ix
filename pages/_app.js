import "../styles/globals.css";

import NavBar from '../components/NavBar'
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <NavBar />
    </>

  );
}

export default MyApp;

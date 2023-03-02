import "../styles/globals.css";

import NavBar from "../components/NavBar";
import { SessionProvider } from "next-auth/react";
import { ParallaxProvider } from "react-scroll-parallax";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavBar />
        <div className="content">
          <ParallaxProvider>
            {Component.Layout ? (
              <Component.Layout>
                <Component {...pageProps} />
              </Component.Layout>
            ) : (
              <Component {...pageProps} />
            )}
          </ParallaxProvider>
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;

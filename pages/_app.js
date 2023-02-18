import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };
  return (
    <SessionProvider session={session}>
      <div className="bg-slate-100">
        <AnimatePresence mode="wait" />
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.6 }}
          key={router.asPath}
        >
          <Component {...pageProps} />
        </motion.div>
      </div>
    </SessionProvider>
  );
}

export default MyApp;

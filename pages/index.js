import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Link } from "next/link";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { ordinal_suffix_of } from "../lib/ordinal.js";
import NavBar from "../components/NavBar.js";

function Index() {
  const { data: session } = useSession();
  const years = useMotionValue(1);
  const yearsRender = useTransform(years, (latest) => ordinal_suffix_of(Math.round(latest)));

  useEffect(() => {
    const animation = animate(years, 9, { duration: 2 });

    return animation.stop;
  }, [years]);

  return (
    <div>
      <NavBar />
      <div className="py-40 flex grow items-center justify-center min-h-100% ">
        {/* Left side of page */}
        <div className="flex basis-1/2 items-end justify-end mr-6">
          <div className="border-l-4 border-green-400">
            {" "}
            <h1 className="px-4 border-l-8 border-green-400 text-9xl font-aquire">
              ATOM
              <br />
              HACKS
            </h1>
          </div>
        </div>

        {/* Right side of page */}
        <div className="flex basis-1/2 flex-col items-start justify-start ml-6">
          <h1 className="mb-2 text-5xl font-thin">
            Bronx Science&apos;s <motion.b className="text-yellow-500">{yearsRender}</motion.b>
            <br />
            Annual Hackathon
          </h1>
          <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
          <p className="mb-4 break-words">
            Explore, build, innovate. Come join us for 12 full hours <br /> of creativity, excitement, and building!
          </p>
          {session ? (
            <Link href="/dashboard">
              <button className="px-4 py-2 text-xl text-white bg-yellow-500 rounded-md">CONTINUE TO DASHBOARD</button>
            </Link>
          ) : (
            <button
              className="relative border-2 font-bold border-black border-2 rounded-lg bg-transparent py-2.5 px-5 uppercase transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-yellow-400 before:transition-transform before:duration-300 before:content-[''] before:hover:scale-x-100"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              REGISTER
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Index;
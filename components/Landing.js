//import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ordinal_suffix_of } from "../lib/ordinal.js";

const Landing = () => {
  const years = useMotionValue(1);
  const yearsRender = useTransform(years, (latest) => ordinal_suffix_of(Math.round(latest)));

  useEffect(() => {
    const animation = animate(years, 9, { duration: 3 });

    return animation.stop;
  }, [years]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      {/* Left side of page */}
      <div className="flex items-end justify-center mr-6">
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
      <div className="flex flex-col items-start justify-start ml-6">
        <h1 className="mb-2 text-5xl font-thin">
          Bronx Science&apos;s <motion.b className="text-yellow-500">{yearsRender}</motion.b>
          <br />
          Annual Hackathon
        </h1>
        <h1 className="py-2 text-xl font-semibold">March 18th, 2023</h1>
        <p className="mb-4 break-words">
          Explore, build, innovate. Come join us for 12 full hours <br /> of creativity, excitement, and building!
        </p>
        <button className="px-4 py-2 text-xl text-white bg-yellow-500 rounded-md">REGISTER</button>
      </div>
    </div>
  );
};

export default Landing;

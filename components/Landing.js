import Image from "next/image";

const Landing = () => {
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
          Bronx Science&apos;s <br /> <b className="text-yellow-500">9th</b> Annual Hackathon
        </h1>
        <h1 className="py-2 text-xl font-semibold">March 11th, 2023</h1>
        <p className="break-words ">
          Explore, build, innovate. Come join us for 12 full hours <br /> of creativity, excitement, and building!
        </p>
      </div>
    </div>
  );
};

export default Landing;

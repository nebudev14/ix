import Image from "next/image";
import Sample from "../public/atomhackspic.JPG";

function About() {
  return (
    <div className="container flex gap-20 py-40 mx-auto">
      <div className="relative">
        <div className="h-full shadow-2xl">
          <Image className="rounded-lg" src={Sample} alt=""></Image>
        </div>
      </div>

      <div className="flex flex-col gap-3 my-auto">
        <h1 className="mb-2 text-5xl font-bold"> ABOUT ATOMHACKS </h1>
        <h1 className="font-thin text-md">
          {" "}
          AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx
          High School <br /> of Science. We are driven to give back to our community and provide transformative computer
          science opportunities for students <br /> of all levels.
        </h1>
        <div className="absolute opacity-50 -inset-1 bg-gradient-to-l from-green-500 to-yellow-400 blur-md -z-10"></div>
      </div>
    </div>
  );
}

export default About;

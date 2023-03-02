import Image from "next/image";
import Sample from "../../public/assets/g1.webp";

const About = () => {
  return (
    <div className="container flex gap-20 mx-auto py-36 ">
      <div className="relative">
      <div className="absolute transition duration-200 opacity-75 -inset-1 bg-gradient-to-r from-green-500 to-yellow-500 rounded-xl blur-md group-hover:opacity-100 group-hover:duration-200 animate-tilt " />
        <Image className="relative shadow-2xl rounded-2xl" src={Sample} alt="" />
      </div>

      <div className="flex flex-col gap-3 my-auto">
        <h1 className="mb-2 text-5xl font-bold"> ABOUT ATOMHACKS </h1>
        <h1 className=" text-md">
          {" "}
          AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx
          High School <br /> of Science. We are driven to give back to our community and provide transformative computer
          science opportunities for students <br /> of all levels.
        </h1>
      </div>
    </div>
  );
};

export default About;

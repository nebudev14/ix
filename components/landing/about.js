import Image from "next/image";
import Sample from "../../public/atomhackspic.JPG";

const About = () => {
  return (
    <div className="container flex gap-20 py-40 mx-auto">
      <div className="relative">
        <Image className="shadow-2xl rounded-2xl" src={Sample} alt="" />
      </div>

      <div className="flex flex-col gap-3 my-auto">
        <h1 className="mb-2 text-5xl font-bold"> ABOUT ATOMHACKS </h1>
        <h1 className="font-thin text-md">
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

import Image from "next/image";
import Sample from "../public/atomhackspic.JPG";
import Atom from "../public/atom.png";

function About() {
    return (
        <div class="container mx-auto py-40 flex gap-20">
            <div class="relative">
                <div class="h-full shadow-2xl">
                    <Image class="rounded-lg" src={Sample}></Image>
                </div>
            </div>

            <div class="my-auto flex flex-col gap-3">
                <h1 class="mb-2 text-5xl font-bold"> ABOUT ATOMHACKS </h1>
                <h1 class="text-md font-thin"> AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx High School <br /> of Science. We are driven to give back to our community and provide transformative computer science opportunities for students <br /> of all levels.
                </h1>
                <div class="absolute -inset-1 bg-gradient-to-l from-green-500 to-yellow-400 blur-md opacity-50 -z-10"></div>
            </div>
            
        </div>

    )

}

export default About;

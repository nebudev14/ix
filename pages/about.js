function About() {
    return(
        <div class="container mx-auto py-40 flex gap-20">
            <div class="relative">
                <img class="h-1/4 absolute top-0 left-0 -z-10" src="public/atom.png" alt=""></img>
                <div class="h-full rounded-full">
                    <img src="public/atomhackspic.JPG"></img>
                </div>
                <h1>Left (img area)</h1>
            </div>

            <div class="my-auto flex flex-col gap-3">
                <h1 class="mb-2 text-5xl font-thin"> ABOUT ATOMHACKS </h1>
                <h1 class="text-md font-thin"> AtomHacks is committed to creating and organizing innovative and interactive coding competitions for the Bronx High School <br/> of Science. We are driven to give back to our community and provide transformative computer science opportunities for students <br/> of all levels.

 </h1>
            </div>
            

        </div>
    )
    
}


 
export default About;
import Image from "next/image";
import tempGallery from "../../public/gallery-temp.png";

const Gallery = () => {
  return (
    <div class="flex items-center justify-center min-h-[calc(100vh-64px)]">
      {" "}
      <Image width={750} height={750} src={tempGallery} alt="Whoops"></Image>
    </div>
  );
};

export default Gallery;

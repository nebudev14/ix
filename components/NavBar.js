import Link from "next/link";

const NavBar = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-16 z-10 bg-neutral-900 items-center border-b border-black">
      <div className="m-auto flex justify-center items-center  text-white font-bold">
        <Link className="p-3 text-4xl font-morro justify-self-start text-white mr-auto" href="/">
          ATOM HACKS IX
        </Link>
        <ul className="flex font-montserrat">
          <li>
            <Link className="p-4 hover:text-gray-500 duration-300" href="/about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className="p-4 hover:text-gray-500 duration-300" href="/gallery">
              GALLERY
            </Link>
          </li>
          <li>
            <Link className="p-4 hover:text-gray-500 duration-300" href="/sponsors">
              SPONSORS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

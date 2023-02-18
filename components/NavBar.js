import Link from 'next/link'
import Logo from '../public/logo.png'

const NavBar = () => {
    return (
        <div class='fixed left-0 top-0 w-full z-10 bg-gray-100 items-center'>
            <div class='px-40 m-auto flex justify-between items-center p-4 text-black font-bold'>
                <Link href="/"></Link>
                <ul class='flex'>
                    <li>
                        <Link class='p-4 hover:text-gray-500 duration-300' href='/'>HOME</Link>
                    </li>
                    <li>
                        <Link class='p-4 hover:text-gray-500 duration-300' href='/about'>ABOUT</Link>
                    </li>
                    <li>
                        <Link class='p-4 hover:text-gray-500 duration-300' href='/gallery'>GALLERY</Link>
                    </li>
                    <li>
                        <Link class='p-4 hover:text-gray-500 duration-300' href='/sponsors'>SPONSORS</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
 
export default NavBar;
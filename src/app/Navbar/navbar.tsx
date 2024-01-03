import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/icon.jpeg';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import MobileMenu from './MobileMenu';
// import MenuSimple from '@/components/MenuDropdown';
import NavMenu from '@/components/MenuDropdown';

const Navbar = async () => {
  
  const session = await getServerSession(authOptions);

  const user = session?.user;

  return (
    <>
      <div className="sm:hidden">
        <MobileMenu user={user} />
      </div>

      <div className="bg-base-300 w-full hidden sm:block ">
        <div className="navbar  max-w-[80%] min-w-[300px] m-auto sm:flex justify-between gap-2">
          
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Nextmazon Logo" width={50} height={50} title="NextMazon Logo" />
            ReportCard
          </Link>

          <NavMenu />
          
          <UserMenuButton session={session} />
        </div>
      </div>
    </>
  );
};

export default Navbar;

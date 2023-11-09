import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/logo-no-background.png';
import { redirect } from 'next/navigation';
// import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from './ShoppingCartButton';
import UserMenuButton from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const searchProducts = async (formData: FormData) => {
  'use server';

  const searchQuery = formData.get('searchQuery') as string;

  if (searchQuery) {
    // redirect(`/search/${searchQuery}`)
    redirect('/search?query=' + searchQuery);
  }
};

const Navbar = async () => {

  const session = await getServerSession(authOptions);

  // const cart = await getCart();

  return (
    <div className="bg-base-300 w-full">
      <div className="navbar  max-w-[80%] min-w-[300px] m-auto flex-col lg:flex-row gap-2">
        <div className="flex-1 ">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Nextmazon Logo" width={50} height={50} title="NextMazon Logo" />
            ReportCard
          </Link>
        </div>

        <div className='flex flex-col md:flex-row'>
        <div>
          <Link href="/all-students" className="btn btn-ghost">
            Students
          </Link>
          <Link href="/" className="btn btn-ghost">
            Home
          </Link>
          <Link href="/add-student-teacher" className="btn btn-ghost">
            Add Student
          </Link>
          <Link href="/upload-result" className="btn btn-ghost">
            Upload Result
          </Link>
          <Link href="/view-class-result" className="btn btn-ghost">
            View Class Results
          </Link>
          <Link href="/view-student-result" className="btn btn-ghost">
            View Student Results
          </Link>
        </div>

        <div className="flex flex-row gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100]"
              />
            </div>
          </form>
          {/* <ShoppingCartButton cart={cart} /> */}
          <UserMenuButton session={session} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

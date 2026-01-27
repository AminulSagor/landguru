import { Bell, Sandwich } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserDashbaordNavbar = () => {
  return (
    <nav className="py-4 flex items-center justify-between bg-white responsive-padding shadow-md border-b border-gray/20 fixed w-full z-50">
      <div className="flex gap-12">
        <div className="flex items-center gap-2">
          <span className="bg-primary rounded-lg text-white p-2 px-3">
            <Sandwich size={18} />
          </span>
          <h1 className="font-bold text-base">LandGuru</h1>
        </div>

        {/* navlinks */}
        <ul className="gap-4 lg:gap-8  items-center text-base text-gray hidden md:flex">
          <li>
            <Link href={"/dashboard/home"}>Home</Link>
          </li>
          <li>
            <Link href={"/dashboard/properties"}>Properties</Link>
          </li>
          <li>
            <Link href={"/dashboard/home"}>Appointments</Link>
          </li>
          <li>
            <Link href={"/dashboard/home"}>My Deals</Link>
          </li>
        </ul>
      </div>

      {/* setting area */}
      <div className="flex items-center gap-3 text-base">
        <Bell />

        {/* profile */}
        <div className="flex gap-2 items-center">
          <h1>John Doe</h1>
          <Image
            src={"/images/avatars/avatar.png"}
            height={28}
            width={28}
            className="rounded-full h-8 w-8 object-cover"
            alt="Profile-image"
          />
        </div>
      </div>
    </nav>
  );
};

export default UserDashbaordNavbar;

import { Sandwich } from "lucide-react";
import Link from "next/link";

const AuthNavbar = () => {
  return (
    <div className="flex items-center justify-between bg-[#F8F9FA] py-3">
      <div className="flex items-center gap-2">
        <span className="bg-primary rounded-lg text-white p-2 px-3">
          <Sandwich size={18} />
        </span>
        <h1 className="font-bold text-base">LandGuru</h1>
      </div>

      <p className="text-center text-sm text-gray">
        Already have an account? 
        <Link href="/auth/login" className="text-primary font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default AuthNavbar;

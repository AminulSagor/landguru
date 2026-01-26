import { BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const UserDashbaordFooter = () => {
  return (
    <div className="text-base text-gray flex items-center justify-between py-4 bg-white responsive-padding">
      <p>© 2026 LandGuru. All rights reserved.</p>

      <div className="flex items-center gap-4 text-gray">
        <FaFacebook size={18} />
        <BsTwitter size={18} />
      </div>
    </div>
  );
};

export default UserDashbaordFooter;

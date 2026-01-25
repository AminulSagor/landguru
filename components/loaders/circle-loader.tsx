import { Loader } from "lucide-react";
interface CircleLoaderProps {
  className?: string;
  size?: number;
}
const CircleLoader = ({ className, size = 20 }: CircleLoaderProps) => {
  return (
    <span className={`text-white ${className}`}>
      <Loader className="animate-spin" size={size} />
    </span>
  );
};

export default CircleLoader;

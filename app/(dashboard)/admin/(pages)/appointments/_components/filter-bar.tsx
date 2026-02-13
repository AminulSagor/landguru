import { ChevronDown } from "lucide-react";

const FilterBar = () => {
  return (
    <div className="flex items-center gap-4 px-5 bg-secondary/40 py-4 border-b border-gray/20">
      <h2 className="text-gray text-sm">Quick Filters :</h2>
      <div className="flex items-center flex-wrap gap-3">
        <p className="text-sm text-gray flex gap-1 items-center px-3 py-1 border rounded-full border-gray/20">
          <span> Property Type:</span> <span className="text-primary">All</span>{" "}
          <ChevronDown size={14} />
        </p>
        <p className="text-sm text-gray flex gap-1 items-center px-3 py-1 border rounded-full border-gray/20">
          <span> Location:</span>{" "}
          <span className="text-primary">All Cities</span>{" "}
          <ChevronDown size={14} />
        </p>
        <p className="text-sm text-gray flex gap-1 items-center px-3 py-1 border rounded-full border-gray/20">
          <span> Status:</span> <span className="text-primary">Any</span>{" "}
          <ChevronDown size={14} />
        </p>
      </div>
    </div>
  );
};

export default FilterBar;

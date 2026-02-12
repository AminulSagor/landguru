import { Logs, Search } from "lucide-react";
import React from "react";

const ListAndSearch = () => {
  return (
    <div className="flex gap-6">
      <button className="border border-gray/20 text-sm rounded-md px-3 py-1 flex items-center gap-2">
        <Logs size={15} />
        <span>List</span>
      </button>

      {/* search option */}
      <div className="border border-gray/20 rounded-md flex gap-2 items-center px-3">
        <Search size={18} />
        <input
          type="text"
          placeholder="search..."
          className="outline-none px-2 py-1 min-w-56 placeholder:text-sm"
        />
      </div>
    </div>
  );
};

export default ListAndSearch;

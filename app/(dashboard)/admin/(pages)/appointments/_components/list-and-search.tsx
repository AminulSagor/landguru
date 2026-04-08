import { Logs, Search } from "lucide-react";

interface ListAndSearchProps {
  showSearch?: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

const ListAndSearch = ({
  showSearch = true,
  searchValue,
  onSearchChange,
}: ListAndSearchProps) => {
  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 rounded-md border border-gray/20 px-3 py-1 text-sm">
        <Logs size={15} />
        <span>List</span>
      </button>

      {showSearch ? (
        <div className="flex items-center gap-2 rounded-md border border-gray/20 px-3">
          <Search size={18} />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by property, buyer, owner..."
            className="min-w-56 px-2 py-2 text-sm outline-none placeholder:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ListAndSearch;

import Button from "@/components/buttons/button";
import { Plus } from "lucide-react";

export default function ServicesToolbar({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-end">
      <Button variant="primary" onClick={onAdd} size="base">
        <Plus className="h-4 w-4" />
        Add Service Type
      </Button>
    </div>
  );
}

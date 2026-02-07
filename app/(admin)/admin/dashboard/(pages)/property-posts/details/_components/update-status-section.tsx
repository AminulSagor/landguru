import UpdatePropertyStatusDialog from "@/app/(admin)/admin/dashboard/(pages)/property-posts/details/_components/update-property-status-dialog";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import React, { useState } from "react";

const UpdateStatusSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mt-6">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Update Status</Button>
      </div>
      <UpdatePropertyStatusDialog open={open} onOpenChange={setOpen} />
    </Card>
  );
};

export default UpdateStatusSection;

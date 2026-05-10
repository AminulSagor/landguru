import UpdatePropertyStatusDialog from "@/app/(dashboard)/admin/(pages)/property-posts/details/_components/update-property-status-dialog";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import React, { useState } from "react";
import type { PropertyPostStatus } from "@/types/admin/property-post/property.types";

const UpdateStatusSection = ({
  postId,
  propertyTitle,
  currentStatus,
}: {
  postId: string;
  propertyTitle: string;
  currentStatus: PropertyPostStatus;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Card className="mt-6">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Update Status</Button>
      </div>
      <UpdatePropertyStatusDialog
        open={open}
        onOpenChange={setOpen}
        postId={postId}
        propertyTitle={propertyTitle}
        currentStatus={currentStatus}
      />
    </Card>
  );
};

export default UpdateStatusSection;

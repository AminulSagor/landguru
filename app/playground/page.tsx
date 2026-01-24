"use client";
import { HookFormSingleSelect } from "@/components/inputs/select/single.select";
import { HookFormTextInput } from "@/components/inputs/text-input";
import Button from "@/components/buttons/button";
import Card from "@/components/cards/card";
import Dialog from "@/components/dialogs/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [open, setIsOpen] = useState<boolean>(false);
  const { control } = useForm();

  const upazilas = [
    { label: "Dhanmondi", value: "dhanmondi" },
    { label: "Gulshan", value: "gulshan" },
    { label: "Mirpur", value: "mirpur" },
  ];

  return (
    <div className="p-20 space-y-10">
      <Button>Button</Button>

      <Card className="mt-10">
        <div>hell</div>
      </Card>

      <Button
        variant="secondary"
        className="bg-red-400 text-white px-4"
        size="md"
        onClick={() => setIsOpen(true)}
      >
        Open Dialog
      </Button>

      <Dialog open={open} onOpenChange={setIsOpen} size="sm" position="top">
        <div className="h-44">hell</div>
      </Dialog>

      <HookFormTextInput
        type="text"
        control={control}
        name="email"
        label="Enter Your Name"
      />

      <HookFormSingleSelect
        label="District of bangladesh *"
        name="dropdown"
        options={upazilas}
        control={control}
      />
    </div>
  );
};

export default Page;

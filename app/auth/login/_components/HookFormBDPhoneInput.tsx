import { HookFormTextInput } from "@/components/inputs/text-input";
import Image from "next/image";
import { Control, FieldValues, Path } from "react-hook-form";

export function HookFormBDPhoneInput<T extends FieldValues>({
  name,
  control,
  label = "Phone Number",
}: {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}) {
  return (
    <HookFormTextInput<T>
      name={name}
      control={control}
      type="tel"
      label={label}
      placeholder="1XXXXXXXXX"
      rules={{
        required: "Phone number is required",
        validate: (v) => {
          const digits = String(v ?? "").replace(/\D/g, "");
          return digits.length >= 10 ? true : "Enter a valid phone number";
        },
      }}
      startAdornment={
        <div className="flex items-center gap-2 text-sm text-gray">
          <span className="text-base">
            <Image
              src={"/images/bd-flag.png"}
              height={24}
              width={24}
              alt="bd-flag"
            />
          </span>
          <span className="font-medium">+880</span>
          <span className="h-5 w-px bg-gray-300 ml-2" />
        </div>
      }
      // optional: better mobile keyboard
      onChange={(v) => v}
      inputClassName="pl-24"
    />
  );
}

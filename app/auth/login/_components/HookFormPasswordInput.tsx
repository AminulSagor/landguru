import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";
import { HookFormTextInput } from "@/components/inputs/text-input";

export function HookFormPasswordInput<T extends FieldValues>({
  name,
  control,
  label = "Password",
}: {
  name: Path<T>;
  control: Control<T>;
  label?: string;
}) {
  const [show, setShow] = React.useState(false);

  return (
    <HookFormTextInput<T>
      name={name}
      control={control}
      type={show ? "text" : "password"}
      label={label}
      placeholder="Enter password"
      rules={{ required: "Password is required" }}
      endAdornment={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="text-gray-500 hover:text-gray-700"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}

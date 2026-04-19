export default function StatusSwitch({
  value,
  onChange,
  disabled = false,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!value)}
      className={[
        "relative h-5 w-10 rounded-full transition-all",
        value ? "bg-primary" : "bg-secondary border border-gray/20",
        disabled ? "cursor-not-allowed opacity-70" : "",
      ].join(" ")}
      aria-pressed={value}
    >
      <span
        className={[
          "absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
          value ? "left-5" : "left-0.5",
          "shadow-xs",
        ].join(" ")}
      />
    </button>
  );
}

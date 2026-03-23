import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function Tag({ label, className, onClick, active }: TagProps) {
  const base =
    "inline-flex items-center px-2 py-0.5 text-xs font-mono rounded border transition-colors duration-150";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          base,
          "cursor-pointer",
          active
            ? "bg-foreground text-background border-foreground"
            : "bg-tag-bg text-tag-fg border-tag-border hover:border-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      className={cn(base, "bg-tag-bg text-tag-fg border-tag-border", className)}
    >
      {label}
    </span>
  );
}

import type { ReactNode } from "react";

type RomanticButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
};

export function RomanticButton({
  children,
  onClick,
  variant = "primary",
  disabled = false
}: RomanticButtonProps) {
  return (
    <button
      className={`romantic-button ${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

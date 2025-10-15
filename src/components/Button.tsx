import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = PropsWithChildren<
  {
    variant?: ButtonVariant;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

const styles: Record<ButtonVariant, string> = {
  primary:
    "bg-water-blue text-water-ivory border border-water-black hover:translate-y-[-2px] transition-transform",
  ghost:
    "bg-water-ivory text-water-black border border-water-black hover:translate-y-[-2px] transition-transform"
};

const Button = ({ variant = "primary", children, className, ...props }: ButtonProps) => (
  <button
    className={clsx(
      "px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em]",
      styles[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;

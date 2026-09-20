import type { CSSProperties } from "react";

type PawIconProps = {
  className?: string;
  style?: CSSProperties;
};

export const PawIcon = ({ className = "w-5 h-5", style }: PawIconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <ellipse cx="6" cy="7.5" rx="2" ry="2.5" />
    <ellipse cx="10" cy="5.5" rx="1.7" ry="2.2" />
    <ellipse cx="14" cy="5.5" rx="1.7" ry="2.2" />
    <ellipse cx="18" cy="7.5" rx="2" ry="2.5" />
    <path d="M12 9.5c-3.5 0-6 2-6 5 0 2.5 2 4.5 6 4.5s6-2 6-4.5c0-3-2.5-5-6-5z" />
  </svg>
);
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="square"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.2 15.2 20.5 20.5" />
    </Svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.75 7.75h14.5l-1 13.5H5.75l-1-13.5Z" />
      <path d="M8.75 7.75V6a3.25 3.25 0 0 1 6.5 0v1.75" />
    </Svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 8.5h17M3.5 15.5h17" />
    </Svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 12h16.5M14.5 6.5 20 12l-5.5 5.5" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 12H4M9.5 6.5 4 12l5.5 5.5" />
    </Svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function ZoomIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="10.5" cy="10.5" r="6.25" />
      <path d="M15.2 15.2 20.5 20.5M10.5 8v5M8 10.5h5" />
    </Svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.75 6.75h11v9.5h-11zM13.75 10.25h4l3.5 3.25v2.75h-7.5" />
      <circle cx="6.5" cy="17.75" r="1.75" />
      <circle cx="17" cy="17.75" r="1.75" />
    </Svg>
  );
}

export function ReturnIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.5 5.5 4.5 9.5l4 4" />
      <path d="M4.5 9.5h10.25a4.75 4.75 0 0 1 0 9.5H9" />
    </Svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.75 10.75h12.5v9.5H5.75z" />
      <path d="M8.5 10.75V7.5a3.5 3.5 0 0 1 7 0v3.25" />
    </Svg>
  );
}

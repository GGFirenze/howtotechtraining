import Image from "next/image";

export type LogoProps = {
  className?: string;
  width?: number;
  priority?: boolean;
};

const ASPECT_RATIO = 477 / 150;

export function Logo({ className, width = 180, priority = false }: LogoProps) {
  const height = Math.round(width / ASPECT_RATIO);
  return (
    <Image
      src="/brand/logo.png"
      alt="CrackVILT"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export function LogoIcon({
  className,
  size = 32,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/icon.png"
      alt="CrackVILT"
      width={size}
      height={size}
      priority={priority}
      className={className}
    />
  );
}

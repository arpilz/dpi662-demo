import React from "react";
import clsx from "clsx";
import Image from "next/image";

export default function FormSelector({
  title,
  description,
  icon, // now accepts a string path to an SVG in /public
  href,
  onClick,
  className,
  selected = false,
  ...rest
}) {
  const Element = href ? "a" : "button";

  const iconNode = typeof icon === "string" ? (
    <Image
      src={icon}
      alt=""
      width={32}
      height={32}
      className="h-8 w-8"
    />
  ) : (
    icon
  );

  return (
    <Element
      href={href}
      type={href ? undefined : "button"}
      onClick={onClick}
      className={clsx(
        "flex items-center gap-4 p-4 md:p-5 w-full text-left rounded-xl transition shadow-sm border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "hover:border-blue-500 hover:bg-blue-50 hover:shadow-md hover:-translate-y-px",
        selected && "border-blue-500 bg-blue-50 shadow-md",
        className
      )}
      {...rest}
    >
      {/* Icon */}
      <div
        aria-hidden={icon ? "true" : undefined}
        className={clsx(
          "flex items-center justify-center h-12 w-12 rounded-lg shrink-0",
          selected ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
        )}
      >
        {iconNode}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-black!">{title}</h3>
        {description && <p className="text-sm text-black!">{description}</p>}
      </div>
    </Element>
  );
}

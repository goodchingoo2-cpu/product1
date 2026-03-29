"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link href={href} className={isActive ? "active" : ""}>
      {children}
    </Link>
  );
}

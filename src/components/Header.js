import Link from "next/link";
import { NavLink } from "@/components/NavLink";

export function Header() {
  return (
    <header className="topbar">
      <div className="container topbar-inner">
        <Link href="/" className="brand-mark">
          K Context Guide
          <span>K-content, explained clearly</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink href="/korean-lines">Korean Lines</NavLink>
          <NavLink href="/cultural-concepts">Cultural Concepts</NavLink>
          <NavLink href="/scene-meanings">Scene Meanings</NavLink>
          <NavLink href="/search">AI Search</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Contracts", href: "/contracts" },
    { label: "Shipyard", href: "/shipyard" },
    { label: "Asteroids", href: "/asteroids" },
    { label: "Sell", href: "/sell" },
  ];

  const currentPath = usePathname();

  return (
    <div className="flex items-center gap-5">
      {links.map((link) => (
        <Link
          href={link.href}
          className={`navbar-link hover:text-primary ${
            currentPath == link.href &&
            "cursor-default text-primary hover:text-primary/60"
          }`}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNavLinks;

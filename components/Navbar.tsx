"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/students', label: 'Students' },
    { href: '/teachers', label: 'Teachers' },
    { href: '/courses', label: 'Courses' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              School MS
            </Link>
          </div>
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.href
                    ? "bg-primary-foreground text-primary"
                    : "hover:bg-primary-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
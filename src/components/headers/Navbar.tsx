'use client';

import Link from "next/link";
import Logo from "../../../assets/logo.png";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { CreditCard} from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { dark} from "@clerk/themes";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme } = useTheme();
  return (
    <header className="shadown-lg bg-gray-300 dark:bg-gray-900">
      <div className="max-w-7xl p-3 flex items-center justify-between mx-auto gap-3">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="logo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">FreeCVResumes</span>
        </Link>
        <div className="flex items-center gap-3">
        <UserButton 
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
                elements: {
                    avatarBox: {
                        width: 30,
                    },
                },
            }}
        >
            <UserButton.MenuItems>
                <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard />}
                href="/billing"
                />
            </UserButton.MenuItems>
        </UserButton>
        <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

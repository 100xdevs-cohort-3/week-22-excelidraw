import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="py-6 fixed bottom-0 w-screen px-4 md:px-6 border-t border-gray-700 bg-white/10 z-10">
        <div className=" flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-white">
            © 2025 100xDraws. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6 sm:mt-0">
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/terms"
            >
              Terms of Service
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="/privacy"
            >
              Privacy
            </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="https://github.com/100xdevs-cohort-3/week-22-excelidraw"
            >
            <GithubIcon className="size-4"/>
                </Link>
            <Link
              className="text-sm hover:underline underline-offset-4"
              href="https://x.com/kirat_tw"
            >
            <TwitterIcon className="size-4"/>
                </Link>

          </nav>
        </div>
      </footer>
    </>
  );
}

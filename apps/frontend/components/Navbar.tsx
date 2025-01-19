import React from "react";
import Link from "next/link";
import { PenTool,Github } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background p-4 ">
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="flex text-blue-500 font-bold  text-2xl gap-2 font-mono">
          <PenTool className="h-8 w-8 " />
          <Link href="/" passHref>
            SimplyDraw
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 text-blue-500 font-mono gap-2">
          <Link href="/contact" passHref>
            Library
          </Link>
          <a
            href="https://github.com/100xdevs-cohort-3/week-22-excelidraw"
            className="text-muted-foreground hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

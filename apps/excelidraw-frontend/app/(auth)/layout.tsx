import { Button } from "@repo/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <Link className="absolute top-0 left-0 m-4  " href="/">
        {/* @ts-ignore */}
        <Button variant={"link"} className="text-gray-300 hover:text-custom-green-text transition-colors duration-500">
          <ChevronLeft />
          Go back to Home
        </Button>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;

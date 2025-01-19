import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";

export function SignUp({
    className,
    ...props
  }: React.ComponentPropsWithoutRef<"form">) {
    return (
      <form className={"flex flex-col gap-6"} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create a new account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your email below to create a new account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            {/* @ts-ignore */}
            <Label htmlFor="email">Email</Label>
            {/* @ts-ignore */}
  
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              {/* @ts-ignore */}
  
              <Label htmlFor="password">Password</Label>
            </div>
            {/* @ts-ignore */}
  
            <Input id="password" type="password" required />
          </div>
          {/* @ts-ignore */}
          <Button type="submit" className="w-full">
            Sign up
          </Button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline underline-offset-4 text-gray-300 hover:text-custom-green-text transition-colors duration-500">
            Sign In
          </Link>
        </div>
      </form>
    );
  }
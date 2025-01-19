"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import Link from "next/link";
import {CreateUserSchema , SigninSchema} from "@repo/common/types"
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setTokenCookie } from "@/lib/cookie";
import { BCK_API } from "@/config";


export default function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  
  const handleSignupSubmit = async(e: FormEvent) => {
    e.preventDefault();
    const checkLoginConstraints = CreateUserSchema.safeParse({username , email , password});
    if (!checkLoginConstraints.success) {
        toast.error(checkLoginConstraints.error.issues[0].message, {
            position: "bottom-right",
            duration: 3000,
          });
        return;
    }
    try {
        const res = await axios.post(`${BCK_API}/signup` , {username , email , password});
        if(res.data.success){
            toast.success(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            });
            router.push("/signin");
        }
        else{
            toast.error(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            })
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error("Internal server Error" + error, {
            position: "bottom-right",
            duration: 3000,
        })
    }
  };

  const handleLoginSubmit = async(e: FormEvent) => {
    e.preventDefault();
    const checkLoginConstraints = SigninSchema.safeParse({email, password});
    if (!checkLoginConstraints.success) {
        toast.error(checkLoginConstraints.error.issues[0].message, {
            position: "bottom-right",
            duration: 3000,
          });
        return;
    }
    try {
        const res = await axios.post(`${BCK_API}/signin` , {email , password});
        if(res.data.success){
            toast.success(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            });
            await setTokenCookie(res.data.token);
            router.push("/create-room");
        }
        else{
            toast.error(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            })
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast.error("Internal server Error" + error, {
            position: "bottom-right",
            duration: 3000,
        })
    }
  };
  
  return (
    <section className="px-4 relative overflow-hidden min-w-full">
      {/* Gradient Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 dark:opacity-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <Link href="/" className="flex items-center justify-center space-x-2">
            <Pencil className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">Draw-Meetings</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {isSignin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{" "}
            {isSignin ? (
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                create a new account
              </Link>
            ) : (
              <Link
                href="/signin"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login to an exisiting account
              </Link>
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-8 sm:mx-auto sm:w-full sm:max-w-md"
        >
          <div className="bg-white dark:bg-gray-900 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-3" onSubmit={isSignin ? handleLoginSubmit : handleSignupSubmit}>
              {!isSignin && (
                <div>
                  <Label htmlFor="username">Username</Label>
                  <div className="">
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                      }
                      className="dark:border-white/30 border-black/30"
                    />
                  </div>
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="">
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    className="dark:border-white/30 border-black/30"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    className="dark:border-white/30 border-black/30"
                  />
                </div>
              </div>

              {isSignin && (
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full dark:bg-black text-white bg-gray-800">
                {isSignin ? "Sign in" : "Sign up"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



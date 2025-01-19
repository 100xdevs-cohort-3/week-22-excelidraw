"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isSignin ? "/auth/signin" : "/auth/signup";
    const payload = {
      email: formData.email,
      password: formData.password,
      ...(isSignin ? {} : { name: formData.name }),
    };

    console.log("payload", payload);
    try {
      const URL = "http://localhost:3001" + endpoint;
      console.log("url", URL);
      const response = await axios.post(URL, payload);
      console.log("response", response);
      if (response.status === 201 || response.status === 200) {
        if (isSignin) {
          localStorage.setItem("token", response.data.token);
          router.push("/");
        } else {
          router.push("/signin");
        }
      }
    } catch (err: any) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="min-h-screen bg-background flex justify-center items-center">
      <Card
        className="w-full max-w-md p-6 border-primary "
        title={isSignin ? "Sign In" : "Sign Up"}
      >
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
            />
          </div>

          {!isSignin && (
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-muted-foreground rounded focus:outline-none focus:ring-2 focus:ring-primary text-black"
              />
            </div>
          )}

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full h-12 px-6 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignin ? "Sign In" : "Sign Up"}
              <Pencil className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="mt-4 text-center text-muted-foreground">
          {isSignin ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/signup")}
                className="text-primary hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => router.push("/signin")}
                className="text-primary hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}

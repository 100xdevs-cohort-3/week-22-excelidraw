import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import {
  Share2,
  Users2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-background font-mono">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
              Collaborative Whiteboarding
              <span className="text-primary block">Made Simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Create, collaborate, and share beautiful diagrams and sketches
              with our intuitive drawing tool. No sign-up required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={"/signin"}>
                <Button variant={"primary"} size="lg" className="h-12 px-6 rounded-2xl text-white">
                  Sign in
                  {/* <Pencil className="ml-2 h-4 w-4" /> */}
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="h-12 px-6 rounded-2xl border-gray-300">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-18 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8  ">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 ">
            <Card className="p-6 border-2 hover:border-primary transition-colors rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <div className="text-xl font-semibold">
                  Real-time Collaboration
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                Work together with your team in real-time. Share your drawings
                instantly with a simple link.
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-primary transition-colors rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Multiple users can edit the same canvas simultaneously. See
                who&apos;s drawing what in real-time.
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-primary transition-colors rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Drawing</h3>
              </div>
              <p className="mt-4 text-muted-foreground">
                Intelligent shape recognition and drawing assistance helps you
                create perfect diagrams.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 sm:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to start creating?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                Join thousands of users who are already creating amazing
                diagrams and sketches.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >                  Open Canvas
                  </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  View Gallery
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center mx-auto">
              © 2024 Excalidraw Clone. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

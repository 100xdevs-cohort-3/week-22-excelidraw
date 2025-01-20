"use client"
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">
                                    Collaborate and create
                                </span>{" "}
                                <span className="block text-indigo-600 xl:inline">
                                    with excalidraw
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-400 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                Unleash your creativity with our intuitive
                                whiteboard tool. Sketch, brainstorm, and
                                collaborate in real-time with your team, no
                                matter where you are.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href="/signin"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                                    >
                                        Get started
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <Link
                                        href="#"
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                    >
                                        Live demo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-white dark:bg-gray-900">
                <Image
                    className="h-56 w-full block dark:hidden object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://res.cloudinary.com/dwnapxhev/image/upload/v1737348443/Excalidraw_Live_Presentation_bihmed.png"
                    alt="Excalidraw Whiteboard"
                    layout="responsive"
                    width={800}
                    height={600}
                />
                <Image 
                    className="h-56 w-full hidden dark:block object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="https://i.ibb.co/ssw377M/darkmodehero.png"
                    alt="Excalidraw Whiteboard"
                    layout="responsive"
                    width={800}
                    height={600}
                />
            </div>
        </div>
    );
}

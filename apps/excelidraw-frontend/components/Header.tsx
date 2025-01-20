import Link from 'next/link'
import { PencilRuler } from 'lucide-react'

import { DarkModeToggle } from '@/components/DarkModeToggle'

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">excalidraw</span>
              <PencilRuler className="h-8 w-auto text-indigo-600" />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="#features" className="text-base font-medium dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400">
                Features
              </Link>
              <Link href="#how-it-works" className="text-base font-medium dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400">
                How It Works
              </Link>
              <Link href="#pricing" className="text-base font-medium dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400">
                Pricing
              </Link>
              <Link href="/canvas" className="text-base font-medium dark:text-gray-300 hover:text-indigo-700 dark:hover:text-indigo-400">
                Canvas
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <DarkModeToggle />
            <Link href="/signin" className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75">
              Sign in
            </Link>
            <Link href="/signup" className="inline-block bg-white dark:bg-gray-800 py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700">
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}


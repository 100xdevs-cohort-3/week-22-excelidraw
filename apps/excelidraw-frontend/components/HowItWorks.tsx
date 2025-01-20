import { CheckCircle } from 'lucide-react'
import Image from "next/image";
const steps = [
  { name: 'Create a board', description: 'Start with a blank canvas or choose from our templates.' },
  { name: 'Invite your team', description: 'Share a link and collaborate in real-time with your team.' },
  { name: 'Sketch and ideate', description: 'Use our intuitive tools to bring your ideas to life.' },
  { name: 'Export and share', description: 'Save your work as an image or share a live link with stakeholders.' },
]

export default function HowItWorks() {
  return (
    <div className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden lg:py-24" id="how-it-works">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            How excalidraw Works
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500 dark:text-gray-400">
            Get started with excalidraw in just a few simple steps.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              Start collaborating in minutes
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              excalidraw is designed to be intuitive and easy to use. Follow these simple steps to get started with your team.
            </p>

            <dl className="mt-10 space-y-10">
              {steps.map((step) => (
                <div key={step.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <CheckCircle className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">{step.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-400">{step.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto"
              width={490}
              height={490}
              src="https://res.cloudinary.com/dwnapxhev/image/upload/v1737349141/community_hero_image_afxlos.svg"
              alt="How excalidraw Works"
            />
          </div>
        </div>
      </div>
    </div>
  )
}


import { Check, Shield } from 'lucide-react'

const tiers = [
  {
    name: 'Hobby',
    href: '#',
    priceMonthly: 0,
    description: 'Perfect for individuals and small teams just getting started.',
    includedFeatures: ['5 whiteboards', 'Up to 3 team members', 'Basic shapes and tools', '1GB storage'],
  },
  {
    name: 'Freelancer',
    href: '#',
    priceMonthly: 24,
    description: 'Great for freelancers and growing teams with more needs.',
    includedFeatures: [
      'Unlimited whiteboards',
      'Up to 10 team members',
      'Advanced shapes and tools',
      '10GB storage',
      'Priority support',
    ],
  },
  {
    name: 'Startup',
    href: '#',
    priceMonthly: 32,
    description: 'For larger teams and organizations with advanced requirements.',
    includedFeatures: [
      'Unlimited whiteboards',
      'Unlimited team members',
      'Advanced shapes and tools',
      '100GB storage',
      'Priority support',
      'Custom templates',
      'Admin controls',
    ],
  },
]

export default function Pricing() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900" id="pricing">
      <div className="pt-12 sm:pt-16 lg:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl lg:text-5xl">Plans for teams of all sizes</h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              Choose an affordable plan that's packed with the best features for your needs.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-100 dark:bg-gray-900" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {tiers.map((tier) => (
                <div key={tier.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-950 border border-gray-400/30">
                  <div className="px-6 py-8 sm:p-10 sm:pb-6 flex-grow">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl">{tier.name}</h3>
                    <p className="mt-4 text-base text-gray-500 dark:text-gray-400">{tier.description}</p>
                    <p className="mt-8">
                      <span className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">${tier.priceMonthly}</span>{' '}
                      <span className="text-base font-medium text-gray-500 dark:text-gray-400">/mo</span>
                    </p>
                    <ul role="list" className="mt-6 space-y-4">
                      {tier.includedFeatures.map((feature) => (
                        <li key={feature} className="flex items-start">
                          <div className="flex-shrink-0">
                            <Check className="h-5 w-5 text-indigo-500" aria-hidden="true" />
                          </div>
                          <p className="ml-3 text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-6 pt-6 pb-8 sm:px-10 sm:pt-6 sm:pb-8 bg-white dark:bg-gray-950">
                    <a
                      href={tier.href}
                      className="block w-full bg-indigo-600 border border-gray-800 dark:border-gray-900 rounded-md py-2 text-md font-semibold text-white text-center hover:bg-gray-900 dark:hover:bg-gray-800"
                    >
                      Buy {tier.name}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


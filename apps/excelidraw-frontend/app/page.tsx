"use client";
import { motion } from 'framer-motion';
import { Button } from '@repo/ui/button';
import {
  Users,
  Pencil,
  Share2,
  CheckCircle,
  Star,
} from 'lucide-react';
import { Testimonials } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Gradient Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='-mt-16'
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Collaborate & Create in Real-Time
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Transform your meetings with interactive drawing sessions. Share
              ideas, explain concepts, and brainstorm together in a virtual
              workspace that brings your team closer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={"/create-room"}>
                <Button  className="bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-300 dark:text-white text-blue-100">
                  Start Drawing Now
                </Button>
              </Link>
              <Link href={"/create-room"}>
              <Button className='dark:border-white/30 border-black/30 hover:bg-white dark:hover:bg-gray-900  dark:bg-black bg-white/30 relative text-black dark:text-white hover:text-blue-600  px-3 py-2'>
                Join Room
              </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl bg-white dark:bg-gray-900 p-8 shadow-xl">
              <Image
              width={500}
              height={500}
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
                alt="Collaborative Drawing"
                className="rounded-lg object-cover w-full h-full"
                loading='lazy'
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose Draw-Meetings?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the power of visual collaboration with our unique features
              designed to make your meetings more productive and engaging.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: 'Real-Time Collaboration',
                description:
                  'Work together seamlessly with team members, no matter where they are.',
              },
              {
                icon: <Pencil className="h-8 w-8 text-blue-600" />,
                title: 'Intuitive Drawing Tools',
                description:
                  'Easy-to-use tools that make explaining your ideas a breeze.',
              },
              {
                icon: <Share2 className="h-8 w-8 text-blue-600" />,
                title: 'Instant Sharing',
                description:
                  'Share your drawings and ideas with just one click.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {"Choose the perfect plan for your team's needs"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                price: '$0',
                features: ['Up to 3 users', 'Basic drawing tools', '5 rooms'],
              },
              {
                name: 'Pro',
                price: '$19',
                features: [
                  'Up to 10 users',
                  'Advanced drawing tools',
                  'Unlimited rooms',
                  'Priority support',
                ],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: [
                  'Unlimited users',
                  'Custom features',
                  'Dedicated support',
                  'API access',
                ],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`p-8 rounded-2xl ${
                  plan.popular
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-900'
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">{plan.price}</div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full dark:border-white/30 border-black/30 hover:bg-white dark:hover:bg-gray-900  dark:bg-black bg-white relative text-black dark:text-white hover:text-blue-600 ${
                    plan.popular ? 'bg-white hover:bg-white/70 text-blue-600' : ''
                  }`}
                  
                >
                  Get Started
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {"Don't just take our word for it"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {Testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  {testimonial.content}
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Pencil className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-xl">Draw-Meetings</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Making remote collaboration more engaging and productive.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Privacy</li>
                <li>Terms</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="border-t dark:border-gray-800 mt-12 pt-8 text-center text-gray-600 dark:text-gray-400">
            © 2024 Draw-Meetings. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
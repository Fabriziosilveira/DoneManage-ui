/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3, Layers, Users, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Component() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  }

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
        <div className="w-full max-w-6xl flex justify-between items-center">
          <Link className="flex items-center justify-center" href="#">
            <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-gray-100">DoneManage</span>
          </Link>
          <nav className="flex gap-4 sm:gap-6">
            <Button variant="ghost" asChild>
              <Link href="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#pricing">Pricing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>  
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-custom-black">
        
          <motion.div 
            className="container px-4 md:px-6 mx-auto max-w-6xl"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
              <motion.div 
                className="flex flex-col items-center space-y-4 text-center"
                variants={fadeInUp}
              >
                <motion.h1 
                  className="text-3xl font-bold text-custom-white tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
                  variants={fadeInUp}
                  
                >
                  Streamline Your Business with
                  <span className="text-blue-600 dark:text-blue-400"> DoneManage</span>
                </motion.h1>
                <motion.p 
                  className="mx-auto max-w-[700px] text-gray-200 md:text-xl dark:text-gray-400"
                  variants={fadeInUp}
                >
                  Boost productivity, reduce costs, and make data-driven decisions with our comprehensive ERP solution.
                </motion.p>
                <motion.div 
                  className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
                  variants={fadeInUp}
                >
                  <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                    <Link href="/signup" className="flex items-center">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#demo">Watch Demo</Link>
                  </Button>
                </motion.div>
              </motion.div>
          </motion.div> 
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <motion.div 
            className="container px-4 md:px-6 mx-auto max-w-6xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              Key Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                <BarChart3 className="h-12 w-12 mb-4 text-zinc-500 dark:text-blue-400" />
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-gray-500 dark:text-gray-400">Gain actionable insights with real-time data visualization and predictive analytics.</p>
              </motion.div>
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                <Users className="h-12 w-12 mb-4 text-zinc-500 dark:text-blue-400" />
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-gray-500 dark:text-gray-400">Enhance communication and workflow across departments with integrated tools.</p>
              </motion.div>
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeInUp}
              >
                <Layers className="h-12 w-12 mb-4 text-zinc-500 dark:text-zinc-400" />
                <h3 className="text-xl font-bold mb-2">Modular Design</h3>
                <p className="text-gray-500 dark:text-gray-400">Customize your ERP with scalable modules that grow with your business needs.</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
        {/* <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-custom-black dark:bg-gray-900">
         
        </section> */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div 
            className="container px-4 md:px-6 mx-auto max-w-6xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12"
              variants={fadeInUp}
            >
              Flexible Pricing for Every Business
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <motion.div 
                className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-4 text-center">Starter</h3>
                <p className="text-4xl font-bold mb-4 text-center">$99<span className="text-base font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Core ERP features</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Up to 5 users</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic reporting</span>
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </motion.div>
              <motion.div 
                className="flex flex-col p-6 bg-blue-600 text-white rounded-lg shadow-lg"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-4 text-center">Professional</h3>
                <p className="text-4xl font-bold mb-4 text-center">$299<span className="text-base font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span>All Starter features</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span>Up to 20 users</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-white mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="mt-auto bg-white text-blue-600 hover:bg-gray-100">Get Started</Button>
              </motion.div>
              <motion.div 
                className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                variants={fadeInUp}
              >
                <h3 className="text-2xl font-bold mb-4 text-center">Enterprise</h3>
                <p className="text-4xl font-bold mb-4 text-center">Custom</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>All Professional features</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited users</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Custom integrations</span>
                  </li>
                  <li className="flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
                <Button className="mt-auto">Contact Sales</Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-custom-black text-white">
          <motion.div 
            className="container px-4 md:px-6 mx-auto max-w-6xl"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div 
              className="flex flex-col items-center space-y-4 text-center"
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                variants={fadeInUp}
              >
                Ready to Transform Your Business?
              </motion.h2>
              <motion.p 
                className="mx-auto  max-w-[600px] text-blue-100 md:text-xl"
                variants={fadeInUp}
              >
                Join thousands of companies already using our ERP system to drive growth and efficiency.
              </motion.p>
              <motion.div 
                className="w-full max-w-sm space-y-2"
                variants={fadeInUp}
              >
                <form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input type="email" placeholder="Enter your email" className="bg-white/10 text-white placeholder-custom-blackLine border-white/20 focus:border-white" />
                  <Button type="submit" className="bg-white text-custom-black hover:bg-zinc-300">Get Started</Button>
                </form>
                <p className="text-xs text-blue-200">
                  By signing up, you agree to our{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-white">
                    Terms & Conditions
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-lg font-semibold">DoneManage</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm hover:underline underline-offset-4" href="#">
              Contact Us
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Facebook">
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link href="#" aria-label="Twitter">
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </Link>
            <Link href="#" aria-label="GitHub">
              <svg
                className="h-5 w-5 text-gray-600 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
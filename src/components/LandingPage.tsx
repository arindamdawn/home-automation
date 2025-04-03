import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Home, Shield, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-10 w-10 text-indigo-500" />,
      title: "Enhanced Security",
      description:
        "Keep your home safe with advanced motion and presence detection sensors.",
    },
    {
      icon: <Zap className="h-10 w-10 text-indigo-500" />,
      title: "Energy Efficiency",
      description:
        "Smart controls help reduce energy consumption and lower your utility bills.",
    },
    {
      icon: <Home className="h-10 w-10 text-indigo-500" />,
      title: "Complete Control",
      description:
        "Manage your entire home from anywhere with our intuitive mobile app.",
    },
  ];

  const testimonials = [
    {
      quote:
        "The configuration process was so simple, and the system works flawlessly!",
      author: "Rahul M., Bangalore",
    },
    {
      quote:
        "I've reduced my electricity bill by 30% since installing this system.",
      author: "Priya S., Mumbai",
    },
    {
      quote:
        "The customer support team was incredibly helpful throughout the setup process.",
      author: "Vikram J., Delhi",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                Transform Your Home with Smart Automation
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl">
                Create a personalized, efficient, and secure living environment
                with our premium home automation solutions.
              </p>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg"
                  onClick={() => navigate("/configure")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80"
                alt="Smart Home"
                className="rounded-xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Premium Features for Modern Living
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our smart home solutions combine cutting-edge technology with
              intuitive design for seamless integration into your lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-white to-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-indigo-100 p-3 rounded-full w-fit mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1585503418537-88331351ad99?w=800&q=80"
                alt="Smart Home Control"
                className="rounded-xl shadow-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 md:order-2"
            >
              <h2 className="text-3xl font-bold text-gray-900">
                Why Choose Our Smart Home Solutions?
              </h2>
              <div className="space-y-4">
                {[
                  "Customizable to your specific needs and preferences",
                  "Energy-efficient systems that reduce utility costs",
                  "Enhanced security features for peace of mind",
                  "Seamless integration with existing home systems",
                  "Professional installation and ongoing support",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-green-100 rounded-full p-1 mt-1">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white mt-4"
                onClick={() => navigate("/configure")}
              >
                Configure Your System
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-md"
              >
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-gray-900 font-medium">
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Start your journey to a smarter, more efficient home today with our
            easy-to-use configuration wizard.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 text-lg rounded-lg"
            onClick={() => navigate("/configure")}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Home Solutions</h3>
              <p className="text-gray-400">
                Transforming homes across India with cutting-edge automation
                technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Sensors</li>
                <li>Controllers</li>
                <li>Smart Switches</li>
                <li>LED Systems</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@smarthome.in</li>
                <li>+91 98765 43210</li>
                <li>Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Smart Home Solutions. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

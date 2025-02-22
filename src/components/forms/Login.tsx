// app/login/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiMail, HiLockClosed, HiArrowLeft } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/auth";
import { useRouter } from "next/navigation";

const sliderImages = [
  "/images/mental-health-1.jpg",
  "/images/mental-health-2.jpg",
  "/images/mental-health-3.jpg",
];

// components/LoginHeader.tsx
const LoginHeader = () => (
  <header className="absolute top-0 left-0 right-0 bg-white z-50 px-4 py-3 md:px-6 border-b">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center space-x-2 text-gray-600 hover:text-primary-blue transition-colors duration-300"
      >
        <HiArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </Link>
      <Link
        href="/"
        className="text-xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent"
      >
        Solvana
      </Link>
    </div>
  </header>
);

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      await login(response.token, response.user);
      
      // Redirect based on user role
      if (response.user.role === 'ADMIN') {
        router.push('/admin/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      <LoginHeader />
      <main className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Section */}
        <div className="lg:w-1/2 relative h-[40vh] lg:h-screen bg-gradient-to-r from-primary-blue to-primary-purple">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white z-10"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
              Welcome to Solvana
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-4 md:mb-8">
              Your journey to better mental health starts here
            </p>
          </motion.div>
          {/* Image Slider */}
          {sliderImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentImage === index ? 1 : 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          ))}
          {/* Slider Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {sliderImages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                  currentImage === index ? "w-4 bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex-1 flex items-center justify-center p-6 sm:p-8 bg-[#F5F5F5]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-6"
          >
            {/* Form content remains the same but with adjusted spacing */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
                Sign in to your account
              </h2>

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg m-4">
                  {error}
                </div>
              )}
              <p className="mt-2 text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-primary-blue hover:text-primary-purple transition-colors duration-300"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Form fields and buttons remain the same but with adjusted padding and margins */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiLockClosed className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all duration-300 bg-white text-gray-900 placeholder-gray-500"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-primary-blue hover:text-primary-purple transition-colors duration-300"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-blue to-primary-purple hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue transition-all duration-300 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>

            <div className="mt-4 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#F5F5F5] text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  Google
                </button>
                <button className="w-full inline-flex justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  Facebook
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

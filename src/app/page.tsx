// app/layout.tsx
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Homepage from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Faq from '@/components/home/Faq';
import Testimonials from '@/components/home/Testimonial';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <Features />
      <Faq />
      <Testimonials />
      <Footer />
    </div>
  );
}
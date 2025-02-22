
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScanningAI from '@/components/chatbot/ScanningAI';

export default function Chatbot() {
  return (
    <div>
        <Navbar />
        <ScanningAI />
        <Footer />
    </div>
  );
}

import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import Taleai from '@/components/chatbot/ChatBot'

export default function Chatbot() {
  return (
    <div>
        <Navbar />
        <Taleai />
        <Footer />
    </div>
  );
}
import Navbar from './Navbar';
import Footer from './Footer';

interface GameLayoutProps {
  children: React.ReactNode;
  seoTitle: string;
  seoContent: React.ReactNode;
}

export default function GameLayout({ children, seoTitle, seoContent }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Game Area */}
      <div className="flex-1 m-6">
        {children}
      </div>

      {/* SEO Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {seoTitle}
          </h2>
          <div className="text-black text-lg space-y-4">
            {seoContent}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Vedseem</h3>
            <p className="text-gray-400 mb-4">
              Transforming ideas into future-ready IT solutions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">IT Consulting</li>
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Cloud Solutions</li>
              <li className="text-gray-400">UI/UX Design</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center gap-2">
            Copyright © {currentYear} Vedseem
          </p>
        </div>
      </div>
    </footer>
  );
}

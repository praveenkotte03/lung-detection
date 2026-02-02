
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">PulmoScan AI</span>
            </div>
            <p className="text-sm max-w-xs">
              Empowering early detection through AI-driven insights and comprehensive medical risk profiling.
            </p>
          </div>

          <div className="text-sm text-center md:text-right">
            <p className="mb-2">© 2024 PulmoScan AI Health Systems</p>
            <p className="italic text-xs text-slate-500">
              Not a medical device. Intended for educational purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

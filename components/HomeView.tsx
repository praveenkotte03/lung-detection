
import React from 'react';
import { ViewType } from '../types';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
          Intelligent Lung Health <span className="text-blue-600">Assistance</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Harnessing advanced AI to assist in early detection screening, risk profiling, and educational medical insights for lung health.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => onNavigate('analyze')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            Start Scan Analysis
          </button>
          <button 
            onClick={() => onNavigate('risk')}
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            Check Your Risk
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<ScanIcon />}
          title="AI Scan Analysis"
          description="Upload CT scans or Chest X-rays for instant AI-assisted preliminary evaluation."
          onClick={() => onNavigate('analyze')}
        />
        <FeatureCard 
          icon={<RiskIcon />}
          title="Personal Risk Profiler"
          description="A comprehensive assessment based on lifestyle, history, and medical symptoms."
          onClick={() => onNavigate('risk')}
        />
        <FeatureCard 
          icon={<InfoIcon />}
          title="Medical Insights"
          description="Explore our grounded knowledge base for the latest in lung cancer research."
          onClick={() => onNavigate('info')}
        />
      </div>

      <div className="mt-20 p-8 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
        <div className="text-amber-500 mt-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 className="text-amber-900 font-bold mb-1">Medical Disclaimer</h4>
          <p className="text-amber-800 text-sm leading-relaxed">
            PulmoScan AI is an educational screening tool and does not provide clinical diagnoses. AI analysis may produce false positives or false negatives. Always consult a board-certified oncologist or radiologist for official medical interpretation of scans and symptoms.
          </p>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
  >
    <div className="mb-6 transition-transform group-hover:scale-110">{icon}</div>
    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ScanIcon = () => (
  <div className="bg-blue-100 text-blue-600 p-4 rounded-xl inline-block">
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
    </svg>
  </div>
);

const RiskIcon = () => (
  <div className="bg-rose-100 text-rose-600 p-4 rounded-xl inline-block">
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  </div>
);

const InfoIcon = () => (
  <div className="bg-emerald-100 text-emerald-600 p-4 rounded-xl inline-block">
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  </div>
);

export default HomeView;

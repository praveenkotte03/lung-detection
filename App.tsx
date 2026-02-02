
import React, { useState } from 'react';
import { ViewType } from './types';
import HomeView from './components/HomeView';
import AnalyzeView from './components/AnalyzeView';
import RiskAssessmentView from './components/RiskAssessmentView';
import InfoView from './components/InfoView';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} />;
      case 'analyze':
        return <AnalyzeView />;
      case 'risk':
        return <RiskAssessmentView />;
      case 'info':
        return <InfoView />;
      default:
        return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

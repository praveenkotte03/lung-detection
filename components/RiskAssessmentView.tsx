
import React, { useState } from 'react';
import { assessRisk } from '../geminiService';
import { RiskAssessmentData } from '../types';

const RiskAssessmentView: React.FC = () => {
  const [formData, setFormData] = useState<RiskAssessmentData>({
    age: 45,
    smokingStatus: 'never',
    packYears: 0,
    familyHistory: false,
    symptoms: [],
    occupationalHazards: []
  });

  const [loading, setLoading] = useState(false);
  const [assessment, setAssessment] = useState<string | null>(null);

  const symptomOptions = [
    "Persistent cough", "Shortness of breath", "Chest pain", 
    "Coughing up blood", "Hoarseness", "Weight loss", "Fatigue"
  ];

  const hazardOptions = [
    "Asbestos", "Radon gas", "Diesel exhaust", "Arsenic", "Silica", "Coal smoke"
  ];

  const toggleList = (field: 'symptoms' | 'occupationalHazards', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item) 
        ? prev[field].filter(i => i !== item) 
        : [...prev[field], item]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await assessRisk(formData);
      setAssessment(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      {!assessment ? (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-800">Risk Profiler</h2>
            <p className="text-slate-600">Complete the form to receive a personalized AI health assessment.</p>
          </div>

          <div className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Smoking Status</label>
                <select 
                  value={formData.smokingStatus}
                  onChange={(e) => setFormData({...formData, smokingStatus: e.target.value as any})}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                >
                  <option value="never">Never Smoked</option>
                  <option value="former">Former Smoker</option>
                  <option value="current">Current Smoker</option>
                </select>
              </div>
            </div>

            {formData.smokingStatus !== 'never' && (
              <div className="animate-slideIn">
                <label className="block text-sm font-medium text-slate-700 mb-2">Pack Years (Packs per day × Years smoked)</label>
                <input 
                  type="number" 
                  value={formData.packYears}
                  onChange={(e) => setFormData({...formData, packYears: parseInt(e.target.value)})}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 20"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Reported Symptoms</label>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleList('symptoms', s)}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      formData.symptoms.includes(s) 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Environmental/Occupational Hazards</label>
              <div className="flex flex-wrap gap-2">
                {hazardOptions.map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => toggleList('occupationalHazards', h)}
                    className={`px-4 py-2 rounded-full text-sm transition-all border ${
                      formData.occupationalHazards.includes(h) 
                        ? 'bg-amber-600 text-white border-amber-600' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <input 
                type="checkbox" 
                id="familyHistory"
                checked={formData.familyHistory}
                onChange={(e) => setFormData({...formData, familyHistory: e.target.checked})}
                className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="familyHistory" className="text-sm text-slate-700 font-medium">Family history of lung cancer</label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Calculating Risk...
                </>
              ) : (
                'Generate Assessment'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fadeIn">
           <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Your Assessment</h2>
            <button 
                onClick={() => setAssessment(null)}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
                Edit Details
            </button>
          </div>
          <div className="p-8">
            <div className="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-headings:text-slate-900 prose-headings:font-bold">
              {assessment.split('\n').map((para, i) => (
                <p key={i} className="mb-4 whitespace-pre-wrap">{para}</p>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
              <div className="text-blue-600 mt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-blue-900">
                <h4 className="font-bold mb-1">What to do next?</h4>
                <p>If you have high-risk factors or persistent symptoms, please consult a pulmonologist immediately. Low-Dose CT (LDCT) screening is recommended for certain age and smoking history groups.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentView;

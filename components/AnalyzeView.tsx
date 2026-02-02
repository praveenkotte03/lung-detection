
import React, { useState } from 'react';
import { analyzeLungScan } from '../geminiService';
import { AnalysisResult } from '../types';

const AnalyzeView: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setLoading(true);
    setError(null);
    try {
      const base64 = preview.split(',')[1];
      const data = await analyzeLungScan(base64);
      setResult(data);
    } catch (err) {
      setError("Analysis failed. Please try again with a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-800">Scan Analysis</h2>
          <p className="text-slate-600">Upload a chest X-ray or CT scan image for AI evaluation.</p>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">Select Image</label>
            <div className={`relative border-2 border-dashed rounded-xl p-8 transition-colors flex flex-col items-center justify-center ${preview ? 'border-blue-300 bg-blue-50' : 'border-slate-300 hover:border-slate-400'}`}>
              {!preview ? (
                <>
                  <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-slate-500 mb-4">Drag and drop or click to upload</p>
                  <input 
                    type="file" 
                    onChange={handleFileChange} 
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button className="bg-white border border-slate-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors pointer-events-none">
                    Browse Files
                  </button>
                </>
              ) : (
                <div className="w-full relative">
                  <img src={preview} alt="Preview" className="max-h-96 w-full object-contain rounded-lg mx-auto" />
                  <button 
                    onClick={() => { setPreview(null); setFile(null); setResult(null); }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l18 18" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {preview && !result && !loading && (
            <button 
              onClick={handleAnalyze}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Start Analysis
            </button>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p className="text-slate-600 font-medium">Processing scan images with AI vision...</p>
              <p className="text-slate-400 text-sm mt-2">This may take up to 20 seconds.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-red-700 flex items-center gap-3">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6 mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-fadeIn">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Summary</h3>
                <p className="text-slate-700 leading-relaxed">{result.summary}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-3">Key Findings</h4>
                  <ul className="space-y-2">
                    {result.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                        <span className="text-blue-500 mt-1">●</span>
                        {finding}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                        <span className="text-emerald-500 mt-1">✓</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200 italic text-xs text-slate-500">
                <strong>Model Note:</strong> {result.disclaimer}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyzeView;

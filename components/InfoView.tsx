
import React, { useState, useEffect } from 'react';
import { getLungCancerInfo } from '../geminiService';

const InfoView: React.FC = () => {
  const [query, setQuery] = useState('Lung cancer early symptoms and screening guidelines');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{text: string, sources: any[]} | null>(null);

  const topics = [
    "Early symptoms",
    "Screening guidelines",
    "Immunotherapy advances",
    "Stage IV treatments",
    "Smoking vs Genetic factors"
  ];

  const fetchData = async (q: string) => {
    setLoading(true);
    setQuery(q);
    try {
      const result = await getLungCancerInfo(q);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid lg:grid-cols-4 gap-8 animate-fadeIn">
      <div className="lg:col-span-1 space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest px-2">Common Topics</h3>
        <div className="space-y-1">
          {topics.map(t => (
            <button
              key={t}
              onClick={() => fetchData(t)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                query === t ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-h-[500px]">
          <div className="p-8 border-b border-slate-100 flex items-center justify-between gap-4">
            <div className="flex-grow">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchData(query)}
                placeholder="Ask about lung health..."
                className="w-full bg-slate-100 border-none rounded-xl px-4 py-3 text-slate-800 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <button 
              onClick={() => fetchData(query)}
              className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-32 bg-slate-100 rounded-xl mt-8"></div>
              </div>
            ) : data ? (
              <div className="animate-fadeIn">
                <div className="prose prose-slate max-w-none">
                  {data.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-4 text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>

                {data.sources.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-slate-500 uppercase mb-4">Sources & Links</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {data.sources.map((src, i) => {
                        const info = src.web || src.maps;
                        if (!info) return null;
                        return (
                          <a 
                            key={i} 
                            href={info.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors truncate block"
                          >
                            {info.title || info.uri}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                Enter a query to explore the lung cancer knowledge base.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoView;

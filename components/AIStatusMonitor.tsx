import React, { useEffect, useState } from 'react';
import { Sparkles, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card } from './ui/UIComponents';
import { Tenant, Payment, UserRole } from '../types';
import { generateAIResponse } from '../services/geminiService';

interface AIStatusMonitorProps {
  tenant: Tenant;
  payments: Payment[];
}

export const AIStatusMonitor: React.FC<AIStatusMonitorProps> = ({ tenant, payments }) => {
  const [insight, setInsight] = useState<string>("Analyzing your rental health...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      setLoading(true);
      const prompt = `
        Analyze this tenant's status.
        Credit Score: ${tenant.creditScore}.
        Last Payment: ${payments[0]?.date} (${payments[0]?.isLate ? 'Late' : 'On Time'}).
        Payments Count: ${payments.length}.
        
        Write a short 2-sentence summary addressing the tenant directly.
        Sentence 1: Comment on their current standing/score.
        Sentence 2: Give a specific financial tip or warning about the next due date.
        Use a professional but encouraging tone.
      `;
      
      const response = await generateAIResponse(prompt, UserRole.TENANT, { tenant, payments });
      setInsight(response);
      setLoading(false);
    };

    fetchInsight();
  }, [tenant, payments]);

  return (
    <Card className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white border-none p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-32 h-32" />
      </div>
      
      <div className="relative z-10 flex gap-4 items-start">
        <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
           <Sparkles className="w-6 h-6 text-yellow-300" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
            TrustRent AI Monitor
            <span className="text-xs font-normal bg-indigo-500/50 px-2 py-0.5 rounded-full border border-indigo-400/30">Live Updates</span>
          </h3>
          
          {loading ? (
             <div className="animate-pulse space-y-2 mt-2">
               <div className="h-4 bg-white/20 rounded w-3/4"></div>
               <div className="h-4 bg-white/20 rounded w-1/2"></div>
             </div>
          ) : (
             <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
               {insight}
             </p>
          )}

          <div className="mt-4 flex gap-4">
             <div className="flex items-center gap-2 text-xs bg-black/20 px-3 py-1.5 rounded-lg">
                <TrendingUp className="w-3 h-3 text-green-400" />
                <span>Score Trajectory: Positive</span>
             </div>
             <div className="flex items-center gap-2 text-xs bg-black/20 px-3 py-1.5 rounded-lg">
                <AlertCircle className="w-3 h-3 text-yellow-400" />
                <span>Next Due: 5th of Month</span>
             </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

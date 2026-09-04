import React from 'react';
import { getDailyFact } from '@/data/didYouKnow';
import { getDailyQuestion } from '@/data/dailyQuiz';
import TodayInHistoryCard from './TodayInHistoryCard';
import DidYouKnowCard from './DidYouKnowCard';
import DailyQuizCard from './DailyQuizCard';

export default function DailyDiscoverySection() {
  const dailyFact = getDailyFact();
  const dailyQuestion = getDailyQuestion();

  return (
    <section aria-labelledby="daily-discovery-heading" className="w-full">
      <div className="mb-5 flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Günün Keşfi
          </div>
          <h2 id="daily-discovery-heading" className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Günün Keşfi
          </h2>
          <p className="mt-0.5 max-w-2xl text-xs text-muted-foreground sm:text-sm">
            Tarihte bugün yaşananlar, günün ilginç bilgisi ve genel kültür sorusuyla güne başlayın.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
        <div className="h-full">
          <TodayInHistoryCard />
        </div>
        <div className="h-full">
          <DidYouKnowCard initialFact={dailyFact} />
        </div>
        <div className="h-full md:col-span-2 lg:col-span-1">
          <DailyQuizCard initialQuestion={dailyQuestion} />
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from 'next/link';
import { Plane, TrendingUp, TrendingDown, Clock, AlertTriangle } from 'lucide-react';

type RouteData = {
  destination: {
    iata: string;
    city: string;
    name: string;
  };
  score: number;
  deal_signal: string;
  latest_fare: number | null;
  reliability_score: number | null;
  confidence: string;
};

type Props = {
  origin: { iata: string };
  route: RouteData;
};

export function EnhancedRouteCard({ origin, route }: Props) {
  // Deal signal styling
  const dealColors = {
    strong_deal: 'bg-success-50 text-success-700 border-success-200',
    deal: 'bg-success-50 text-success-600 border-success-100',
    neutral: 'bg-gray-50 text-gray-600 border-gray-200',
    expensive: 'bg-danger-50 text-danger-600 border-danger-200',
  };

  const dealColor = dealColors[route.deal_signal as keyof typeof dealColors] || dealColors.neutral;

  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success-600';
    if (score >= 50) return 'text-warning-600';
    return 'text-danger-600';
  };

  // Confidence indicator
  const confidenceColors = {
    high: 'bg-success-100 text-success-800',
    medium: 'bg-warning-100 text-warning-800',
    low: 'bg-danger-100 text-danger-800',
  };

  const confidenceColor = confidenceColors[route.confidence as keyof typeof confidenceColors] || confidenceColors.medium;

  return (
    <Link 
      href={`/routes/${origin.iata}/${route.destination.iata}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 p-6 group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-50 rounded-lg group-hover:bg-primary-100 transition-colors">
            <Plane className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {route.destination.iata}
            </h3>
            <p className="text-sm text-gray-600">{route.destination.city}</p>
          </div>
        </div>

        {/* Score Badge */}
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(route.score)}`}>
            {route.score.toFixed(0)}
          </div>
          <p className="text-xs text-gray-500">Score</p>
        </div>
      </div>

      {/* Deal Signal */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${dealColor} mb-4`}>
        {route.deal_signal === 'strong_deal' || route.deal_signal === 'deal' ? (
          <TrendingDown className="w-4 h-4" />
        ) : route.deal_signal === 'expensive' ? (
          <TrendingUp className="w-4 h-4" />
        ) : null}
        <span>{route.deal_signal.replace('_', ' ').toUpperCase()}</span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Latest Fare</p>
          <p className="text-lg font-semibold text-gray-900">
            {route.latest_fare !== null ? `$${route.latest_fare.toFixed(0)}` : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Reliability</p>
          <p className="text-lg font-semibold text-gray-900">
            {route.reliability_score !== null ? `${route.reliability_score.toFixed(0)}%` : 'N/A'}
          </p>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {route.confidence === 'low' && <AlertTriangle className="w-4 h-4 text-warning-600" />}
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${confidenceColor}`}>
            {route.confidence.toUpperCase()} CONFIDENCE
          </span>
        </div>
        <Clock className="w-4 h-4 text-gray-400" />
      </div>
    </Link>
  );
}

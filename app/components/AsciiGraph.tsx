"use client";
import React, { useMemo } from 'react';

interface AsciiGraphProps {
  contributions: { date: string; contributions: number }[];
}

const AsciiGraph: React.FC<AsciiGraphProps> = ({ contributions }) => {
  const asciiGraphLines = useMemo(() => {
    const filteredContributions = contributions
      .filter(({ contributions }) => contributions > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filteredContributions.map(({ date, contributions }) => {
      const bar = Array.from({ length: contributions }).map((_, idx) => (
        <span key={idx} className="w-1 h-1 block">
          ▓
        </span>
      ));

      return (
        <div
          key={date}
          className="text-sm font-mono text-gray-400 h-full overflow-y-clip"
          title={`${date}: ${contributions} contributions`}
        >
          <span className="flex flex-col whitespace-nowrap items-center">
            {bar}
          </span>
        </div>
      );
    });
  }, [contributions]);

  return (
    <div className="bg-gray-50 p-4 rounded">
      <h3 className="text-sm text-gray-500 mb-4">Daily Distribution</h3>
      <div className="flex items-end gap-px min-h-[200px] overflow-x-auto pb-2">
        {asciiGraphLines}
      </div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Contribution frequency
      </div>
    </div>
  );
};

export default AsciiGraph;
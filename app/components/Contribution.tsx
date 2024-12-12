"use client";
import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Target } from "lucide-react";

interface ContributionData {
  contributions: Record<string, number>;
  totalContributions: number;
}

const ContributionDashboard: React.FC<ContributionData> = ({
  contributions,
  totalContributions,
}) => {
  const processedContributions = useMemo(() => {
    return Object.entries(contributions)
      .map(([date, contributions]) => ({
        date,
        contributions,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [contributions]);

  const stats = useMemo(() => {
    const contributionValues = Object.values(contributions);

    return {
      totalContributions,
      averageDaily: Number(
        (totalContributions / contributionValues.length).toFixed(2)
      ),
      maxDaily: Math.max(...contributionValues),
      minDaily: Math.min(...contributionValues),
      medianDaily: calculateMedian(contributionValues),
      daysWithContributions: contributionValues.filter((c) => c > 0).length,
      zeroContributionDays: contributionValues.filter((c) => c === 0).length,
    };
  }, [contributions, totalContributions]);

  function calculateMedian(values: number[]) {
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      return Number(((sorted[middle - 1] + sorted[middle]) / 2).toFixed(2));
    }

    return Number(sorted[middle].toFixed(2));
  }

  return (
    <div className="bg-[#3d3d3d] text-slate-200 font-mono p-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-400 pb-4">
        <h1 className="text-3xl font-bold flex items-center">
          <Target className="mr-3 text-slate-200" /> Contribution Insights
        </h1>
        <p className="text-sm text-slate-400 flex items-center">
          <Calendar className="mr-2" /> Annual Overview -2024
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Contributions",
            value: stats.totalContributions,
          },
          {
            label: "Average Daily",
            value: stats.averageDaily,
          },
          
          {
            label: "Total Active Days",
            value: stats.daysWithContributions,
          },
          {
            label: "Max Daily",
            value: stats.maxDaily,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-[#2d2d2d] border border-slate-400 p-4 rounded-lg"
          >
            <p className="text-xs uppercase text-slate-300">{stat.label}</p>
            <p className="text-lg font-bold text-slate-100">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ASCII Graph */}
      <div className="bg-[#2d2d2d] border border-slate-400 p-4 rounded-lg ">
        <AsciiGraph contributions={processedContributions} />
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#2d2d2d] border border-slate-400 p-4 rounded-lg">
          <h3 className="text-lg mb-4 text-slate-200">Daily Contributions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={processedContributions}>
              <CartesianGrid stroke="#555555" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#cccccc" }} />
              <YAxis tick={{ fill: "#cccccc" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#2d2d2d", color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
              />
              <Bar dataKey="contributions" fill="#888888" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#2d2d2d] border border-slate-400 p-4 rounded-lg">
          <h3 className="text-lg mb-4 text-slate-200">
            Cumulative Contributions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={processedContributions.map((item, index) => ({
                ...item,
                cumulative: processedContributions
                  .slice(0, index + 1)
                  .reduce((sum, curr) => sum + curr.contributions, 0),
              }))}
            >
              <CartesianGrid stroke="#555555" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#cccccc" }} />
              <YAxis tick={{ fill: "#cccccc" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#2d2d2d", color: "#ffffff" }}
                itemStyle={{ color: "#ffffff" }}
              />
              <Line type="monotone" dataKey="cumulative" stroke="#cccccc" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

interface AsciiGraphProps {
  contributions: { date: string; contributions: number }[];
}

const AsciiGraph: React.FC<AsciiGraphProps> = ({ contributions }) => {
  const asciiGraphLines = useMemo(() => {
    // Filter out zero-contribution days and sort by date
    const filteredContributions = contributions
      .filter(({ contributions }) => contributions > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return filteredContributions.map(({ date, contributions }) => {
      const bar = Array.from({ length: contributions }).map((_, idx) => (
        <span key={idx} className="w-1 h-1">
          ▓
        </span>
      ));

      return (
        <div
          key={date}
          className="text-sm font-mono bg-[#2d2d2d] text-slate-200 h-full overflow-y-clip"
        >
          <span className="flex flex-col whitespace-nowrap">{bar}</span>
        </div>
      );
    });
  }, [contributions]);

  return (
    <div className="bg-[#2d2d2d] p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-slate-200">
        Daily Contributions (ASCII)
      </h3>
      <div className="flex space-y-1 space-x-1 overflow-x-auto items-end">
        {asciiGraphLines}
      </div>
    </div>
  );
};

export default ContributionDashboard;

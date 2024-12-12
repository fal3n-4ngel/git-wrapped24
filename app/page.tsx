/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from 'react';

import Head from 'next/head';
import { fetchGitHubContributions, processContributionData } from './utils/useGitAPI';
import ContributionDashboard from './components/Contribution';



export default function Home() {
  const [username, setUsername] = useState('');
  const [contributions, setContributions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const rawContributions = await fetchGitHubContributions(username);
      const processedData = processContributionData(rawContributions);
      setContributions(processedData);
    } catch (err) {
      setError('Failed to fetch contributions. Check username and GitHub token.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d2d2d] text-slate-200 py-10 font-mono">
      <Head>
        <title>Git-Wrapped</title>
        <link rel="icon" href="/github-icon.png" />
      </Head>

      <main className="container mx-auto px-4 w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-100">
        Git-Wrapped 2024
        </h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex">
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub Username"
              className="
                flex-grow p-3 border border-[#3d3d3d] bg-[#3d3d3d] text-slate-200 
                rounded-l-lg focus:outline-none focus:ring-2 focus:ring-slate-500
              "
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="
                bg-[#3d3d3d] text-slate-200 px-6 py-3 rounded-r-lg 
                hover:bg-[#4d4d4d] transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? 'Loading...' : 'Visualize'}
            </button>
          </div>
        </form>

        {error && (
          <div 
            className="bg-[#3d3d3d] border border-red-500 text-red-400 px-4 py-3 rounded relative" 
            role="alert"
          >
            {error}
          </div>
        )}

        {contributions && (
          <ContributionDashboard
            contributions={contributions.contributionMap}
            totalContributions={contributions.totalContributions}
          />
        )}
      </main>
    </div>
  );
}
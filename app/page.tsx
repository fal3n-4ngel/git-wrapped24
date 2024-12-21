"use client";
import React, { useState } from "react";
import { Loader2, Github, AlertCircle } from "lucide-react";
import {
  fetchGitHubContributions,
  processContributionData,
} from "./utils/useGitAPI";
import ContributionDashboard from "./components/Contribution";

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface ContributionsData {
  totalContributions: number;
  contributionMap: Record<string, number>;
}

interface UserData {
  user: GitHubUser;
  contributions: ContributionsData;
}

const GitWrapped = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userDetails: GitHubUser = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const contributionsData = await fetchGitHubContributions(username);
      const processedData = processContributionData(contributionsData);

      setUserData({
        user: userDetails,
        contributions: processedData,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center space-x-3">
            <Github size={24} className="text-gray-400" />
            <h1 className="text-xl text-gray-700">Git Wrapped - 24</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="w-full mx-auto mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full px-4 py-3 bg-gray-50 rounded 
                          text-gray-700 placeholder-gray-400 
                          focus:outline-none focus:ring-1 
                          focus:ring-gray-200"
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2 top-2 px-4 py-1.5 
                         bg-gray-100 text-gray-600 rounded
                         hover:bg-gray-200 transition-colors 
                         disabled:opacity-50 text-sm"
              >
                {loading ? (
                  <Loader2 className="animate-spin text-gray-500" size={16} />
                ) : (
                  "View"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className="max-w-lg mx-auto mb-8 p-4 bg-gray-50 
                        rounded flex items-center space-x-3"
          >
            <AlertCircle className="text-gray-400" size={16} />
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {userData && (
          <div className="space-y-8">
            {/* Contribution Dashboard */}
            <ContributionDashboard
              contributions={userData.contributions.contributionMap}
              totalContributions={userData.contributions.totalContributions}
              username={username}
              userData={userData}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 px-4">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-400">
        &copy; 2024 Git Wrapped @ fal3n-4ngel.
        </div>
      </footer>
    </div>
  );
};

export default GitWrapped;

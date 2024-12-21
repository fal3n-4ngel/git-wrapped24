"use client";
import React, { useState } from "react";
import { Loader2, Github, AlertCircle } from "lucide-react";
import {
  fetchGitHubContributions,
  processContributionData,
} from "./utils/useGitAPI";
import ContributionDashboard from "./components/Contribution";

// Type definitions
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

const GITHUB_REPO_URL = "https://github.com/fal3n-4ngel/git-wrapped24";

const GitWrapped: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? "User not found" 
          : "Failed to fetch user data"
        );
      }

      const userDetails: GitHubUser = await response.json();
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

  const renderHeader = () => (
    <header className="py-6 px-4 border-b border-gray-100">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Github size={24} className="text-gray-400" />
            <h1 className="text-xl font-semibold text-gray-700">Git Wrapped - 24</h1>
          </div>
          
          <a 
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 
                     transition-colors border border-gray-200 px-4 py-2 rounded-md
                     hover:border-gray-400"
          >
            <span className="text-sm">Drop a ⭐ on</span>
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );

  const renderSearchForm = () => (
    <div className="w-[95%] mx-auto mb-12">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
            className="w-full px-4 py-3 bg-gray-50 rounded-lg
                      text-gray-700 placeholder-gray-400 
                      focus:outline-none focus:ring-2 
                      focus:ring-gray-200 transition-all
                      border border-gray-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 px-4 py-1.5 
                     bg-gray-100 text-gray-600 rounded-md
                     hover:bg-gray-200 transition-colors 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-sm font-medium"
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
  );

  const renderError = () => error && (
    <div className=" mx-auto mb-8 p-4 bg-red-50 
                  rounded-lg flex items-center space-x-3">
      <AlertCircle className="text-red-400" size={16} />
      <p className="text-red-600 text-sm">{error}</p>
    </div>
  );

  const renderResults = () => userData && (
    <div className="space-y-8">
      <ContributionDashboard
        contributions={userData.contributions.contributionMap}
        totalContributions={userData.contributions.totalContributions}
        username={username}
        userData={userData}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {renderHeader()}
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {renderSearchForm()}
        {renderError()}
        {renderResults()}
      </main>

      <footer className="py-6 px-4 border-t border-gray-100">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Git Wrapped @ 
          <a 
            href="https://github.com/fal3n-4ngel" 
            className="hover:text-gray-600 transition-colors ml-1"
          >
            fal3n-4ngel
          </a>
        </p>
      </footer>
    </div>
  );
};

export default GitWrapped;
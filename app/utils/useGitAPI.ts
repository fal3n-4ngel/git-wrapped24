import axios from 'axios';

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export async function fetchGitHubContributions(username: string, year: number = 2024) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  const query = `
    query ContributionGraph($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post('https://api.github.com/graphql', 
      { 
        query, 
        variables: {
          username,
          from: `${year}-01-01T00:00:00Z`,
          to: `${year}-12-31T23:59:59Z`
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.data.user.contributionsCollection.contributionCalendar;
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    throw error;
  }
}

export function processContributionData(data: ContributionData) {
  const contributionMap: Record<string, number> = {};
  
  data.weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      contributionMap[day.date] = day.contributionCount;
    });
  });

  return {
    totalContributions: data.totalContributions,
    contributionMap
  };
}
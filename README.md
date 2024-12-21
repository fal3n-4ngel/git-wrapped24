# Git Wrapped 24

## What is Git Wrapped?
Git Wrapped is a web application that provides a beautiful visualization of your GitHub contributions throughout the year. Similar to Spotify Wrapped, it generates an elegant and minimal dashboard showcasing your coding activity, making it easy to reflect on your development journey 🚀.

## Features
- Beautiful, minimal contribution visualization
- Daily and cumulative contribution graphs
- ASCII art visualization of activity
- Quick statistics overview
- Profile information display
- Easy sharing capabilities
- Clean, monochromatic design

## Technical Stack
```markdown
# Frontend
- Next.js as the main framework
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons
- HTML2Canvas for screenshot generation

# API Integration
- GitHub REST API for user data
- GitHub GraphQL API for detailed contribution data
```

## Component Structure
```markdown
# Core Components
- ContributionDashboard: Main visualization component
- AsciiGraph: ASCII representation of contributions
- Profile Section: User information display

# Data Processing
- Contribution data normalization
- Date-based aggregation
- Statistical calculations
```

## Design Philosophy
The project emphasizes minimalism and clarity:
- Monochromatic color scheme
- Clean, spacious layouts
- Focus on data visualization
- Subtle animations and interactions
- Responsive design across devices

## Getting Started
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure GitHub API credentials
4. Run the development server:
   ```bash
   npm run dev
   ```

## Contributors
<table>
<tr>
    <td align="center">
        <a href="https://github.com/fal3n-4ngel">
            <img src="https://avatars.githubusercontent.com/u/79042374?v=4" width="100;" alt="fal3n-4ngel"/>
            <br />
            <sub><b>fal3n-4ngel</b></sub>
        </a>
    </td>
</tr>
</table>

## License
MIT License - feel free to use and modify for your own projects!

## Acknowledgments
- Thanks to GitHub for providing the API
- Inspired by Spotify Wrapped
- Built with ❤️ using Next.js and Tailwind CSS

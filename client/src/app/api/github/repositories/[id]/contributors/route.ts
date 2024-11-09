import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Octokit } from "octokit";
import { ContributionStats } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: session.accessToken });

    // First get repository details to get full name
    const { data: repo } = await octokit.request("GET /repositories/{id}", {
      id: id,
    });

    // Get all contributors
    const { data: contributors } = await octokit.request(
      "GET /repos/{owner}/{repo}/contributors",
      {
        owner: repo.owner.login,
        repo: repo.name,
        per_page: 100,
      }
    );

    // For each contributor, get detailed stats
    const detailedContributors = await Promise.all(
      contributors.map(async (contributor) => {
        // Get commit stats
        const { data: commits } = await octokit.request(
          "GET /repos/{owner}/{repo}/commits",
          {
            owner: repo.owner.login,
            repo: repo.name,
            author: contributor.login,
            per_page: 100,
          }
        );

        // Get PR stats
        const { data: prs } = await octokit.request(
          "GET /repos/{owner}/{repo}/pulls",
          {
            owner: repo.owner.login,
            repo: repo.name,
            state: "all",
            creator: contributor.login,
            per_page: 100,
          }
        );

        // TODO: Fix reviews
        // Get review stats
        // const { data: reviews } = await octokit.request(
        //   "GET /repos/{owner}/{repo}/pulls/reviews",
        //   {
        //     owner: repo.owner.login,
        //     repo: repo.name,
        //     per_page: 100,
        //   }
        // );

        // const contributorReviews = reviews.filter(
        //   (review) => review.user?.login === contributor.login
        // );

        const stats: ContributionStats = {
          commits: commits.length,
          pullRequests: prs.length,
          // reviews: contributorReviews.length,
          reviews: 0,
          linesAdded: 0,
          linesDeleted: 0,
          filesChanged: 0,
        };

        // Calculate contribution score
        const score = calculateContributionScore(stats);

        const result = {
          id: contributor.id?.toString() ?? "",
          login: contributor.login,
          avatarUrl: contributor.avatar_url,
          contributions: stats,
          contributionScore: score,
        };

        return result;
      })
    );

    // Calculate percentages
    const totalScore = detailedContributors.reduce(
      (sum, c) => sum + c.contributionScore,
      0
    );

    const contributorsWithPercentages = detailedContributors.map((c) => ({
      ...c,
      contributionPercentage: Number(
        ((c.contributionScore / totalScore) * 100).toFixed(2)
      ),
    }));

    return NextResponse.json(contributorsWithPercentages);
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return NextResponse.json(
      { error: "Failed to fetch contributors" },
      { status: 500 }
    );
  }
}

// Helper function to calculate contribution score
function calculateContributionScore(stats: ContributionStats): number {
  const weights = {
    commits: 1,
    pullRequests: 2,
    reviews: 0.5,
  };

  return (
    stats.commits * weights.commits +
    stats.pullRequests * weights.pullRequests +
    stats.reviews * weights.reviews
  );
}

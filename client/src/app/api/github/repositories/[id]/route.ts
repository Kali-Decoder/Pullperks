import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Octokit } from "octokit";
import { Repository } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: session.accessToken });

    // First get the repository by ID
    const { data: repoData } = await octokit.request("GET /repositories/{id}", {
      id: params.id,
    });

    // Get additional repository details using the full name
    const { data: detailedRepo } = await octokit.request(
      "GET /repos/{owner}/{repo}",
      {
        owner: repoData.owner.login,
        repo: repoData.name,
      }
    );

    // Get languages used in the repository
    const { data: languages } = await octokit.request(
      "GET /repos/{owner}/{repo}/languages",
      {
        owner: repoData.owner.login,
        repo: repoData.name,
      }
    );

    // Get the default branch's protection status
    let branchProtection = null;
    try {
      const { data: protection } = await octokit.request(
        "GET /repos/{owner}/{repo}/branches/{branch}/protection",
        {
          owner: repoData.owner.login,
          repo: repoData.name,
          branch: detailedRepo.default_branch,
        }
      );
      branchProtection = protection;
    } catch (error) {
      // Branch might not have protection rules, which is fine
      console.log("No branch protection rules found");
    }

    // Format the repository data
    const repository: Repository & {
      [key: string]: any;
    } = {
      id: detailedRepo.id.toString(),
      name: detailedRepo.name,
      owner: detailedRepo.owner.login,
      description: detailedRepo.description,
      isPrivate: detailedRepo.private,
      url: detailedRepo.html_url,
      defaultBranch: detailedRepo.default_branch,
      stars: detailedRepo.stargazers_count,
      forks: detailedRepo.forks_count,
      openIssues: detailedRepo.open_issues_count,
      watchers: detailedRepo.watchers_count,
      createdAt: detailedRepo.created_at,
      updatedAt: detailedRepo.updated_at,
      pushedAt: detailedRepo.pushed_at,
      size: detailedRepo.size,
      languages: languages,
      license: detailedRepo.license?.name || null,
      topics: detailedRepo.topics || [],
      hasIssues: detailedRepo.has_issues,
      hasProjects: detailedRepo.has_projects,
      hasWiki: detailedRepo.has_wiki,
      hasPages: detailedRepo.has_pages,
      hasDownloads: detailedRepo.has_downloads,
      archived: detailedRepo.archived,
      disabled: detailedRepo.disabled,
      visibility: detailedRepo.visibility,
      branchProtection: branchProtection
        ? {
            requiredReviews:
              branchProtection.required_pull_request_reviews
                ?.required_approving_review_count || 0,
            requiresStatusChecks: !!branchProtection.required_status_checks,
            enforceAdmins: branchProtection.enforce_admins?.enabled || false,
          }
        : null,
      // Add custom fields for bounty-related info
      activeBounty: undefined, // Will be populated if there's an active bounty
      contributors: [], // Will be populated separately through the contributors endpoint
    };

    return NextResponse.json(repository);
  } catch (error) {
    console.error("Error fetching repository:", error);

    // Check if it's a GitHub API error
    if (error instanceof Error && "status" in error) {
      const status = (error as any).status;
      if (status === 404) {
        return NextResponse.json(
          { error: "Repository not found" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to fetch repository details" },
      { status: 500 }
    );
  }
}

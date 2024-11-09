import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Octokit } from "octokit";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const octokit = new Octokit({ auth: session.accessToken });

    const { data: repos } = await octokit.request("GET /user/repos", {
      visibility: "all",
      affiliation: "owner,collaborator",
      sort: "updated",
      per_page: 100,
    });

    const repositories = repos.map((repo) => ({
      id: repo.id.toString(),
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isPrivate: repo.private,
      url: repo.html_url,
    }));

    return NextResponse.json(repositories);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}

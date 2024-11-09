"use client";

import { useEffect, useState } from "react";
import { Repository } from "@/types";
import { RepositoryCard } from "./RepositoryCard";

interface RepositoryListProps {
  accessToken?: string;
}

export function RepositoryList({ accessToken }: RepositoryListProps) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRepositories() {
      try {
        const response = await fetch("/api/github/repositories");
        const data = await response.json();
        setRepositories(data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    }

    if (accessToken) {
      fetchRepositories();
    }
  }, [accessToken]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}

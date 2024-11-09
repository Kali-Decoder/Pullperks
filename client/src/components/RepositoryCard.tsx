import Link from "next/link";
import { Repository } from "@/types";
import { GitBranch, StarIcon } from "lucide-react";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {repository.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {repository.description || "No description provided"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <StarIcon className="h-4 w-4 mr-1" />
            <span>{repository.stars || 0}</span>
          </div>
          <div className="flex items-center">
            <GitBranch className="h-4 w-4 mr-1" />
            <span>{repository.forks || 0}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Link
          href={`/dashboard/repositories/${repository.id}`}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
        >
          Set up bounty →
        </Link>
      </div>
    </div>
  );
}

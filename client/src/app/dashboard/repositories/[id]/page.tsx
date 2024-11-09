import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ContributorDistribution } from "@/components/ContributorDistribution";
import { RepositoryHeader } from "@/components/RepositoryHeader";

export default async function RepositoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <RepositoryHeader repositoryId={params.id} />
      <ContributorDistribution
        repositoryId={params.id}
        accessToken={session?.accessToken}
      />
    </div>
  );
}

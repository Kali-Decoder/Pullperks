import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ContributorDistribution } from "@/components/ContributorDistribution";
import { RepositoryHeader } from "@/components/RepositoryHeader";

export default async function RepositoryPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-6">
      <RepositoryHeader repositoryId={id} />

      <ContributorDistribution
        repositoryId={params.id}
        accessToken={session?.accessToken}
      />
    </div>
  );
}

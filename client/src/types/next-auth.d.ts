import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    githubId?: string;
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}

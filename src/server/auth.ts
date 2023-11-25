import Discord from "@auth/core/providers/discord";
import type { AuthConfig } from "@auth/core";

export const authOptions: AuthConfig = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
};

import { Auth } from "@auth/core";
import Discord from "@auth/core/providers/discord";
import { eventHandler, toWebRequest } from "h3";

export default eventHandler(async (event) => {
  console.error("AUTH_SECRET (inside handler):", process.env.AUTH_SECRET);
  console.error("AUTH_DISCORD_ID:", process.env.AUTH_DISCORD_ID);
  console.error("AUTH_DISCORD_SECRET:", process.env.AUTH_DISCORD_SECRET);
  const result = Auth(toWebRequest(event), {
    basePath: "/r",
    secret: process.env.AUTH_SECRET,
    trustHost: !!process.env.VERCEL,
    redirectProxyUrl: process.env.AUTH_REDIRECT_PROXY_URL,
    providers: [
      Discord({
        clientId: process.env.AUTH_DISCORD_ID,
        clientSecret: process.env.AUTH_DISCORD_SECRET,
      }),
    ],
  });

  return result;
});

import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { config } from "dotenv";
import passport from "koa-passport";
config();

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ["email", "identify", "guilds"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      console.log({ accessToken, refreshToken, profile });
    }
  )
);

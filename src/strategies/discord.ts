import { Profile, Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import passport from "koa-passport";
config();

const prisma = new PrismaClient();

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
      const { id: discordId, email, username, guilds } = profile;
      console.log(guilds);
      try {
        const user = await prisma.user.upsert({
          where: {
            discordId,
          },
          create: {
            discordId,
            email: email!,
            username,
            accessToken,
            refreshToken,
          },
          update: {
            accessToken,
            refreshToken,
          },
        });
        return done(null, user);
      } catch (err: any) {
        console.log(`[OAuth]: ${err}`);
        return done(err, undefined);
      }
    }
  )
);

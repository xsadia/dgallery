import { Profile, Strategy } from "passport-discord";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import passport from "passport";
config();

const prisma = new PrismaClient();

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user ? done(null, user) : done(null, null);
  } catch (err) {
    console.log(`[OAuth] Error: ${err}`);
    return done(err, null);
  }
});

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
      done
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
        console.log(`[OAuth] Error: ${err}`);
        return done(err, undefined);
      }
    }
  )
);

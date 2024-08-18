import { authService } from "~/server/services/auth";
import { GoogleUser, OAuthProvider } from "~/server/types/oauth";

export default oauthGoogleEventHandler({
  config: {
    clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
    clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
  },
  async onSuccess(
    event,
    {
      user,
    }: {
      user: GoogleUser;
    }
  ) {
    const dbUser = await authService.getUserByEmail(user.email);

    if (dbUser) {
      await setUserSession(event, {
        user: {
          id: dbUser.id,
          email: dbUser.email,
          username: dbUser.username,
          provider: OAuthProvider.GOOGLE,
        },
      });

      return sendRedirect(event, "/app");
    }

    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email,
        username: user.name,
        provider: OAuthProvider.GOOGLE,
        requiresConfirmation: true,
      },
    });

    return sendRedirect(event, "/auth/confirm");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});

/**
 * Checks whether a Google OAuth2 access token is still valid.
 * Uses Google's tokeninfo endpoint:
 *   https://oauth2.googleapis.com/tokeninfo?access_token=...
 *
 * @param accessToken  OAuth2 access token to verify
 * @returns            true if valid, false if expired/invalid
 */
export async function isGoogleTokenValid(accessToken: string): Promise<boolean> {
  try {
    const res = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?access_token=${encodeURIComponent(
        accessToken
      )}`
    );

    // 200 OK means Google considers it valid
    if (res.ok) {
      const data = await res.json();
      // Optionally you can inspect data.expires_in if you want
      // console.log('TokenInfo:', data);
      return true;
    }

    // Non-200 (e.g. 400) → token is invalid/expired/revoked
    return false;
  } catch (err) {
    console.error('Error validating Google token:', err);
    return false;
  }
}
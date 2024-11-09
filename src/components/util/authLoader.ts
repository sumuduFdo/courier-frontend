/*** Returns full token details -> userid, jwt token, admin status, expiration date */
export const getFullToken = () => {
  let userId = "";
  let token = "";
  let isAdmin = false;
  let expiration = null;

  // Retrieve the stored token from localStorage
  const storedToken = localStorage.getItem("shipmentAuth");

  // If token exists in localStorage, parse and extract the details
  if (storedToken) {
    const parsed = JSON.parse(storedToken);
    userId = parsed.userId;
    token = parsed.authToken;
    isAdmin = parsed.isAdmin;
    expiration = parsed.expiration;
  }

  // Return the extracted token details
  return {
    userId: userId,
    token: token,
    isAdmin: isAdmin,
    expiration: expiration,
  };
};

/*** Returns only the jwt token. If not found, null will be returned */
export const getToken = () => {
  /** if token found, parse and return only the jwt token */
  const token = localStorage.getItem("shipmentAuth");
  if (token) {
    return JSON.parse(token).authToken;
  }

  return null; // return null if no
};

/*** Sets the token in localStorage -> key = 'shipmentAuth' */
export const setAuthToken = (
  userId: string,
  authToken: string,
  isAdmin: boolean,
  duration: number
) => {
  // Create expiration date by adding the specified duration (in hours) to the current time
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + duration);

  // Store the token details in localStorage (userId, authToken, isAdmin, expiration)
  localStorage.setItem(
    "shipmentAuth",
    JSON.stringify({
      userId: userId,
      authToken: authToken,
      isAdmin: isAdmin,
      expiration: expiration.toISOString(),
    })
  );
};

/**
 * Returns the token duration in milliseconds by calculating the time difference
 * between the current time and the token expiration time
 */
export const getTokenDuration = () => {
  // Get the expiration date of the stored token
  const expiration = getFullToken().expiration;
  const expirationDate = new Date(expiration);
  const currentDate = new Date();

  // Calculate the time difference between expiration and current time in milliseconds
  const timeDiff = expirationDate.getTime() - currentDate.getTime();

  // Return the calculated time difference (duration in milliseconds)
  return timeDiff;
};

/**
 * Loader function that checks if the token has expired.
 * If expired, it returns null. Otherwise, it returns the current token.
 */
export const loader = () => {
  // Get the remaining duration of the token
  const expiration = getTokenDuration();

  // If the token has expired (negative duration), return null
  if (expiration < 0) {
    return null;
  }

  // Otherwise, return the current JWT token
  return getToken();
};

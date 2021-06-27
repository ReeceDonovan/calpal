import axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";

// Handling axios responses
export const doRequest = async <T>(reqOptions: AxiosRequestConfig) => {
  let error: Error | undefined;
  let data: T | undefined;

  try {
    const response = await axios.request<T>(reqOptions);
    data = response.data;
  } catch (e) {
    if (e.response) {
      error = e.response.data.error;
    } else if (e.request) {
      error = e.request;
    } else {
      error = e;
    }
  }

  return {
    data,
    error,
  };
};

// storeTokens Utility function for storing idToken and refreshToken
export const storeTokens = (idToken: string, refreshToken: string) => {
  localStorage.setItem("__calpalId", idToken);
  localStorage.setItem("__calpalRf", refreshToken);
};

interface TokenClaims {
  exp: number;
  iat: number;
}

export interface IdTokenClaims extends TokenClaims {
  user: User;
}

export interface RefreshTokenClaims extends TokenClaims {
  uid: string;
  jti: string;
}

interface User {
  uid: string;
  email: string;
  name: string;
  imageUrl: string;
  website: string;
}

// getTokenPayload Gets the token's payload/claims, returns null if invalid
export const getTokenPayload = <T extends TokenClaims>(
  token: string | undefined
) => {
  if (!token) {
    return undefined;
  }

  const tokenClaims = jwt_decode<T>(token);

  if (Date.now() / 1000 >= tokenClaims.exp) {
    return undefined;
  }

  return tokenClaims;
};
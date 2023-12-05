import fetcher from '../fetcher';

export type AuthPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  data: {
    username: string;
    accessToken: string;
  };
};

export type RegisterResponse = {
  data: {
    username: string;
    password: string;
  };
};
export const login = async ({ username, password }: AuthPayload) => {
  const response = await fetcher({
    url: '/auth/login',
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return response as LoginResponse;
};

export const registerUser = async ({ username, password }: AuthPayload) => {
  const response = await fetcher({
    url: '/auth/register',
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  return response as RegisterResponse;
};

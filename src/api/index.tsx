const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getUser = (account: string) =>
  fetch(`${SERVER_URL}/0xer/${account}`).then((response) => response.json());

export const createUser = (provider: {
  type?: string;
  address?: string;
  accessToken?: string;
}) =>
  fetch(`${SERVER_URL}/0xer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(provider),
  }).then((response) => response.json());

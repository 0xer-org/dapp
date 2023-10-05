const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getUser = () =>
  fetch(`${SERVER_URL}/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  }).then((response) => response.json());

export const answerQuestion = ({
  index,
  responseTime,
  selected,
}: {
  index: number;
  selected: number;
  responseTime: number;
}) =>
  fetch(`${SERVER_URL}/questions/${index}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify({
      selected,
      responseTime,
    }),
  }).then((response) => response.json());

export const getQuestions = () =>
  fetch(`${SERVER_URL}/questions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  }).then((response) => response.json());

export const getReferrals = () =>
  fetch(`${SERVER_URL}/referrals`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
  }).then((response) => response.json());

export const createUser = (provider: {
  type?: string;
  address?: string;
  signature?: string | null;
  accessToken?: string;
  referrer?: string;
}) =>
  fetch(`${SERVER_URL}/0xer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(provider),
  }).then((response) => response.json());

export const verifyRecaptcha = ({
  account,
  responses,
}: {
  account: string;
  responses: { v2: string; v3: string };
}) =>
  fetch(`${SERVER_URL}/0xer/${account}/verification/recaptcha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify(responses),
  }).then((response) => response.json());

export const sendSMSMessage = ({
  account,
  phone,
  countryCode,
}: {
  account: string;
  countryCode: string;
  phone: string;
}) =>
  fetch(`${SERVER_URL}/0xer/${account}/sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify({ phone: countryCode + phone }),
  }).then((response) => response.json());

export const verifySMSMessage = ({
  account,
  code,
}: {
  account: string;
  code: string;
}) =>
  fetch(`${SERVER_URL}/0xer/${account}/verification/sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth")}`,
    },
    body: JSON.stringify({ code }),
  }).then((response) => {
    return response.status === 200 ? Promise.resolve() : Promise.reject();
  });

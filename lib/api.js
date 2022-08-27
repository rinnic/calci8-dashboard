export const login = async (loginData) => {
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(loginData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const signup = async (signupData) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify(signupData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw response;
  }
  return response;
};
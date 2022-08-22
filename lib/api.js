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
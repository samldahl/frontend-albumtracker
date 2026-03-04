const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const decodeToken = (token) => {
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);
  const parsedPayload = JSON.parse(decodedPayload);
  return parsedPayload.payload;
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (json.err) {
      throw new Error(json.err);
    }

    localStorage.setItem("token", json.token);

    return decodeToken(json.token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signin = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const json = await res.json();

    if (json.err) {
      throw new Error(json.err);
    }

    localStorage.setItem("token", json.token);

    return decodeToken(json.token);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signout = () => {
  localStorage.removeItem("token");
};

export { signup, signin, signout };

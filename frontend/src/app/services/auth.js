import { APIClient } from "../config/axios";

export const getUserInfo = async (access_token) => {
  try {
    const { data: baseInfo } = await APIClient.get("/auth/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    return { ...baseInfo };
  } catch (e) {
    console.log("Unable to retrieve user's information");
    return null;
  }
};

export const handleLogin = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);
  try {
    const { data: userToken } = await APIClient.post(
      "/auth/jwt/login",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    const user = await getUserInfo(userToken?.access_token);
    return { user, userToken };
  } catch (error) {
    console.log(error);
    return null;
  }
};

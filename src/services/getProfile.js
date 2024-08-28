import { Global } from "../helpers/Global";

export const GetProfile = async (userId) => {
  const request = await fetch(Global.url + "profile/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  const data = await request.json();
  if (data.status == "success") {
    return data.user;
  }
};

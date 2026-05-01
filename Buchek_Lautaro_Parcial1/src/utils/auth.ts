
import { removeUser } from "./localStorage";
import { navigate } from "./navigate";


export const logout = () => {
  removeUser();
  navigate("/src/pages/auth/login/login.html");
};

import { logout } from "../../../utils/auth";
import { authGuard } from "../../../main";

authGuard();

const buttonLogout = document.getElementById(
  "logoutButton"
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});



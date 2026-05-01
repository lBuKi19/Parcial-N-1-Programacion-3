import type { IUser } from "../../../types/IUser";
import type { RUser } from "../../../types/RUser";
import { navigate } from "../../../utils/navigate";


const form = document.getElementById("form_login") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const email_login = inputEmail.value;
  const password_login = inputPassword.value;
  const usersFromStorage = localStorage.getItem("users");

  if(!usersFromStorage) {
    alert("No hay usuarios registrados");
    form.reset();
    return;
  }

  const users: RUser[] = JSON.parse(usersFromStorage);

  const userFound = users.find(
    (user) => user.email === email_login && user.password === password_login
  );

  if (!userFound) {
    alert("El Email o la contraseña ingresada son incorrectos");
    form.reset();
    return;
  }

  const user: IUser = {
    email: email_login,
    role: userFound.role,
    loggedIn: true,
  };

  const parseUser = JSON.stringify(user);
  localStorage.setItem("authUser", parseUser);

  alert("Sesión iniciada correctamente");
  form.reset();

  if (userFound.role === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else if (userFound.role === "client") {
    navigate("/src/pages/store/home/home.html");
  }

});

import type { RUser } from "../../../types/RUser";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";


const form = document.getElementById("form_registro") as HTMLFormElement;
const email_registro = document.getElementById("email_registro") as HTMLInputElement;
const password_registro = document.getElementById("password_registro") as HTMLInputElement;
// asignar cualquier registro a rol usuario por defecto;
const usuario_rol: Rol = "client"; 

form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const newUser: RUser = {
    email: email_registro.value,
    password: password_registro.value,
    role: usuario_rol,
  };

  const usersFromStorage = localStorage.getItem("users");
  const users: RUser[] = usersFromStorage
    ? JSON.parse(usersFromStorage)
    : [];

  const userFound = users.find(
    (user) => user.email === email_registro.value
  );

  if (!userFound) {
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("authUser", JSON.stringify(newUser));
    alert("Usuario registrado correctamente");
    navigate("/src/pages/client/home/home.html");
    return;
  }  
  else {
    alert("El Email ingresado ya está asociado a una cuenta");
  }
  
  form.reset();  
});
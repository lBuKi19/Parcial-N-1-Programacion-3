import type { Rol } from "./Rol";

export interface RUser {
  email: string;
  password: string;
  role: Rol;
}
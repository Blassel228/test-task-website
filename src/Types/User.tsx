export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  phone_number: string;
  is_admin: boolean;
  birthdate?: string;
}
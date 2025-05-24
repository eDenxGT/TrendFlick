export interface User {
  userId: string;
  name?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: Date;
  preferences: string[];
}

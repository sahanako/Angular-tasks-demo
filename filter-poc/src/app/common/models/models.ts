// user.model.ts
export interface User {
    name: string;
    gender: string;
    project: string;
    phoneno: string;
    email: string;
    dob: Date; // Assuming dob is a Date object
    password: string;
    website: string[];
    domain: string;
    status: string;
    id: number;
  }
  
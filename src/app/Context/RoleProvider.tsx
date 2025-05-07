"use client";

import { createContext, ReactNode, useState } from "react";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any,rollno:any,email:any) => void;
  email:any;
  rollNumber:any;

}
export const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [rollNumber, setrollNumber] = useState<string | null>(null);

  const changeRole =(newRole: any,rollno:any,email:any) =>{
    
    setRole(newRole);
    setEmail(email);
    setrollNumber(rollno)

  };

  return (
    <RoleContext.Provider value={{ role, changeRole,email,rollNumber}}>
      {children}
    </RoleContext.Provider>
  );
}


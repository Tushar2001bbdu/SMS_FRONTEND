"use client";

import { createContext, ReactNode, useState } from "react";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any,newRollno:any,newEmail:any) => void;
  email:any;
  rollNumber:any;

}
export const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [rollNumber, setRollNumber] = useState<string | null>(null);

  const changeRole =(newRole: any,newRollno:any,newEmail:any) =>{
    console.log("You have called me for setting the role")
    console.log("the roll no is",newRollno)
    setRole(newRole);
    setRollNumber(newRollno);
    setEmail(newEmail);
    console.log("The final rol number is"+rollNumber)
  

  };

  return (
    <RoleContext.Provider value={{ role, changeRole,email,rollNumber}}>
      {children}
    </RoleContext.Provider>
  );
}


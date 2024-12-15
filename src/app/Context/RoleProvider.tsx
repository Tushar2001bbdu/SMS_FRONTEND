"use client";

import { createContext, ReactNode, useState } from "react";
interface RoleContextType {
  role: any;
  changeRole: (newRole: any) => void;
}
export const RoleContext = createContext<RoleContextType | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<string | null>(null);

  const changeRole = (newRole: any) => {
    setRole(newRole);
  };

  return (
    <RoleContext.Provider value={{ role, changeRole }}>
      {children}
    </RoleContext.Provider>
  );
}


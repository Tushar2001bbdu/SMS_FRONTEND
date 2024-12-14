"use client";

import { RoleProvider } from "../Context/RoleProvider";
import { AdminProvider } from "../Context/AdminProvider";
import { FacultyProvider } from "../Context/FacultyProvider";
import { OnlineClassProvider } from "../Context/OnlineClassProvider";
import { ApolloProvider } from "@apollo/client";
import graphqlClient from "../graphql/client";
import { AuthProvider } from "../Context/AuthProvider";

export const AppProviders = ({ children }) => {
  return (
    <RoleProvider>
    <ApolloProvider client={graphqlClient}>
      <OnlineClassProvider>
        <AdminProvider>
          <FacultyProvider>
            
              <AuthProvider>{children}</AuthProvider>
           
          </FacultyProvider>
        </AdminProvider>
      </OnlineClassProvider>
    </ApolloProvider>
    </RoleProvider>
  );
};


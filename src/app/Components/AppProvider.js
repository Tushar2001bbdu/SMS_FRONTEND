"use client";

import { RoleProvider } from "../Context/RoleProvider";
import { Provider } from "react-redux";
import store from "@/app/redux/adminStore";
import {FacultyProvider}  from "../Context/FacultyProvider";

import { ApolloProvider } from "@apollo/client";
import graphqlClient from "../graphql/client";
import { AuthProvider } from "../Context/AuthProvider";

export const AppProviders = ({ children }) => {
  return (
    
    <RoleProvider>
    <ApolloProvider client={graphqlClient}>
     
        <Provider store={store}>
          <FacultyProvider>
            
              <AuthProvider>{children}</AuthProvider>
           
          </FacultyProvider>
        </Provider>
      
    </ApolloProvider>
    </RoleProvider>
   
  );
};


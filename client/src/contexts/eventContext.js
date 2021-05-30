import React,  { createContext} from "react";

export const eventContext = createContext();

export const eventProvider = eventContext.Provider;

export default eventContext;

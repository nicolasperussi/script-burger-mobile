import React from "react";
import { useStorageState } from "../hooks/useStorageState";
import { api } from "@/services/api";
import { router } from "expo-router";
import { IClient } from "@/types/client.interface";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  user?: IClient | null;
  selectedAddress?: {
    cep: string;
    street: string;
    number: string;
  } | null;
  setAddress: (value: string | null) => void;
  isLoadingSession: boolean;
  isLoadingUser: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  selectedAddress: null,
  setAddress: () => null,
  isLoadingSession: false,
  isLoadingUser: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoadingSession, session], setSession] = useStorageState("session");
  const [[isLoadingUser, user], setUser] = useStorageState("user");
  const [[isLoadingAddress, selectedAddress], setAddress] =
    useStorageState("selectedAddress");

  return (
    <AuthContext.Provider
      value={{
        signIn: (email, password) => {
          api
            .post("/auth/login", { email, password })
            .then((res) => {
              setSession(res.data.token);
              setUser(JSON.stringify(res.data.user));
              setAddress(JSON.stringify(res.data.user.addresses[0]));
              router.replace("/(app)/(tabs)");
            })
            .catch((err) => console.log(err.message));
        },
        signOut: () => {
          setSession(null);
          setUser(null);
        },
        session,
        user: user ? JSON.parse(user) : null,
        selectedAddress: selectedAddress ? JSON.parse(selectedAddress) : null,
        setAddress,
        isLoadingSession,
        isLoadingUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

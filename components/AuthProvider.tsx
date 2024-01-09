"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { authorizeState } from "@/states";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authorize] = useRecoilState(authorizeState);

  useEffect(() => {
    if (authorize) {
      router.push("/");
      setLoading(false);
      console.log("Authorized");
    } else {
      router.push("/login");
      setLoading(false);
      console.log("Not Authorized");
    }
  }, [authorize, router]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>{children}</div>;
};

"use client";

import { Button } from "@/components/ui/button";
import { Liff } from "@line/liff";
import GetAppLanguageModule from "@line/liff/get-app-language";
import GetOSModule from "@line/liff/get-os";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Charts } from "./components/dashboard";

export default function Home() {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    displayName: string;
    userId: string;
  } | null>(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    // to avoid `window is not defined` error
    import("@line/liff")
      .then((liff) => liff.default)
      .then(async (liff) => {
        console.log("LIFF init...");
        liff.use(new GetOSModule());
        liff.use(new GetAppLanguageModule());
        await liff.init({
          liffId: "2006161319-nPjXbVw8",
        });

        console.log("LIFF init succeeded.");
        setLiffObject(liff);
        console.log(); // Available
        console.log(liff.getAppLanguage()); // Available
        if (liff.isLoggedIn()) {
          const currentUser = await liff.getProfile();
          console.log(currentUser);
          setUser({
            displayName: currentUser.displayName,
            userId: currentUser.userId,
          });
          console.log(liff.getDecodedIDToken());
          console.log(liff.getAccessToken());
        }
      });
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {user ? (
        <div className="w-full">
          User: <strong>{user.displayName}</strong>
          <div>id: {user.userId}</div>
          <div>
            {liffObject?.getOS() === "web" && (
              <Button
                onClick={() => {
                  liffObject?.logout();
                  window.location.reload();
                }}
              >
                Log out
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button onClick={() => liffObject?.login()}>Login</Button>
      )}
      <Charts />
    </main>
  );
}

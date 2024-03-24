"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [signupUsername, setSignupUsername] = useState("");

  const [token, setToken] = useState("");
  const [signupErrorMessage, setsignupErrorMessage] = useState("");

  const handleSignupSubmit = () => {
    setToken("");
    setsignupErrorMessage("");

    if (signupUsername.trim() === "") {
      alert("Please enter a username for signup.");
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol: signupUsername,
        faction: "COSMIC",
      }),
    };

    fetch("https://api.spacetraders.io/v2/register", options)
      .then((response) => response.json())
      .then((response) => {
        if ("error" in response) {
          if (
            response["error"]["message"] ===
            "Request could not be processed due to an invalid payload."
          ) {
            setsignupErrorMessage(`*${response["error"]["data"]["symbol"]}*`);
          } else {
            setsignupErrorMessage(`*${response["error"]["message"]}*`);
          }
        } else {
          setToken(response["data"]["token"]);
        }
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Enter your username to create an account. When entered click the
          signup button and your token will be displayed. Triple click the token
          to select it all and store it somwehre safe as you will need it to
          login!
        </CardDescription>
      </CardHeader>
      <CardContent id="signupContent" className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="signup-username">Username</Label>
          <Input
            id="signup-username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
          />
          {signupErrorMessage ? (
            <div className="pt-2 text-red-600 font-mono">
              <span>{signupErrorMessage}</span>
            </div>
          ) : null}
          {token ? (
            <div className="overflow-hidden pt-4 font-mono w-64">
              <h1 className="font-bold text-xl">Token:</h1>
              <span className="whitespace-nowrap overflow-ellipsis">
                {token}
              </span>
            </div>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        {!token ? <Button onClick={handleSignupSubmit}>Signup</Button> : null}
      </CardFooter>
    </Card>
  );
};

export default Signup;

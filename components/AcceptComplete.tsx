"use client";

import React from "react";
import { Button } from "./ui/button";
import { Session } from "next-auth";

interface Contract {
  accepted: boolean;
  fulfilled: boolean;
  id: string;
}

interface Props {
  contract: Contract;
  session: Session;
}

const AcceptComplete = ({ contract, session }: Props) => {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
  };
  const acceptContract = async (contract) => {
    await fetch(
      `https://api.spacetraders.io/v2/my/contracts/${contract.id}/accept`,
      fetchOptions
    );
    window.location.reload();
  };

  const completeContract = (contract) => {};

  return (
    <div>
      {contract.accepted && !contract.fulfilled ? (
        <Button className="bg-primary">Complete</Button>
      ) : (
        <Button className="bg-primary" onClick={() => acceptContract(contract)}>
          Accept
        </Button>
      )}
    </div>
  );
};

export default AcceptComplete;

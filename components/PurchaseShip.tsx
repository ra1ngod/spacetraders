"use client";

import React from "react";
import { Button } from "./ui/button";
import { Session } from "next-auth";

interface Ship {
  type: string;
}

interface Props {
  ship: Ship;
  session: Session;
  waypoint: string;
}

const PurchaseShip = ({ ship, session, waypoint }: Props) => {
  const purchaseButton = async (shipType) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.id}`,
      },
      body: JSON.stringify({
        shipType: shipType,
        waypointSymbol: waypoint,
      }),
    };
    await fetch("https://api.spacetraders.io/v2/my/ships", fetchOptions);
    window.location.reload();
  };

  return (
    <div>
      <Button onClick={() => purchaseButton(ship.type)}>Purchase</Button>
    </div>
  );
};

export default PurchaseShip;

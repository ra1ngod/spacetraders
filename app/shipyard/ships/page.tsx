import React from "react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import PurchaseShip from "@/components/PurchaseShip";

const AvailableShips = async ({ searchParams }) => {
  const session = await getServerSession(options);
  const system = searchParams.system;
  const waypoint = searchParams.waypoint;

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
  };

  const response = await fetch(
    `https://api.spacetraders.io/v2/systems/${system}/waypoints/${waypoint}/shipyard`,
    fetchOptions
  );
  const data = await response.json();

  return (
    <div>
      <h1 className="pt-5 pb-3 font-bold text-2xl">Available Ships:</h1>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Ship Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Supply</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead className="text-right pr-8">Purchase</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {"ships" in data.data ? (
            data.data.ships.map((ship) => (
              <TableRow key={ship.purchasePrice}>
                <TableCell className="font-medium">{ship.type}</TableCell>
                <TableCell>{ship.purchasePrice}</TableCell>
                <TableCell>{ship.supply}</TableCell>
                <TableCell>{ship.activity}</TableCell>
                <TableCell className="text-right">
                  <PurchaseShip
                    ship={ship}
                    session={session}
                    waypoint={waypoint}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <h1>No available ships</h1>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AvailableShips;

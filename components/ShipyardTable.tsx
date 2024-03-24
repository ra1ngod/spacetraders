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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const ShipyardTable = async () => {
  const session = await getServerSession(options);
  const system = session?.user.headquarters.split("-").slice(0, 2).join("-");

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
  };

  const response = await fetch(
    `https://api.spacetraders.io/v2/systems/${system}/waypoints?traits=SHIPYARD`,
    fetchOptions
  );
  const data = await response.json();

  return (
    <div>
      <h1 className="pt-5 pb-3 font-bold text-2xl">Shipyards:</h1>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Waypoint</TableHead>
            <TableHead>Coordinates</TableHead>
            <TableHead>Shipyard Type</TableHead>
            <TableHead>Ships</TableHead>
            <TableHead>Traits</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((shipyard) => (
            <TableRow key={shipyard.symbol}>
              <TableCell className="font-medium">{shipyard.symbol}</TableCell>
              <TableCell>{`(${shipyard.x}, ${shipyard.y})`}</TableCell>
              <TableCell>{shipyard.type}</TableCell>
              <TableCell>
                <Link
                  className="hover:text-primary"
                  href={{
                    pathname: "/shipyard/ships",
                    query: {
                      system: `${shipyard.systemSymbol}`,
                      waypoint: `${shipyard.symbol}`,
                    },
                  }}
                >
                  View Ships
                </Link>
              </TableCell>
              <Drawer>
                <DrawerTrigger>
                  {
                    <TableCell className="text-right">
                      <Button>View Traits</Button>
                    </TableCell>
                  }
                </DrawerTrigger>
                <DrawerContent className="border border-primary">
                  <DrawerHeader>
                    <DrawerTitle>{shipyard.symbol}</DrawerTitle>
                    <DrawerDescription>
                      <div className="flex">
                        {shipyard.traits.map((trait) => (
                          <div
                            key={trait.symbol}
                            className="w-full md:w-1/10 lg:w-1/10 p-4"
                          >
                            <Card className="h-full border border-primary">
                              <CardHeader>
                                <div className="flex items-center">
                                  <CardTitle className="font-bold text-lg">
                                    {trait.name}
                                  </CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="mr-2 text-sm font-normal">
                                {trait.description}
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose>
                      <Button variant="outline" className="bg-primary">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ShipyardTable;

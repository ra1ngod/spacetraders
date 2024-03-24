import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
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
import { Container, Fuel, Pickaxe } from "lucide-react";

const ShipsTable = async () => {
  const session = await getServerSession(options);

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
  };
  let data = [];

  const response = await fetch(
    "https://api.spacetraders.io/v2/my/ships",
    fetchOptions
  );
  if (response.ok) {
    const resData = await response.json();
    data = resData["data"];
  }

  return (
    <div>
      <h1 className="pt-5 pb-3 font-bold text-2xl">Your Ships:</h1>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Ship Name</TableHead>
            <TableHead>Faction</TableHead>
            <TableHead>Ship Waypoint</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ship) => (
            <TableRow key={ship.symbol}>
              <TableCell className="font-medium">{ship.symbol}</TableCell>
              <TableCell>{ship.registration.factionSymbol}</TableCell>
              <TableCell>{ship.nav.waypointSymbol}</TableCell>
              <TableCell>{ship.nav.status}</TableCell>
              <Drawer>
                <DrawerTrigger>
                  {
                    <TableCell className="text-right">
                      <Button>Show Details</Button>
                    </TableCell>
                  }
                </DrawerTrigger>
                <DrawerContent className="border border-primary">
                  <DrawerHeader>
                    <DrawerTitle>{ship.symbol}</DrawerTitle>
                    <DrawerDescription>
                      <div className="flex">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Mounts
                                </CardTitle>
                                <Pickaxe className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-l">
                              {ship.mounts.map((mount) => (
                                <div key={mount.symbol}>{mount.symbol}</div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Inventory
                                </CardTitle>
                                <Container className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-l">
                              {ship.cargo.inventory.map((item) => (
                                <div key={item}>{item}</div>
                              ))}
                            </CardContent>
                          </Card>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Fuel
                                </CardTitle>
                                <Fuel className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-3xl text-center">
                              <div>
                                {ship.fuel.capacity
                                  ? (ship.fuel.current / ship.fuel.capacity) *
                                    100
                                  : "0"}
                                %
                              </div>
                            </CardContent>
                          </Card>
                        </div>
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

export default ShipsTable;

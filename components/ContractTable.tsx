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
import { Container, HandCoins, Pickaxe, ShieldHalf } from "lucide-react";
import AcceptComplete from "./AcceptComplete";

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
    "https://api.spacetraders.io/v2/my/contracts",
    fetchOptions
  );
  if (response.ok) {
    const resData = await response.json();
    data = resData["data"];
  }

  return (
    <div>
      <h1 className="pt-5 pb-3 font-bold text-2xl">Your Contracts:</h1>
      <Table className="border border-primary">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Contract id</TableHead>
            <TableHead>Contract Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time Left</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-medium">{contract.id}</TableCell>
              <TableCell>{contract.type}</TableCell>
              <TableCell>
                {contract.accepted ? "In Progress" : "Not Accepted"}
              </TableCell>
              <TableCell>
                {contract.accepted
                  ? contract.terms.deadline
                  : `${contract.deadlineToAccept} (to accept)`}
              </TableCell>
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
                    <DrawerTitle>{contract.id}</DrawerTitle>
                    <DrawerDescription>
                      <div className="flex">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Payment
                                </CardTitle>
                                <HandCoins className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-l">
                              <span>
                                On Accepted: {contract.terms.payment.onAccepted}
                              </span>
                              <br />
                              <span>
                                On Fulfilled:{" "}
                                {contract.terms.payment.onFulfilled}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Delivery Details
                                </CardTitle>
                                <Container className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-l">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="w-[150px]">
                                      Resource
                                    </TableHead>
                                    <TableHead>Delivery Destination</TableHead>
                                    <TableHead>Units Required</TableHead>
                                    <TableHead>Units Fulfilled</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {contract.terms.deliver.map((resource) => (
                                    <TableRow key={resource.tradeSymbol}>
                                      <TableCell>
                                        {resource.tradeSymbol}
                                      </TableCell>
                                      <TableCell>
                                        {resource.destinationSymbol}
                                      </TableCell>
                                      <TableCell>
                                        {resource.unitsRequired}
                                      </TableCell>
                                      <TableCell>
                                        {resource.unitsFulfilled}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                          <Card className="h-full border border-primary">
                            <CardHeader>
                              <div className="flex items-center">
                                <CardTitle className="mr-2 text-sm font-normal">
                                  Faction
                                </CardTitle>
                                <ShieldHalf className="h-4 w-4 opacity-80" />
                              </div>
                            </CardHeader>
                            <CardContent className="font-bold text-3xl text-center">
                              <div>{contract.factionSymbol}</div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <div className="flex justify-center w-full gap-10">
                      <AcceptComplete contract={contract} session={session} />
                      <DrawerClose>
                        <Button variant="outline" className="bg-primary">
                          Close
                        </Button>
                      </DrawerClose>
                    </div>
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

import React from "react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, HandCoins, ShieldHalf, User } from "lucide-react";

const InfoCards = async () => {
  const session = await getServerSession(options);

  const fetchOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.id}`,
    },
  };

  const response = await (
    await fetch("https://api.spacetraders.io/v2/my/agent", fetchOptions)
  ).json();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex wrap">
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <Card className="h-full border border-primary">
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle className="mr-2 text-sm font-normal">
                      Username
                    </CardTitle>
                    <User className="h-4 w-4 opacity-80" />
                  </div>
                </CardHeader>
                <CardContent className="font-bold text-l">
                  {session.user.username}
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <Card className="h-full border border-primary">
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle className="mr-2 text-sm font-normal">
                      Credits
                    </CardTitle>
                    <HandCoins className="h-4 w-4 opacity-80" />
                  </div>
                </CardHeader>
                <CardContent className="font-bold text-l">
                  {response.data.credits}
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <Card className="h-full border border-primary">
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle className="mr-2 text-sm font-normal">
                      Headquarters
                    </CardTitle>
                    <Building className="h-4 w-4 opacity-80" />
                  </div>
                </CardHeader>
                <CardContent className="font-bold text-l">
                  {session.user.headquarters}
                </CardContent>
              </Card>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4 p-4">
              <Card className="h-full border border-primary">
                <CardHeader>
                  <div className="flex items-center">
                    <CardTitle className="mr-2 text-sm font-normal">
                      Faction
                    </CardTitle>
                    <ShieldHalf className="h-4 w-4 opacity-80" />
                  </div>
                </CardHeader>
                <CardContent className="font-bold text-l">
                  {session.user.faction}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;

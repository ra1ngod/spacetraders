import React from "react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import ShipyardTable from "@/components/ShipyardTable";

const Shipyard = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      {session ? (
        <div>
          <ShipyardTable />
        </div>
      ) : (
        <Link href="/signup" className="hover:text-primary">
          Signup
        </Link>
      )}
    </div>
  );
};

export default Shipyard;

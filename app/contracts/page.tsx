import React from "react";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";
import Link from "next/link";
import ContractTable from "@/components/ContractTable";

const Contracts = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      {session ? (
        <div>
          <ContractTable />
        </div>
      ) : (
        <Link href="/signup" className="hover:text-primary">
          Signup
        </Link>
      )}
    </div>
  );
};

export default Contracts;

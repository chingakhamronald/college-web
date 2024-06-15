"use client";

import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { useQueryUserList } from "@/hook/useQueryUserList";
import { useRouter } from "next/navigation";

const UserList = () => {
  const { userDataList, isLoading } = useQueryUserList();

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table isStriped aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>EMAIL</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {userDataList.map((e: any) => {
          return (
            <TableRow key={e.id}>
              <TableCell>{e.email}</TableCell>
              <TableCell className="uppercase">{e.role}</TableCell>
              <TableCell>
                <div className="relative flex items-center gap-4">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Button
                      onClick={() => {
                        {
                          e.role === "student"
                            ? router.push(`/student/${e.id}`)
                            : router.push(`/teacher/${e.id}`);
                        }
                      }}
                      disabled={e.role === "admin" ? true : false}
                    >
                      Update Profile
                    </Button>
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default UserList;

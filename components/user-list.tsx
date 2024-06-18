'use client';

import {
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useQueryUserList } from '@/hook/useQueryUserList';
import { useRouter } from 'next/navigation';
import { useQueryTeacherList } from '../hook/useQueryTeacherList';
import { useQueryStudentList } from '../hook/useQueryStudentList';

const UserList = () => {
  const [activeTab, setActiveTab] = useState(1);

  const router = useRouter();
  const handleTabChange = (tabIndex: any) => {
    setActiveTab(tabIndex);
  };
  const { data: studentDataList, isLoading: studentLoading } =
    useQueryStudentList();
  const { data: teacherDataList, isLoading: teacherLoading } =
    useQueryTeacherList();

  if (teacherLoading || studentLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="flex px-3 py-2   ">
        <button
          className={`px-4 py-2 ${
            activeTab === 1 ? 'bg-gray-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleTabChange(1)}
        >
          Teacher
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 2 ? 'bg-gray-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleTabChange(2)}
        >
          Student
        </button>
      </div>
      <div>
        {activeTab === 1 && (
          <Table isStriped aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>EMAIL</TableColumn>
              <TableColumn>ROLE</TableColumn>
              <TableColumn>DEPARTMENT</TableColumn>
              <TableColumn>ACTION</TableColumn>
            </TableHeader>
            <TableBody>
              {teacherDataList.map((e: any) => {
                return (
                  <TableRow key={e.id}>
                    <TableCell>{e.email}</TableCell>
                    <TableCell className="uppercase">{e.role}</TableCell>

                    <TableCell className="uppercase">
                      {e?.teacher?.department}
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center gap-4">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <Button
                            onClick={() => {
                              // {
                              //   e.role === 'student'
                              //     ? router.push(`/student/${e.id}`)
                              //     : router.push(`/teacher/${e.id}`);
                              // }
                              router.push(
                                `/dashboard/teacher/${e?.teacher?.id}`
                              );
                            }}
                            disabled={e.role === 'admin' ? true : false}
                          >
                            View
                          </Button>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {activeTab === 2 && (
          <div>
            {studentDataList && (
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>EMAIL</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>DEPARTMENT</TableColumn>
                  <TableColumn>SEMESTER</TableColumn>
                  <TableColumn>ACTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {studentDataList.map((e: any) => {
                    return (
                      <TableRow key={e.id}>
                        <TableCell>{e.email}</TableCell>
                        <TableCell className="uppercase">{e.role}</TableCell>

                        <TableCell className="uppercase">
                          {e?.student?.department}
                        </TableCell>
                        <TableCell className="uppercase">
                          {e?.student?.semester}
                        </TableCell>
                        <TableCell>
                          <div className="relative flex items-center gap-4">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <Button
                                onClick={() => {
                                  // {
                                  //   e.role === 'student'
                                  //     ? router.push(`/student/${e.id}`)
                                  //     : router.push(`/teacher/${e.id}`);
                                  // }
                                  router.push(
                                    `/dashboard/student/${e?.student?.id}`
                                  );
                                }}
                                disabled={e.role === 'admin' ? true : false}
                              >
                                View
                              </Button>
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;

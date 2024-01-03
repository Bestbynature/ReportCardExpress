'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { deleteStudent, editStudent, fetchStudents } from './action';
import DeleteComponent from './DeleteComponent';
import EditComponent from './EditComponent';
import TeacherList from './TeacherList';
import Unauthorised from '@/components/Unauthorised';
import { StudentType } from '@/lib/types/types';
import { useSession } from 'next-auth/react';
import LoadingPage from '../loading';

const AllStudentsPage = () => {
  const { data: session } = useSession();

  const [students, setStudents] = useState<StudentType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([] as StudentType[]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetchStudents().then((fetchedStudents) => {
      setStudents(fetchedStudents);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const search = searchQuery.toLowerCase().trim();
    const filtered = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(search) || student.currentClass.toLowerCase().includes(search);
    });
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  if (session && session.user.role !== 'adminRole') {
    return <Unauthorised />;
  }

  const updateScreen = (studentId: string) => {
    setStudents((prev) => prev.filter((student) => student.studentId !== studentId));
  };

  return (
    <div className="overflow-x-auto flex flex-col justify-center items-center">
      <div className=" flex flex-col gap-4 sm:flex-row mt-2">
        <TeacherList />

        <input
          type="text"
          placeholder="Search by name or class"
          value={searchQuery}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {loading ? (
        <>
          <div className="font-bold text-lg text-center mt-5">Loading Students ...</div>
          <LoadingPage />
        </>
      ) : filteredStudents.length > 0 ? (
        <table className="table max-w-[600px] mt-5">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="text-center">Picture and Name</th>
              <th>Date Registered</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.studentId} className="hover">
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={student.profilePhotoUrl || ''}
                          width={40}
                          height={40}
                          alt={student.firstName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{`${student.firstName[0]
                        .toUpperCase()
                        .concat(student.firstName.slice(1))} ${student.lastName[0]
                        .toUpperCase()
                        .concat(student.lastName.slice(1))}`}</div>
                      <div className="text-sm opacity-50">{student.gender}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {student.currentClass}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {student.createdAt.toLocaleString()}
                  </span>
                </td>
                <td className="flex items-center justify-center gap-2">
                  <EditComponent id={student.studentId} editStudent={editStudent} />

                  <DeleteComponent
                    studentId={student.studentId}
                    deleteStudent={deleteStudent}
                    profilePhotoUrl={student.profilePhotoUrl || ''}
                    updateScreen={updateScreen}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="font-bold text-lg text-center mt-5">No Student Found</div>
      )}
    </div>
  );
};

export default AllStudentsPage;

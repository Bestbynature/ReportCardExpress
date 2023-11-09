"use server"
import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';
import { deleteStudent, editStudent } from './action';
import DeleteComponent from './DeleteComponent';
import EditComponent from './EditComponent';

const AllStudentsPage = async () => {

  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });


  if (students.length < 1) return <div className="font-bold text-lg">No students found</div>;

  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="table max-w-[600px]">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th className='text-center'>Picture and Name</th>
            <th>Date Registered</th>
            <th className='text-center'>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId} className='hover'>
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
                    <div className="font-bold">{`${student.firstName[0].toUpperCase().concat(student.firstName.slice(1))} ${student.lastName[0].toUpperCase().concat(student.lastName.slice(1))}`}</div>
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
              <td className='flex items-center justify-center gap-2'>
                
                <EditComponent id={student.studentId } editStudent={editStudent} />

                <DeleteComponent
                  studentId={student.studentId}
                  deleteStudent={deleteStudent}
                />
                
              </td>
            </tr>
          ))}
        </tbody>

        {/* <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date Registered</th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default AllStudentsPage;

import { prisma } from '@/lib/db/prisma';
import Image from 'next/image';

const AllStudentsPage = async () => {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: 'desc' },
  });

  if (students.length < 1) return <div className="font-bold text-lg">No students found</div>;

  return (
    <div className="overflow-x-auto flex justify-center">
      <table className="table max-w-[500px]">
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Date Registered</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
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
                    <div className="font-bold">{`${student.firstName} ${student.lastName[0]}.`}</div>
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

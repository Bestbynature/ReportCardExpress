import ResultEnquiry from '@/components/ResultEnquiry';
import { ParsedResultsType, StudentType } from '@/lib/types/types';
import { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { fetchClassStudents } from '../upload-result/actions';
import FormSubmit from '@/components/FormSubmit';
import { prisma } from '@/lib/db/prisma';


const fetchClassResults = async (formData: FormData) => {
  'use server';

  const chosenSession = formData.get('currentSession')?.toString();
  const chosenClass = formData.get('class')?.toString();
  const chosenSubject = formData.get('subject')?.toString();
  const chosenTerm = formData.get('currentTerm')?.toString();
  const chosenExamination = formData.get('examination')?.toString();

  if (!chosenSession || !chosenClass || !chosenSubject || !chosenTerm || !chosenExamination) {
    return;
  }

  const students = await prisma.student.findMany({
    where: {
      currentClass: chosenClass,
      // currentSession: chosenSession,
    },
  });

  const classResult = await prisma.result.findMany({
    where: {
      student: {
        currentClass: chosenClass,
        // currentSession: chosenSession,
      },
    },
  });

  const parsedResult: ParsedResultsType = JSON.parse(JSON.stringify(classResult));

  parsedResult.forEach((result) => {
    const { studentId, scoreObject, resultId } = result;

    const retrievedScores = scoreObject;

    const worksite = retrievedScores[chosenSession][chosenTerm][chosenExamination];

    const scoreIndex = worksite.findIndex((item) => chosenSubject in item);
    if (scoreIndex !== -1) {
      const score = worksite[scoreIndex][chosenSubject];
    }
  });

  return students;
};


const ViewResultPage = () => {
  // const [students, setStudents] = useState<StudentType[]>([]);

  // const [scores, setScores] = useState<{ studentId: string; score: string }[]>([]);

  // const [formValues, setFormValues] = useState({
  //   currentSession: '2023/2024',
  //   currentTerm: '',
  //   examination: '',
  //   class: '',
  //   subject: '',
  // });

  // const handleFormChange = (event: SelectChangeEvent) => {
  //   const { name, value } = event.target;
  //   setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  // };

  // const loadClassStudents = async (event: SelectChangeEvent) => {
  //   const { name, value } = event.target;
  //   setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  //   const response = await fetchClassStudents(value);

  //   if (response) {
  //     setStudents(response);

  //     const initialScores = response.map((student) => ({
  //       studentId: student.studentId,
  //       score: '0',
  //     }));
  //     setScores(initialScores);
  //   }
  // };

  
  return (
    <div>
      <h2> View Result Page</h2>
      <form action={fetchClassResults}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultEnquiry />
        </div>

        <FormSubmit className="btn btn-block mt-4">Get Class Result</FormSubmit>
      </form>

      <div className="overflow-x-auto flex justify-center">
          <table className="table max-w-[500px]">
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Full Name</th>
                <th>score</th>
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
    </div>
  );
};

export default ViewResultPage;

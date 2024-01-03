'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, SelectChangeEvent } from '@mui/material';
import { examinationsUpload } from '../../../constants/landingpage';
import { fetchClassStudents, uploadResultAction } from './actions';
import { StudentType } from '@/lib/types/types';
import UploadButton from './UploadButton';
import ResultEnquiry from '@/components/ResultEnquiry';
import { useSession } from 'next-auth/react';

type UserRoleProp = {
  userRole: string | null | undefined;
};

const UploadResultpage = ({userRole}: UserRoleProp) => {

  const { data: session, status } = useSession();

  const [students, setStudents] = useState<StudentType[]>([]);

  const [scores, setScores] = useState<{ studentId: string; score: string }[]>([]);

  const [formValues, setFormValues] = useState({
    currentSession: '2023/2024',
    currentTerm: '',
    examination: '',
    class: '',
    subject: '',
  });

  const handleFormChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };

  const loadClassStudents = async (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
    const response = await fetchClassStudents(value);

    if (response) {
      setStudents(response);

      const initialScores = response.map((student) => ({
        studentId: student.studentId,
        score: '0',
      }));
      setScores(initialScores);
    }
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>, studentId: string) => {
    const { value } = event.target;
    const updatedScores = [...scores];

    const scoreIndex = updatedScores.findIndex((score) => score.studentId === studentId);

    if (scoreIndex !== -1) {
      updatedScores[scoreIndex].score = value;
    } else {
      if (value !== '') updatedScores.push({ studentId, score: value });
    }

    setScores(updatedScores);
  };

  if (status === 'unauthenticated') {
    return (
      <div className="text-red-700 text-center font-bold">
        <h1>You are not authorized to access this page!</h1>
        <h1>Please sign in by clicking the button below to gain access.</h1>

        <a href="/api/auth/signin?callbackUrl=/upload-result" className="btn btn-secondary my-4">
          Sign In
        </a>
      </div>
    );
  }

  return (
    <form className="m-auto md:max-w-[60%]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultEnquiry
          formValues={formValues}
          handleFormChange={handleFormChange}
          loadClassStudents={loadClassStudents}
          options={examinationsUpload}
          userRole={userRole}
        />
      </div>

      {formValues.currentSession &&
        formValues.currentTerm &&
        formValues.examination &&
        formValues.class &&
        formValues.subject && (
          <>
            <div className="overflow-x-auto mt-5">
              <h2 className="font-bold text-center">{`Please input ${formValues.currentTerm} ${formValues.examination} results for all ${formValues.class} students in ${formValues.subject}`}</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="min-w-fit">Full Name</th>
                    <th>{`${formValues.currentTerm} Score`}</th>
                    {/* <th>StudentId</th> */}
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.studentId}>
                      <th>{index + 1}</th>
                      <td className="font-bold">{`${student.lastName} ${student.firstName}`}</td>
                      <td>
                        <input
                          className="input w-full input-bordered"
                          type="text"
                          name="studentScoreField"
                          value={
                            scores.find((score) => score.studentId === student.studentId)?.score
                          }
                          onChange={(event) => handleScoreChange(event, student.studentId)}
                        />
                      </td>
                      {/* <td>
                        <input
                          className="input w-full input-bordered"
                          type="text"
                          name="studentIdField"
                          value={student.studentId}
                          readOnly
                        />{' '}
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <UploadButton
              scores={scores}
              formValues={formValues}
              uploadResultAction={uploadResultAction}
            />
          </>
        )}
    </form>
  );
};

export default UploadResultpage;

'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { RHFSelect } from '@/components/RHFSelect';
import { sessions, terms } from '../../../constants';
import { SelectChangeEvent } from '@mui/material';
import { classes, examinations, subjects } from '../../../constants/landingpage';
import { fetchClassStudents, uploadResultAction } from './actions';
import { StudentType } from '@/lib/types/types';
import FormSubmit from '@/components/FormSubmit';

const UploadResultpage = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  
  const [scores, setScores] = useState<{ studentId: string; score: number }[]>([]);

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

    if (response){
      setStudents(response);

      const initialScores = response.map((student) => ({
        studentId: student.studentId,
        score: 0, 
      }));
      setScores(initialScores);
    } 
  };

  const handleScoreChange = (event: ChangeEvent<HTMLInputElement>, studentId: string) => {
    const { value } = event.target;
  
    const updatedScores = [...scores];
  
    const scoreIndex = updatedScores.findIndex((score) => score.studentId === studentId);
  
    if (scoreIndex !== -1) {
      updatedScores[scoreIndex].score = parseInt(value);
    } else {
      updatedScores.push({ studentId, score: parseInt(value) });
    }
  
    setScores(updatedScores); 
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const upload = await uploadResultAction({scores, formValues});
  }

  return (
    <form className="m-auto md:max-w-[60%]" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <RHFSelect
          options={sessions}
          value={formValues.currentSession}
          label="currentSession"
          name="currentSession"
          onChange={handleFormChange}
        />

        <RHFSelect
          options={terms}
          value={formValues.currentTerm}
          label="currentTerm"
          name="currentTerm"
          onChange={handleFormChange}
        />

        <RHFSelect
          options={examinations}
          value={formValues.examination}
          label="Examination"
          name="examination"
          onChange={handleFormChange}
        />

        <RHFSelect
          options={classes}
          value={formValues.class}
          label="Class"
          name="class"
          onChange={loadClassStudents}
        />

        <RHFSelect
          options={subjects}
          value={formValues.subject}
          label="Subject"
          name="subject"
          onChange={handleFormChange}
        />
      </div>

      {formValues.currentSession && formValues.currentTerm && formValues.examination && formValues.class && formValues.subject &&   (<div className="overflow-x-auto mt-5">
        <h2 className="font-bold text-center">{`Please input ${formValues.currentTerm} ${formValues.examination} results for all ${formValues.class} students in ${formValues.subject}`}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>{`${formValues.currentTerm} Score`}</th>
              <th>StudentId</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.studentId}>
                <th>{index + 1}</th>
                <td>{`${student.lastName} ${student.firstName}`}</td>
                <td>
                  <input
                    className="input w-full input-bordered"
                    type="number"
                    name="studentScoreField"
                    value={scores.find((score) => score.studentId === student.studentId)?.score}
                    onChange={(event) => handleScoreChange(event, student.studentId)}
                  />
                </td>
                <td>
                  <input
                    className="input w-full input-bordered"
                    type="text"
                    name="studentIdField"
                    value={student.studentId}
                    readOnly
                  />{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}

      <FormSubmit className="btn-block mt-3">Upload Result</FormSubmit>
    </form>
  );
};

export default UploadResultpage;

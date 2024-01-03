import React from 'react';
import { RHFSelect } from './RHFSelect';
import { sessions, terms } from '../../constants';
import { classes, subjects } from '../../constants/landingpage';
import { ResultEnquiryProps } from '@/lib/types/types';

const ResultEnquiry = ({formValues, handleFormChange, loadClassStudents, options, userRole}: ResultEnquiryProps) => {
  return (
    <>
      <RHFSelect
        options={sessions}
        value={formValues?.currentSession}
        label="currentSession"
        name="currentSession"
        onChange={handleFormChange}
      />

      <RHFSelect
        options={terms}
        value={formValues?.currentTerm}
        label="currentTerm"
        name="currentTerm"
        onChange={handleFormChange}
      />

      <RHFSelect
        options={options}
        value={formValues?.examination}
        label="Examination"
        name="examination"
        onChange={handleFormChange}
      />

      <RHFSelect
        options={userRole === 'adminRole' ? classes : classes.filter((classItem) => classItem.teacherEmail === userRole)}
        value={formValues?.class}
        label="Class"
        name="class"
        onChange={loadClassStudents || handleFormChange}
      />

      <RHFSelect
        options={subjects}
        value={formValues?.subject}
        label="Subject"
        name="subject"
        onChange={handleFormChange}
      />
    </>
  );
};

export default ResultEnquiry;

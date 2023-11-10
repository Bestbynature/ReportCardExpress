'use client';

import ResultEnquiry from '@/components/ResultEnquiry';
import { BaseketType2, BasketType } from '@/lib/types/types';
import { SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { fetchClassResults } from './action';
import Image from 'next/image';
import DownloadButton from './DownloadButton';
import { examinationsView } from '../../../constants/landingpage';
import { signIn, useSession } from 'next-auth/react';

const ViewResultPage = () => {
  const { data: session, status } = useSession();

  const [results, setResults] = useState<BasketType[] | BaseketType2[]>([]);
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

  const setTotal = (value: string) => {
    let total;
    if (value === 'First CA' || value === 'Second CA') {
      total = 30.0;
    } else {
      total = 70.0;
    }
    return total;
  };

  const updateResult = (data: BasketType[] | BaseketType2[]) => {
    setResults(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (status === 'unauthenticated') {
    return (
      <div className="text-red-700 text-center font-bold">
        <h1>You are not authorized to access this page!</h1>
        <h1>Please sign in by clicking the button below to gain access.</h1>

        <a
          href="/api/auth/signin?callbackUrl=/view-class-result"
          className="btn btn-secondary my-4"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-center mb-3 capitalize"> View Result Page</h2>
      <p className="mb-5">
        Please note that if you choose All exams under examination, the option will appear blank but
        it will give you the result for all the three exams
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ResultEnquiry
            formValues={formValues}
            handleFormChange={handleFormChange}
            options={examinationsView}
          />
        </div>

        <DownloadButton
          fetchClassResults={fetchClassResults}
          formValues={formValues}
          updateResult={updateResult}
        />
      </form>

      {results.length > 0 && (
        <div className="overflow-x-auto flex flex-col justify-center mt-4">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            {`${formValues.currentTerm}`} Result Table for {`${formValues.subject}`}
          </Typography>
          <h2 className="font-bold text-center">{`${formValues.examination} Results for student in ${formValues.class}`}</h2>
          <table className="table max-w-[500px]">
            <thead>
              <tr>
                <th>#</th>
                <th className="w-auto">{`Student's Full Name (First name first)`}</th>
                {formValues.examination ? (
                  <th>{formValues.examination}</th>
                ) : (results as BaseketType2[])[0] && (results as BaseketType2[])[0].scoreArray ? (
                  (results as BaseketType2[])[0].scoreArray.map((termScore, index) => (
                    <th key={index}>{Object.keys(termScore)[0]} score</th>
                  ))
                ) : null}
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={result.student.profilePhotoUrl || ''}
                            width={40}
                            height={40}
                            alt={`${result.student.firstName} ${result.student.lastName}`}
                            title={`${result.student.firstName} ${result.student.lastName}`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{`${result.student.firstName} ${result.student.lastName}`}</div>
                        <div className="text-sm opacity-50">{result.student.gender}</div>
                      </div>
                    </div>
                  </td>
                  {formValues.examination ? (
                    <td>
                      {(result as BasketType).score}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {(parseFloat((result as BasketType).score) /
                          setTotal(formValues.examination)) *
                          100 >
                        50
                          ? 'Pass'
                          : 'Needs Help'}
                      </span>
                    </td>
                  ) : (result as BaseketType2).scoreArray ? (
                    (result as BaseketType2).scoreArray.map((termScore, scoreIndex) => (
                      <td key={scoreIndex}>
                        {termScore[Object.keys(termScore)[0]]}
                        <br />
                        <span className="badge badge-ghost badge-sm">
                          {(parseFloat(termScore[Object.keys(termScore)[0]]) /
                            setTotal(Object.keys(termScore)[0])) *
                            100 >
                          50
                            ? 'Pass'
                            : 'Need Help'}
                        </span>
                      </td>
                    ))
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewResultPage;

import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import FormSubmit from '@/components/FormSubmit';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import UploadProductImage from '@/components/UploadProductImage';
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import RHFSelectImplement from '@/components/RHFSelect';

export const metadata = {
  title: 'Add student - ReportCardExpress',
};

// async function createAcademicSessionAndTerms( sessionName: string, startDate: Date, endDate: Date, termNames: string[]) {
//   const acadsession = await prisma.academicSession.create({
//     data: { name: sessionName, startDate, endDate },
// });

//   const terms = [];

//   for (const termName of termNames) {
//     const term = await prisma.term.create({
//       data: { name: termName, sessionId: acadsession.sessionId },
//     });
//     terms.push(term);
//   }

//   return { acadsession, terms };
// }

// async function createExaminationsForTerm(term: any, examinationNames: string[]) {
//   const examinations = [];

//   for (const examName of examinationNames) {
//     const examination = await prisma.examination.create({
//       data: { name: examName, termId: term.termId },
//     });
//     examinations.push(examination);
//   }

//   return examinations;
// }


// const createExigencies = async () => {
//   "use server"

//   const september = new Date('September 1, 2023');
//   const july = new Date('July 31, 2024');

//   const { acadsession, terms } = await createAcademicSessionAndTerms('2023/2024', september, july, ['First Term', 'Second Term', 'Third Term']);

// for (const term of terms) {
//   await createExaminationsForTerm(term, ['First CA', 'Second CA', 'Exam']);
// }

// console.log(acadsession, terms)
// return
// }

const addStudent = async (formData: FormData) => {
  'use server';

  const session = getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-student');
  }
  // await createExigencies();

  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const parentEmail = formData.get('parentEmail')?.toString();
  const parentPhoneNumber = formData.get('parentPhoneNumber')?.toString();
  const currentClass = formData.get('currentClass')?.toString();
  const age = Number(formData.get('age')) || 0;
  const gender = formData.get('gender')?.toString() || ''
  const profilePhotoUrl = formData.get('profilePhotoUrl')?.toString();
  const currentSession = formData.get('currentSession')?.toString();

  if(!firstName || !lastName || !parentEmail || !parentPhoneNumber || !currentClass || !age || !currentSession) {
    throw new Error('All fields are required');
  }

  if(!profilePhotoUrl) throw new Error('Please upload a profile photo');

  const student = await prisma.student.create({
    data: { firstName, lastName, parentEmail, parentPhoneNumber, currentClass, age, currentSession, gender, profilePhotoUrl},
  });

  // const acadsession = await prisma.academicSession.create({
  //   data: { name: '2023/2024', startDate: september, endDate: july }
  // });

  // const term1 = await prisma.term.create({
  //   data: { name: 'First Term', sessionId: acadsession.sessionId }
  // });
 
  // const term2 = await prisma.term.create({
  //   data: { name: 'Second Term', sessionId: acadsession.sessionId }
  // });

  // const term3 = await prisma.term.create({
  //   data: { name: 'Third Term', sessionId: acadsession.sessionId }
  // });

  redirect('/all-students');
};

const AddStudentComp = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-student');
  }

  const formFields = [
    { name: 'firstName', placeholder: "Student's first name", type: 'text' },
    { name: 'lastName', placeholder: "Student's last name", type: 'text' },
    { name: 'parentEmail', placeholder: "Student's parent email", type: 'email' },
    { name: 'parentPhoneNumber', placeholder: "Student's parent phone number", type: 'text' },
  ];

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add a new Student</h1>
      <form action={addStudent}>
        <UploadProductImage />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {formFields.map((field, index) => (
            <input
              key={index}
              className="input w-full input-bordered"
              required
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}

          <RHFSelectImplement />

          <span className="flex flex-col items-center gap-4">
            <div className='flex items-center gap-5'>
              <FormLabel id="gender-label">Gender</FormLabel>

              <RadioGroup row aria-labelledby="gender-label" defaultValue="female" name="gender">
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </div>
            <input type="number" name="age" placeholder="Student's age" required className="input w-full input-bordered"/>

          </span>
        </div>
        <FormSubmit className="btn-block mt-3">Add Student</FormSubmit>
      </form>
    </div>
  );
};

export default AddStudentComp;

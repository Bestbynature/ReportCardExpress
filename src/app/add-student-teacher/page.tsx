import AddStudentTeacher from './AddStudentTeacher';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import Unauthorised from '@/components/Unauthorised';


const AddStudentTeacherServer = async () => {
  const session = await getServerSession(authOptions);

  if(session && session.user.role !== 'adminRole') {
    return <Unauthorised />
  }

  return (
    <div>
      <AddStudentTeacher />
    </div>
  );
};

export default AddStudentTeacherServer;

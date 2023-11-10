'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { deleteTeacher, editTeacherRecord, fetchTeachers } from './action';
import { TeacherType } from '@/lib/types/types';
import DeleteComponent from './DeleteComponent';
import EditComponent from './EditComponent';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TeacherList() {
  const [open, setOpen] = React.useState(false);
  const [teachers, setTeachers] = React.useState<TeacherType[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const teacherFetcher = async () => {
    const teachersList = await fetchTeachers();
    setTeachers(teachersList);
  };

  const updateScreen = (teacherId: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.teacherId !== teacherId));
  }

  React.useEffect(() => {
    teacherFetcher();
  }, []);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {`Open Teacher's List`}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {'A Complete List of Registered Teachers'}
        </DialogTitle>
        <DialogContent>
          <table className="table max-w-[600px]">
            <thead>
              <tr>
                <th>#</th>
                <th className="text-center">Firstname</th>
                <th className="text-center">Lastname</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Email</th>

                <th>Date Registered</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers &&
                teachers.map((teacher, index) => (
                  <tr key={teacher.teacherId} className="hover">
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">{`${teacher.firstName[0]
                            .toUpperCase()
                            .concat(teacher.firstName.slice(1))} `}</div>
                          <div className="text-sm opacity-50"></div>
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">{`${teacher.lastName[0]
                      .toUpperCase()
                      .concat(teacher.lastName.slice(1))}`}</td>
                    <td className="capitalize">{teacher.gender}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <span className="badge badge-ghost badge-sm">
                        {teacher.createdAt && teacher.createdAt.toLocaleString()}
                      </span>
                    </td>
                    <td className="flex items-center justify-center gap-2">
                      <EditComponent id={teacher.teacherId } editStudent={editTeacherRecord} />

                      <DeleteComponent
                        studentId={teacher.teacherId}
                        deleteStudent={deleteTeacher}
                        updateScreen={updateScreen}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

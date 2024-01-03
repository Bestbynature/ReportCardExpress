import AddStudent from '../src/assets/add-a-student-image.jpg'
import DownloadResult from '../src/assets/upload-happy-image.jpg'
import UploadResult from '../src/assets/view-and-download-result.jpg'
import Student from '../src/assets/profile_placeholder.png'
import StudentandTeacher from '../src/assets/student-and-teacher-2.jpg'
export const landingPageInfo = [
  {id: 1, href: '/add-student-teacher', src: AddStudent, alt: 'Add a Student', title: 'Add a new Student or Teacher', description: 'Add a new student or Teacher to the database by providing the  email, and phone number. You can also add a photo of the student.'},
  {id: 2, href: '/view-class-result', src: DownloadResult, alt: 'Download Result', title: 'View Class Result', description: 'Download the result of a class by providing the class, session, term, and the type of examination.'},
  {id: 3, href: '/upload-result', src: UploadResult, alt: 'Upload Result', title: 'Upload Result', description: 'Upload the result of a class by providing the class, session, term, the type of examination and scores of the students.'},
  {id: 4, href: '/view-student-result', src: Student, alt: 'View Student Result', title: 'View Student Result', description: "Dear Student, you have worked hard and it's time to see your result. Click this card to view your uploaded result."},
  {id: 5, href: '/all-students', src: StudentandTeacher, alt: "View Student and Teacher's list", title: "View Student and Teacher's list", description: "Click this card for a comprehensive overview of all students and teachers already in the database."},
]
// rewrite this to use the type RHFSelectProps
//  options: { value: string, label: string}
export const classes = [
 { value: 'PRY 1', label: 'PRY 1', teacherEmail: 'teacher1@gmail.com'},
  { value: 'PRY 2', label: 'PRY 2', teacherEmail: 'teacher2@gmail.com'},
  { value: 'PRY 3', label: 'PRY 3', teacherEmail: 'teacher3@gmail.com'},
  { value: 'PRY 4', label: 'PRY 4'},
  { value: 'PRY 5', label: 'PRY 5'},
  { value: 'PRY 6', label: 'PRY 6'},
  { value: 'JSS 1', label: 'JSS 1'},
  { value: 'JSS 2', label: 'JSS 2'},
  { value: 'JSS 3', label: 'JSS 3'},
  { value: 'SSS 1', label: 'SSS 1'},
  { value: 'SSS 2', label: 'SSS 2'},
  { value: 'SSS 3', label: 'SSS 3'},
]
// export const classes = [
//   {value: 1, label: 'PRY 1'},
//   {value: 2, label: 'PRY 2'},
//   {value: 3, label: 'PRY 3'},
//   {value: 4, label: 'PRY 4'},
//   {value: 5, label: 'PRY 5'},
//   {value: 6, label: 'PRY 6'},
//   {value: 7, label: 'JSS 1'},
//   {value: 8, label: 'JSS 2'},
//   {value: 9, label: 'JSS 3'},
//   {value: 10, label: 'SSS 1'},
//   {value: 11, label: 'SSS 2'},
//   {value: 12, label: 'SSS 3'},
// ]

export const sessions = [
  {value: '2023/2024', label: '2023/2024'},
]

export const terms = [
  {value: 'First Term', label: 'First Term'},
  {value: 'Second Term', label: 'Second Term'},
  {value: 'Third Term', label: 'Third Term'},
]

export const examinationsUpload = [
  {value: 'First CA', label: 'First CA'},
  {value: 'Second CA', label: 'Second CA'},
  {value: 'Terminal Examination', label: 'Terminal Examination'},
]


export const examinationsView = [
  {value: 'First CA', label: 'First CA'},
  {value: 'Second CA', label: 'Second CA'},
  {value: 'Terminal Examination', label: 'Terminal Examination'},
  {value: '', label: 'All Exams'}
]

export const subjects = [
  {value: 'English Language', label: 'English Language'},
  {value: 'Mathematics', label: 'Mathematics'},
  {value: 'Basic Science', label: 'Basic Science'},
  {value: 'Basic Technology', label: 'Basic Technology'},
  {value: 'Social Studies', label: 'Social Studies'},
  {value: 'Civic Education', label: 'Civic Education'},
  {value: 'Christian Religious Studies', label: 'Christian Religious Studies'},
  {value: 'Islamic Religious Studies', label: 'Islamic Religious Studies'},
  {value: 'French', label: 'French'},
  {value: 'Yoruba', label: 'Yoruba'},
  {value: 'Igbo', label: 'Igbo'},
  {value: 'Hausa', label: 'Hausa'},
  {value: 'Literature in English', label: 'Literature in English'},
  {value: 'History', label: 'History'},
  {value: 'Geography', label: 'Geography'},
  {value: 'Computer Studies', label: 'Computer Studies'},
  {value: 'Agricultural Science', label: 'Agricultural Science'},
  {value: 'Home Economics', label: 'Home Economics'},
  {value: 'Physical and Health Education', label: 'Physical and Health Education'},
  {value: 'Business Studies', label: 'Business Studies'},
  {value: 'Music', label: 'Music'},
  {value: 'Visual Arts', label: 'Visual Arts'},
  {value: 'Verbal Reasoning', label: 'Verbal Reasoning'},
  {value: 'Quantitative Reasoning', label: 'Quantitative Reasoning'},
  {value: 'Vocational Aptitude', label: 'Vocational Aptitude'},
  {value: 'ICT', label: 'ICT'},
  {value: 'Security Education', label: 'Security Education'},
  {value: 'Cultural and Creative Arts', label: 'Cultural and Creative Arts'},
]
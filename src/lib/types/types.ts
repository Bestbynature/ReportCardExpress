import { SelectChangeEvent } from '@mui/material';

export interface ImageCardLinkProps {
  id: number;
  href: string;
  src: any;
  alt: string;
  title: string;
  description: string;
}

export interface RHFSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
}

export interface StudentType {
  studentId: string;
  firstName: string;
  lastName: string;
  gender: string;
  parentPhoneNumber?: string | null;
  parentEmail: string;
  currentClass: string;
  currentSession: string;
  age: number;
  profilePhotoUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UploadResultProps {
  scores: {
    studentId: string;
    score: string;
  }[];
  formValues: {
    currentSession: string;
    currentTerm: string;
    examination: string;
    class: string;
    subject: string;
  };
}

export interface ResultType {
  resultId: string;
  studentId: string;
  scoreObject: any;
  createdAt: Date;
  updatedAt: Date;
}

export type SubjectScoreType = {
  [key: string]: string;
};

export type ScoreObjectType = {
  [academicYear: string]: {
    [term: string]: {
      [examinationType: string]: SubjectScoreType[];
    };
  };
};

export type ParsedResultsType = {
  studentId: string;
  scoreObject: ScoreObjectType;
  resultId: string;
}[];

export type ExtendedParsedResultsType = {
  studentId: string;
  scoreObject: ScoreObjectType;
  resultId: string;
  student: {
    firstName: string;
    lastName: string;
    profilePhotoUrl: string;
    studentId: string;
    gender: string;
  };
}[];

export interface UploadButtonProps {
  scores: {
    studentId: string;
    score: string;
  }[];
  formValues: {
    currentSession: string;
    currentTerm: string;
    examination: string;
    class: string;
    subject: string;
  };
  uploadResultAction: ({ scores, formValues }: UploadResultProps) => Promise<void>;
}

export type DownloadButtonProps = {
  formValues: {
    currentSession: string;
    currentTerm: string;
    examination: string;
    class: string;
    subject: string;
  };
  fetchClassResults: (formvalues: FormValuesType) => Promise<BasketType[] | BaseketType2[]>;
  updateResult: (data: BasketType[] | BaseketType2[]) => void;
}

export type FormValuesType = {
  currentSession: string;
  currentTerm: string;
  examination: string;
  class: string;
  subject: string;
};

export type ResultEnquiryProps = {
  formValues?: {
    currentSession: string;
    currentTerm: string;
    examination: string;
    class: string;
    subject: string;
  };
  handleFormChange?: (event: SelectChangeEvent) => void;
  loadClassStudents?: (event: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
};

export type BasketType = {
  student: {
    firstName: string,
    lastName: string,
    profilePhotoUrl: string
    studentId: string
    gender: string
  },
  score: string
};

export type BaseketType2 = {
  student: {
    firstName: string,
    lastName: string,
    profilePhotoUrl: string
    studentId: string
    gender: string
  },
  scoreArray: ScoreArrayType[]
}

export type ScoreArrayType = {
  [key: string]: string;
}
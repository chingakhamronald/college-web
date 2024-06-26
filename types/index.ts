import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IQuestionProps = {
  question: string;
  semester: string;
  subject: string
  file: any
}

export type ITeacherProps = {
  name: string;
  department: string;
  mobile_number: string;
  address: string
}

export type IStudentProps = {
  name: string;
  department: string;
  mobile_number: string;
  address: string;
  fatherName: string;
  semester: string
}
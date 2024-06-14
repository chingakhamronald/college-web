import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IQuestionProps = {
  name: string;
  semester: string;
  subject: string
}
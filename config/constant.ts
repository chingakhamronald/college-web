import { IQuestionProps, ITeacherProps } from "@/types";
import * as Yup from "yup";


export const initialValues: IQuestionProps = {
  question: "",
  semester: "",
  subject: "",
  file: ""
}


export const validationSchema = Yup.object().shape({
  semester: Yup.string().required("Semester is required"),
  subject: Yup.string().required("Subject is required")
})

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

export const departmentList: { key: string, label: string }[] = [
  { key: "CSE", label: "Computer Science Engineering Department" },
  { key: "CE", label: "Civil Engineering Department" },
  { key: "ME", label: "Mechanical Engineering Department" },

];
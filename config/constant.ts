import { IQuestionProps } from "@/types";
import * as Yup from "yup";


export const initialValues: IQuestionProps = {
  question: "",
  semester: "",
}

export const validationSchema = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  semester: Yup.string().required("Semester is required"),
})

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});
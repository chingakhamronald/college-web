"use client";

import { InputField } from "@/components/custom-field";
import { loginValidationSchema } from "@/config/constant";
import { Button } from "@nextui-org/button";
import { Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex flex-1 justify-center items-center">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            const result = await signIn("credentials", {
              redirect: false,
              email: values.email,
              password: values.password,
            });

            console.log({ "result..": result });

            if (result?.error) {
              setFieldError("email", "Invalid username or password.");
              setFieldError("password", "Invalid username or password.");
            } else {
              window.location.href = "/dashboard";
            }
            setSubmitting(false);
          }}
        >
          <Form>
            <h2 className="text-center text-3xl font-bold mb-2">
              Welcome to Student and Teacher Intereaction
            </h2>
            <h2 className="text-center text-3xl  font-bold mb-4">
              Please Sign In!
            </h2>

            <InputField
              label="Email"
              type="email"
              name="email"
              className="mb-4"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              className="mb-4"
            />

            <Button type="submit" fullWidth color="primary">
              SignIn
            </Button>
            <h1 className="text-center text-lg py-2">OR</h1>
            <Button
              fullWidth
              color="primary"
              onClick={() => router.push("/register")}
            >
              Create New Account
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

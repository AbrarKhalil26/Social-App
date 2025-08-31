import * as z from "zod";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Label, TextInput } from "flowbite-react";
import ValidationError from "../../components/shared/ValidationError";
import { HiInformationCircle } from "react-icons/hi";
import AppButton from "../../components/shared/AppButton";
import { Helmet } from "react-helmet";

const defaultValues = { email: "", password: "" };

const schema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
});

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const { setToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const { data: res, stateText } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        data
      );
      if (res.message === "success") {
        setApiError(null);
        localStorage.setItem("token", res.token);
        setToken(res.token);
        navigate("/");
      } else {
        throw new Error("Something went wrong, Register failed", stateText);
      }
    } catch (error) {
      setApiError(error?.response?.data.error);
    }
  }
  return (
    <>
      <Helmet>
        <title>Kudo | Login</title>
      </Helmet>
      <section className="py-12">
        <div className="container">
          <div className="max-w-lg mx-auto shadow-lg dark:bg-gray-800 px-10 py-8 rounded">
            <h2 className="text-center mb-4 text-3xl">Login</h2>
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* ------------------Email----------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email">Your email</Label>
                </div>
                <TextInput
                  id="email"
                  type="text"
                  placeholder="name@flowbite.com"
                  {...register("email")}
                />
                <ValidationError
                  checked={errors.email}
                  error={errors?.email?.message}
                />
              </div>

              {/* ------------------password----------------- */}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password">Your password</Label>
                </div>
                <TextInput
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                />
                <ValidationError
                  checked={errors.password}
                  error={errors?.password?.message}
                />
              </div>
              <AppButton
                type="submit"
                isLoading={isSubmitting}
                disabled={!isValid}
              >
                Login
              </AppButton>
              {apiError && (
                <Alert color="failure" icon={HiInformationCircle}>
                  <span className="font-medium">{apiError}</span>
                </Alert>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

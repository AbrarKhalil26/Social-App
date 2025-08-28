import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Datepicker, Label, Radio, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../components/shared/ValidationError";
import AppButton from "../../components/shared/AppButton";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: "",
};

const schema = z
  .object({
    name: z
      .string({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long." }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    rePassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }),
    dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),
    gender: z.enum(["female", "male"], {
      message: "Please select a gender",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    control,
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
  });

  async function onSubmit(data) {
    try {
      const { data: res, stateText } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/signup`,
        data
      );
      if (res.message === "success") {
        setApiError(null);
        localStorage.setItem("token", res.token);
        navigate("/");
      } else {
        throw new Error("Something went wrong, login failed", stateText);
      }
    } catch (error) {
      setApiError(error?.response?.data.error);
    }
  }

  

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-lg mx-auto shadow-lg dark:bg-gray-800 px-10 py-8 rounded">
          <h2 className="text-center mb-4 text-3xl">Register</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex max-w-md flex-col gap-4"
          >
            {/* Name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name">Your name</Label>
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Abrar Khalil"
                {...register("name")}
              />
              <ValidationError
                checked={errors.name}
                error={errors?.name?.message}
              />
            </div>

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
            {/* ------------------rePassword----------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                placeholder="********"
                {...register("rePassword")}
              />
              <ValidationError
                checked={errors.rePassword}
                error={errors?.rePassword?.message}
              />
            </div>

            {/* ------------------Data of Birth----------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dateOfBirth">Data of Birth</Label>
              </div>
              <Controller
                render={({ field }) => (
                  <Datepicker
                    {...field}
                    value={field.value ? new Date(field.value) : new Date()}
                    onChange={(date) => {
                      if (date) {
                        const formatedDate = new Date(date).toLocaleString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        ).replaceAll('/', "-");
                        return field.onChange(formatedDate);
                      }
                    }}
                  />
                )}
                name="dateOfBirth"
                control={control}
              />
              <ValidationError
                checked={errors.dateOfBirth}
                error={errors?.dateOfBirth?.message}
              />
            </div>

            {/* ------------------Gender----------------- */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="gender">Gender</Label>
              </div>
              <div className="flex max-w-md flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Radio
                    id="female"
                    name="gender"
                    value="female"
                    {...register("gender")}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="male"
                    name="gender"
                    value="male"
                    {...register("gender")}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
              </div>
              <ValidationError
                checked={errors.gender}
                error={errors?.gender?.message}
              />
            </div>

            <AppButton
              type="submit"
              isLoading={isSubmitting}
              disabled={!isValid}
            >
              Register
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
  );
}

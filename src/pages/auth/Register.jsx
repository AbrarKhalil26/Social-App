import axios from "axios";
import { Button, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    dateOfBirth: '',
    gender: '',
  };

  const {
    register,
    handleSubmit,
    // formState: { error },
    reset,
  } = useForm({
    defaultValues,
  });

  async function onSubmit(data) {
    try {
      const {data: res, stateText} = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        data
      );
      console.log(res);
      
      if (res.message === "success"){
        navigate('/login')
        reset();
      }
      else{
        throw new Error(stateText, res.error)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-lg mx-auto shadow-lg dark:bg-gray-800 px-10 py-8 rounded">
          <h1 className="text-center mb-4">Register</h1>
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
            </div>
            {/* Email */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Your email</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@flowbite.com"
                {...register("email")}
              />
            </div>
            {/* Password */}
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
            </div>
            {/* RePassword */}
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
            </div>
            {/* Data of birth */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dataOfBirth">Data of Birth</Label>
              </div>
              <TextInput
                id="dataOfBirth"
                type="date"
                {...register("dataOfBirth")}
              />
            </div>
            {/* Gender */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dataOfBirth">Gender</Label>
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
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

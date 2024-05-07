import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister } from "../store/slices/authSlice";
import Loader from "../components/UI/loader/Loader";
import { AppContext } from "../App";
import { useContext, useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import useAuthHelper from "../hooks/useAuthHelper";
import Input from "../components/UI/input/Input";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.auth.status);
  const { success, error } = useContext(AppContext);
  const passwordRef = useRef();

  const { passwordInputType, togglePasswordVisibility, checkUsername } = useAuthHelper();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(fetchRegister(values)).unwrap();
      success("You have successfully registered");
      navigate("/login");
    } catch (err) {
      error("Failed to register");
      setError("root", {
        type: "server",
        message: err.message,
      });
      console.log(err);
    }
  };

  let timeout;

  const handleInput = (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      checkUsername({
        username: e.target.value,
      })
        .then(() => {
          setError("username", { message: "" });
        })
        .catch((err) => {
          setError("username", {
            type: "server",
            message: err.message,
          });
        });
    }, 1000);
  };

  return (
    <>
      {status === "loading" ? <Loader type='covering' /> : ""}
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Your Company'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Create new account
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <Input
              label='Username'
              type='text'
              name='username'
              control={control}
              error={errors?.username}
              register={register}
              settings={{
                required: "Enter your username",
                pattern: {
                  value: /^[a-z0-9_](?:[a-z0-9_.]{4,12}[a-z0-9_])?$/,
                  message:
                    "Username must be between 6 and 14 characters and can only contain small letters, numbers, symbols (_.), and must not end with a period",
                },
              }}
              autoComplete='username'
              onInput={handleInput}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />

            <Input
              label='Full name'
              type='text'
              name='fullName'
              control={control}
              error={errors?.fullName}
              register={register}
              settings={{
                required: "Enter your name",
                pattern: {
                  value: /^[A-Za-zА-Яа-я\s]{3,50}$/,
                  message:
                    "The name must be between 3 and 50 characters and can only contain letters and spaces",
                },
              }}
              autoComplete='fullName'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />

            <Input
              label='Email'
              type='email'
              name='email'
              control={control}
              error={errors?.email}
              register={register}
              settings={{ required: "Enter your email" }}
              autoComplete='email'
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Password
                </label>
              </div>
              <div className='mt-2'>
                <div className='relative'>
                  <input
                    id='password'
                    name='password'
                    type={passwordInputType}
                    ref={passwordRef}
                    autoComplete='current-password'
                    {...register("password", {
                      required: "Enter your password",
                      pattern: {
                        value: /^[A-Za-z0-9@#$%^&*_]{8,25}$/,
                        message:
                          "The password must be between 3 and 50 characters and can contain letters, numbers and special characters (@#$%^&*_)",
                      },
                    })}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  {passwordInputType === "password" ? (
                    <EyeSlashIcon
                      onClick={togglePasswordVisibility}
                      className='eye-icon h-4 w-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4'
                    />
                  ) : (
                    <EyeIcon
                      onClick={togglePasswordVisibility}
                      className='eye-icon h-4 w-4 cursor-pointer absolute top-1/2 -translate-y-1/2 right-4'
                    />
                  )}
                </div>
                <div className='mt-1'>
                  <span className='text-red-600'>{errors.password?.message}</span>
                </div>
              </div>
            </div>

            {errors.root && (
              <div>
                <span className='text-red-600'>{errors.root.message}</span>
              </div>
            )}

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500'
              >
                Sign up
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-500'>
            Already have an accoun?{" "}
            <Link
              to='/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default SignUp;

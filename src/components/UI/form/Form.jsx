import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { SettingsContext } from "../../../routes/Settings";
import Input from "../input/Input";
import { RootContext } from "../../../routes/Root";

const Form = () => {
  const { modalTitle, handleOk, handleCancel } = useContext(SettingsContext);
  const { userData } = useContext(RootContext);

  const {
    register,
    control,
    setValue,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: userData.username || "",
      email: userData.email || "",
      fullName: userData.fullName || "",
      bio: userData.bio || "",
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    },
    mode: "onChange",
  });

  const onCancel = () => {
    setValue("username", userData.username);
    setValue("fullName", userData.fullName);
    setValue("email", userData.email);
    setValue("bio", userData.bio);
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleOk)}>
      {modalTitle === "Username" ? (
        <Input
          type='text'
          name='username'
          control={control}
          error={errors?.username}
          register={register}
          settings={{
            required: "Enter your username",
            minLength: 6,
            maxLength: 14,
          }}
        />
      ) : modalTitle === "Email address" ? (
        <Input
          name='email'
          type='email'
          control={control}
          error={errors?.email}
          register={register}
          settings={{
            required: "Enter your email address",
          }}
        />
      ) : modalTitle === "Password" ? (
        <div className='flex flex-col gap-6'>
          <Input
            label='Old password'
            name='oldPassword'
            type='password'
            control={control}
            error={errors?.oldPassword}
            register={register}
            settings={{
              required: "Enter your old password",
              minLength: 6,
            }}
          />
          <Input
            label='New password'
            name='newPassword'
            type='password'
            control={control}
            error={errors?.newPassword}
            register={register}
            settings={{
              required: "Enter your new password",
              minLength: 6,
            }}
          />
          <Input
            label='Confirm your password'
            name='newPasswordConfirm'
            type='password'
            control={control}
            error={errors?.confirmPassword}
            register={register}
            settings={{
              required: "Confirm your new password",
              minLength: 6,
            }}
          />
        </div>
      ) : (
        <div>
          <div className='my-5'>
            <Input
              label='Full name'
              name='fullName'
              type='text'
              control={control}
              error={errors?.fullName}
              register={register}
              settings={{
                required: "Enter your name",
                minLength: 3,
                maxLength: 50,
              }}
            />
          </div>
          <div>
            <Input
              label='Bio'
              name='bio'
              type='text'
              control={control}
              error={errors?.bio}
              register={register}
              settings={{
                required: false,
                maxLength: 160,
              }}
            />
          </div>
        </div>
      )}
      <div className='flex justify-end gap-4 mt-10'>
        <Button variant='outlined' onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant='contained'
          type='primary'
          htmlType='submit'
          loading={isSubmitting}
          disabled={!isValid}
        >
          Save
        </Button>
      </div>
    </form>
  );
};
export default Form;

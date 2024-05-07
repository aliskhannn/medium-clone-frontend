import styles from "./input.module.scss";
import { useController } from "react-hook-form";

const Input = ({ name, control, label, register, settings, error, ...rest }) => {
  const { field } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium leading-6 text-gray-900 mb-2'>
        {label}
      </label>
      <input
        id={name}
        value={field.value}
        onChange={field.onChange}
        className={`${styles.field} ${error?.message ? styles.error : ""} mb-2`}
        ref={field.ref}
        name={name}
        autoComplete='true'
        {...register(name, settings)}
        {...rest}
      />
      {/* {error?.message && <span className='text-red-600'>{error?.message}</span>} */}
      <div className='mt-1'>
        <span className='text-red-600'>{error?.message}</span>
      </div>
    </div>
  );
};
export default Input;

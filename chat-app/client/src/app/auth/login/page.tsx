'use client';

import TextInput from '@/components/common/textInput/textInput';
import CustomButton from '@/components/common/customButton/customButton';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormValues } from '..';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/auth/auth.actions';
import { AppDispatch } from '@/redux/store';

const schema = yup.object({
   email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
   password: yup.string().required('Password is a required field'),
});

export default function LoginPage() {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FormValues>({ defaultValues: { email: '', password: '' }, resolver: yupResolver(schema) });
   const dispatch = useDispatch<AppDispatch>();

   const submiHander = function (data: FormValues) {
      dispatch(login(data));
   };

   return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
         <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">LogIn</span>
         </h2>
         <form onSubmit={handleSubmit(submiHander)}>
            <div className="mb-6">
               <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <TextInput
                        lable={'Email'}
                        onChange={onChange}
                        value={value}
                        id={'email'}
                        type={'email'}
                        placeHolder={'Enter your email'}
                     />
                  )}
               />
            </div>
            <div className="mb-6">
               <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                     <TextInput
                        lable={'Password'}
                        id={'Password'}
                        onChange={onChange}
                        value={value}
                        type={'Password'}
                        placeHolder={'Enter your password'}
                     />
                  )}
               />
            </div>
            <div className="flex items-center justify-center">
               <CustomButton text={'login'} type={'submit'} />
            </div>
            <div className="text-center mt-4">
               <a href="#" className="text-gray-600 hover:underline">
                  Forgot password?
               </a>
            </div>
         </form>
         <p className="text-center text-gray-600 mt-6">
            Don't have an account?
            <Link href="/auth/singin" className="text-blue-500 hover:underline">
               Sign up
            </Link>
         </p>
      </div>
   );
}

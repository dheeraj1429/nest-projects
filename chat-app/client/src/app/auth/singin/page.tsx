'use client';

import CustomButton from '@/components/common/customButton/customButton';
import TextInput from '@/components/common/textInput/textInput';
import React from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '..';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
   email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
   password: yup.string().required('Password is a required field'),
});

function SingIn() {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<FormValues>({ defaultValues: { email: '', password: '' }, resolver: yupResolver(schema) });

   const submiHander = function (data: FormValues) {
      console.log(data);
   };

   return (
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
         <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <span className="bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text">LogIn</span>
         </h2>
         <form onSubmit={handleSubmit(submiHander)}>
            <div className="mb-6">
               <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                     <TextInput
                        onChange={onChange}
                        value={value}
                        lable={'Email'}
                        id={'email'}
                        type={'email'}
                        placeHolder={'Enter your email'}
                     />
                  )}
               />
               {errors?.email?.message && <p className="text-sm text-red-500">{errors?.email?.message}</p>}
            </div>
            <div className="mb-6">
               <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                     <TextInput
                        lable={'Password'}
                        id={'Password'}
                        type={'Password'}
                        placeHolder={'Enter your password'}
                        onChange={onChange}
                        value={value}
                     />
                  )}
               />
               {errors?.password?.message && <p className="text-sm text-red-500">{errors?.password?.message}</p>}
            </div>
            <div className="flex items-center justify-center">
               <CustomButton text={'Sign in'} type={'submit'} />
            </div>
            <div className="text-center mt-4">
               <a href="#" className="text-gray-600 hover:underline">
                  Forgot password?
               </a>
            </div>
         </form>
         <p className="text-center text-gray-600 mt-6">
            Already have account ?
            <Link href="/auth/login" className="text-blue-500 hover:underline">
               Login
            </Link>
         </p>
      </div>
   );
}

export default SingIn;

'use client';
import { login } from '@/lib/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import { setAccessToken } from '@/lib/cookies';
import { useRouter } from 'next/navigation';

function Login() {
  const router = useRouter();

  const { handleSubmit, register } = useForm();
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: async ({ data }) => {
      const signInResponse = await signIn('credentials', {
        redirect: false,
        username: data.username,
        accessToken: data.accessToken,
      });

      if (signInResponse && signInResponse.error) {
        toast.error('Something went wrong, please try again');
        return;
      }

      setAccessToken(data.accessToken);

      router.replace('/');
      router.refresh();
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      loginMutation.mutate(data);
    },
    [loginMutation]
  );
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">
                Welcome back, Please login into your account
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="username"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="username"
                    {...register('username')}
                  />
                  <label
                    htmlFor="username"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Username
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    {...register('password')}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-blue-500 text-white rounded-md px-2 py-1">
                    Login
                  </button>
                </div>
                <div>
                  <p className="text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-blue-500">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

'use client';
import { createTodo } from '@/lib/repositories/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';

function TodoForm() {
  const queryClient = useQueryClient();
  const { handleSubmit, register } = useForm();

  const createTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast.success('Todo created successfully', {
        position: 'top-left',
        autoClose: 1000,
      });

      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const onSubmit = useCallback(
    (data: any) => {
      createTodoMutation.mutate(data);
    },
    [createTodoMutation]
  );
  return (
    <>
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            id="title"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            {...register('title')}
          />

          <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default TodoForm;

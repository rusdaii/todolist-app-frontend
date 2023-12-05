'use client';
import { deleteTodo } from '@/lib/repositories/todo';
import { useTodos } from '@/query/todos';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

type Todo = {
  title: string;
  id: string;
};

function TodoList() {
  const queryClient = useQueryClient();
  const { data } = useTodos();

  const [todoId, setTodoId] = useState('');

  const todo = data?.data;

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(todoId),
    onSuccess: () => {
      toast.success('Todo deleted successfully', {
        position: 'top-right',
        autoClose: 1000,
      });

      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDelete = useCallback(() => {
    deleteMutation.mutate();
  }, [deleteMutation]);

  return (
    <>
      {todo?.map((item: Todo) => (
        <ul key={item.id} className="divide-y divide-gray-200 px-4">
          <li className="py-4">
            <div className="flex  justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="checkbox checkbox-primary" />
                <label className="ml-3 block text-gray-900">
                  <span className="text-lg">{item.title}</span>
                </label>
              </div>
              <div className="justify-end">
                <button
                  className="btn btn-sm btn-outline btn-error"
                  onClick={() => {
                    setTodoId(item.id);
                    handleDelete();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      ))}
    </>
  );
}

export default TodoList;

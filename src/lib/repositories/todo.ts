import fetcher from '../fetcher';

export type Todo = {
  id: string;
  title: string;
  isPriority: boolean;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type TodoResponse = {
  data: Todo[];
};
export const getTodos = async () => {
  const response = await fetcher({
    url: '/todos',
    method: 'GET',
  });

  return response as TodoResponse;
};

export const createTodo = async ({ title }: { title: string }) => {
  const response = await fetcher({
    url: '/todos',
    method: 'POST',
    body: JSON.stringify({ title }),
  });

  return response;
};

export const deleteTodo = async (id: string) => {
  console.log('id', id);

  const response = await fetcher({
    url: `/todos/${id}`,
    method: 'DELETE',
  });

  return response;
};

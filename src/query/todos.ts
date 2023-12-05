import { getTodos } from '@/lib/repositories/todo';
import { useQuery } from '@tanstack/react-query';

export const getTodosKey = () => ['todos'];

export const useTodos = () => {
  const result = useQuery({
    queryKey: getTodosKey(),
    queryFn: () => getTodos(),
  });

  return result;
};

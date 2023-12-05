import React from 'react';
import TodoForm from '../parts/TodoForm';
import TodoList from '../parts/TodoList';

function Home() {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default Home;

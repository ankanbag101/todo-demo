import Head from "next/head";
import { createContext, useReducer } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { getTodos } from "../helpers/todoHelper";
import ErrorMessage from "../components/ErrorMessage";

export const TodoContext = createContext();

const initialState = {
  reload: false,
  error: "",
};

const reducer = (state, value) => ({ ...state, ...value });

export default function Home({ todoList }) {
  const [state, updateState] = useReducer(reducer, initialState);

  return (
    <div className="container">
      <Head>
        <title>Demo Todo</title>
        <meta name="description" content="A todo app generated using NextJS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TodoContext.Provider value={{ state, updateState }}>
        <div className="mt-5">
          <TodoForm />
        </div>
        <div className="mt-4">
          <TodoList list={todoList} />
        </div>
        <ErrorMessage />
      </TodoContext.Provider>
    </div>
  );
}

export async function getServerSideProps() {
  const todos = await getTodos();
  return {
    props: { todoList: todos.data },
  };
}

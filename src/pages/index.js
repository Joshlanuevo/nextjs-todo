import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

import Header from "../components/Header";
import api from "../../backend/services/api";

export default function Home() {
  const [text, setText] = useState("");
  const [id, setId] = useState(null);
  const [todo, setTodo] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidFormData = () => {
    if (!text) {
      return toast({
        title: "Write something!",
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const createTodo = async (e) => {
    e.preventDefault();

    if (isValidFormData()) return;
    try {
      setIsLoading(true);
      const { data } = await api.post("/todo", { text });
      setTodo(todo.concat(data.data));
      setText("");
      toast({
        title: "Done!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    [
      api.get("/todo").then(({ data }) => {
        setTodo(data.data)
      })
    ]
  }, [todo])

  return (  
    <div>
    <Header />
      <h1 className="p-9">Hello World</h1>
      <div className="p-5 text-center">
        <form onSubmit={createTodo}>
          <label 
            for="default-search" 
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            ADD
          </label>
          <div className="relative">
              <input
                type="text"
                onChange={(e) => setText(e.target.value)}
		            value={text}
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Write your todos..."
                required
              />
              <button 
		            type="submit" 
		            className="text-white absolute right-2.5 bottom-2.5 
                bg-[#242526] hover:bg-gray-500 focus:ring-4 focus:outline-none 
                focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-600
                dark:hover:bg-gray-700 dark:focus:ring-gray-800"
	            >
		            ADD
	            </button>
          </div>
          <ul className="m-5 p-5">
            {todo.map((todo, index) => (
              <li key={index} className="p-5 border">
                <h1>{todo.text}</h1>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  )
  }
  
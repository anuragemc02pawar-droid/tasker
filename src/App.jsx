import { useEffect } from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
//npm uuid
import { v4 as uuidv4 } from "uuid";
//react-icons
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if(todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
    
  }, [])
  

  const saveToLS = (updatedTodos) => {
  localStorage.setItem("todos", JSON.stringify(updatedTodos))
}
 
  const toggleFinished = () => {
  setshowFinished(!showFinished)
}

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
  if (todo.trim() === "") return;

  const newTodos = [
    ...todos,
    {
      id: uuidv4(),
      todo,
      isCompleted: false
    }
  ];

  setTodos(newTodos);
  saveToLS(newTodos);
  setTodo("");
};

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-slate-200 min-h-[80vh] md:w-[35%]">

        <div className="addTodo flex flex-col gap-2">
          <h2 className='text-lg font-bold mb-5 text-w'>Add a Task</h2>
          <input onChange={handleChange} onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();

            }
          }}
            value={todo} className="bg-white py-1 px-5 w-full border-1 rounded-xl " type="text"/>          
            <button onClick={handleAdd} className='bg-pink-600 hover:bg-pink-700 p-3 hover:cursor-pointer py-1 text-white rounded-md text-sm font-bold mb-1'>Save</button> 
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished Tasks
        <h2 className='text-lg font-bold mt-5'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>Start adding your tasks!</div>}
          {todos.map((item) => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex  justify-between items-center">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons my-2 flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-pink-600 hover:bg-pink-700 p-3 hover:cursor-pointer py-2 text-white rounded-md mx-2 text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-pink-600 hover:bg-pink-700 p-3 hover:cursor-pointer py-2 text-white rounded-md mx-2 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

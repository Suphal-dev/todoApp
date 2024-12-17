import React ,{useEffect, useState} from 'react'
import Clock from './Clock'
import Modal from './Modal'
import "../App.css"
import { useNavigate } from "react-router-dom";




const Todos = () => {
  const [isOpen,setIsOpen]=useState(false)
  const [todos,setTodos]=useState(  JSON.parse(localStorage.getItem("todos")) || [] )
  const [user,setUser]=useState("")

  const navigate = useNavigate();


  useEffect(()=>{
    const loggedinUser=JSON.parse(localStorage.getItem("userAuth"))
    setUser(loggedinUser)
  },[])



  const openModal=()=>{
    setIsOpen(true)

  }


  const closeModal=()=>{
    setIsOpen(false)
  }



  const handleClick=()=>{
    openModal()
    
  }

  const onClickSubmit=(todo)=>{
    let todoObj={}
    todoObj.id=Date.now();
    todoObj.todo=todo;
    todoObj.isCompleted=false;
    setTodos([...todos,todoObj])
    localStorage.setItem("todos",JSON.stringify([...todos,todoObj]))





  }


  const handleDelete=(id)=>{
    let updatedtodos=todos.filter((c)=>c.id !== id)
    console.log(updatedtodos)
    setTodos(updatedtodos)
    localStorage.setItem("todos",JSON.stringify(updatedtodos))
    

  }

 

  const handleEdit=(id)=>{
    // let  todo=todos.find((C)=>C.id===id)
    // console.log(todo)
    // setNeedToUpdate(todo.todo)
    // openModal()
    navigate(`/todos/${id}`)


    

  }

  const handleCheckBox=(id)=>{

    setTodos((prevTodos)=>{
      const updatedTodos=prevTodos.map((todo)=>
        todo.id===id ? {...todo,isCompleted:!todo.isCompleted}:todo)

      localStorage.setItem("todos",JSON.stringify(updatedTodos))

      return updatedTodos;
    }
  )

    
    
    
    
    console.log(id)


  }

  


  return (
    <div className='todos'>
        <div className="profile">
            
            <img src="https://as2.ftcdn.net/v2/jpg/09/64/89/19/1000_F_964891988_aeRrD7Ee7IhmKQhYkCrkrfE6UHtILfPp.webp" alt="" />
            <h1>Welcome Back {user}</h1>
        </div>
        <div className="time_container">
            
            <Clock/>
        </div>
        <div className="tasks_container">
           
            <div className="task_title">
                 <h1 className="task_heading">Tasks List</h1>

            </div>
            <div className="todos_container">

              <Modal  isOpen={isOpen}  onClickModalClose={closeModal}   onClickSubmit={onClickSubmit}  />


              {!isOpen && (
                <div>

               <div className="todos_container_heading">
                <img src="Assests/Vector.svg"  onClick={handleClick} alt="" />
              </div>

             
              <div className="todos_list_container">
                {todos.map((c)=>(

                  <div  key={c.id} className="todo_list_box">
                    <input className='todo_checkbox'   checked={c.isCompleted}  onChange={()=>handleCheckBox(c.id)} type='checkbox'/>
                    <p  style={{textDecoration: c.isCompleted ? "line-through" : "none", color: c.isCompleted ? "gray" : "black"}}>{c.todo}</p>
                    <button className="todo_btn" disabled={c.isCompleted} onClick={()=>handleDelete(c.id)}>❌ </button>
                    <button className="todo_btn" disabled={c.isCompleted} onClick={()=>handleEdit(c.id)}> ✏️</button>
                            

                  </div>
                  
                  
                ))

                }
                    
              
        
              </div>
                  
               </div>
               
              

              )}

              
              
              
              
            </div>
        </div>

        
      
    </div>
  )
}

export default Todos

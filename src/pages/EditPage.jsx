import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPage = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(data); 
    const todo = data.find((c) => String(c.id) === String(id)); 
    setInput(todo?.todo || ""); // Initialize the input with the existing value
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (input.trim() === "") {
      toast("please fill the value !");

      return;
    }
    // Update the specific todo item in the todos list
    ///type was differing thats why String used
    const updatedTodos = todos.map((c) => {
      


      if (String(c.id) === String(id)) {
        return { ...c, todo: input };
      }
      return c;
    });

    // Update state and localStorage
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    navigate("/todos");
  };


  const handleCancel=()=>{
    navigate("/todos")
  }


  return (
    <>
      <ToastContainer />
      <div className="modal_container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal_input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=" what you want to do...."
          />
          <div className="modal_btn_container">
            <button className="modal_btn" type="submit">
              Ok
            </button>
            <button className="modal_btn" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPage;

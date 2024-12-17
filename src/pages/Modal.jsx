import React, { useState } from "react";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = ({ isOpen, onClickModalClose, onClickSubmit }) => {
  const [input, setInput] = useState("");

  const handleCancel = () => {
    onClickModalClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast("please fill the value !");

      return;
    }

    onClickSubmit(input);
    onClickModalClose();
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />

      <div className="modal_container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal_input"
            id="edit_modal"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="what you want to do...."
          />
          <div className="modal_btn_container">
            <button className="modal_btn" type="submit">
              Ok
            </button>
            <button className="modal_btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;

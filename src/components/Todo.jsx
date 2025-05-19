import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { deleteTodo, toggleComplete, viewTodo, updateTodo } from "../services/todoServices";


export default function Todo({ todo, reloadTodos }) {
    const [formData, setFormData] = useState({
        name: todo.name,
    });


    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((preFormData) => ({
            ...preFormData,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateTodo(todo._id, formData)
            .then(() => {
                toast.success(`${todo.name} Updated`)
                reloadTodos();
            })
            .catch(error => {
                console.error("Error creating todo:", error);
                toast.error(`${todo.name} update failed`)
            });
    }

    const handleDelete = () => {
        deleteTodo(todo._id).then(() => {
            toast.success(`${todo.name} deleted`)
            reloadTodos();
        });
    };

    const handleToggle = () => {
        toggleComplete(todo._id, todo.completed).then(() => {
            toast.success(`${todo.name} is ${!todo.completed ? 'completed, Delete it' : 'pending'}`)
            reloadTodos();
        });
    };


    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="text-center">
                <h5>{todo.name}</h5>
            </div>
            <div className="d-flex">
                <button className={`btn ${todo.completed ? 'btn-success' : 'btn-warning'} m-2`} onClick={handleToggle} style={{ width: '120px' }}
                >{todo.completed ? 'completed' : 'pending'}</button>

                <button className="btn btn-primary m-2" style={{ width: '100px' }}
                    data-bs-toggle="modal" data-bs-target={`#editModal${todo._id}`}
                >Edit</button>
                <button className="btn btn-danger m-2" style={{ width: '100px' }} onClick={handleDelete}
                >Delete</button>
            </div>

            <div className="modal fade" id={`editModal${todo._id}`} tabIndex="-1" aria-labelledby={`editModal${todo._id}`} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit {todo.name}</h5>
                            <button className="btn-close" data-bs-dismiss='modal' aria-label="close" type="button"></button>
                        </div>
                        <div className="modal-body">
                            <form method="post" onSubmit={handleSubmit}>
                                <label htmlFor="name" className="form-label">Name</label>
                                <input className="form-control" type="text" required name='name' value={formData.name} onChange={handleChange} placeholder="Todo name"
                                />
                                <button type="submit" data-bs-dismiss='modal' className="btn btn-success mt-3 w-50">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
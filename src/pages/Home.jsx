import { useEffect, useState } from "react";
import { getTodos, createTodo } from "../services/todoServices";
import { getUserData } from "../services/userServices";
import Todo from "../components/Todo";
import { toast } from 'react-toastify';


function Home() {
    const [todos, setTodos] = useState(null);
    const [formData, setFormData] = useState({ name: '' });
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        document.title = "CW Todo | Home";
        // reloadTodos();
    }, [])

    useEffect(() => {
        getUserData().then((response) => {
            setUser(response.data)
        }).catch(error => console.error(error)
        );
    }, []);

    useEffect(() => {
        getTodos().then(response => {
            setTodos(response.data);
        })
            .catch(error => console.error('Error fetching todos', error)
            );

    }, []);


    function reloadTodos() {
        getTodos().then(response => {
            setTodos(response.data);
        })
            .catch(error => console.error('Error fetching todos', error)
            );
    };

    if (!todos) return <div className="d-flex flex-column justify-content-center align-items-center fs-4" style={{ height: '100vh' }}>

        <div className="d-flex">
            <a href="/login" className="nav-link text-primary text-end m-3">Login Here</a>
            <a href="/register" className="nav-link text-primary text-end m-3">Register Here</a>
        </div>

    </div>

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createTodo(formData)
            .then(() => {
                reloadTodos();
                toast.success('Todo added successfully!');
            })
            .catch(error => {
                console.error("Error creating todo:", error);
                toast.error('Failed to add todo.');

            });
    };

    const logout = () => {
        localStorage.removeItem('token')
        window.location.reload()
        toast.info('Logout')
    };

    return (
        <div>
            <div className="d-flex justify-content-between mx-5 mt-2">
                <h4 className="text-muted text-capitalize">hello, {user.username}</h4>
                <button className="btn btn-danger" onClick={logout}
                >Logout</button>
            </div>
            <div className="container d-flex flex-column justify-content-center mt-4">
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary"
                        data-bs-toggle="modal" data-bs-target="#addTodoModal"
                    >Add Task</button>
                </div>
                <div className="card shadow-lg m-0" style={{ width: '100%' }}>
                    <div className="card-header bg-primary text-white py-3">
                        <h1 className="card-title text-center p-2">Tasks</h1>
                    </div>
                    <div className="card-body p-2 ">
                        <ul className="list-group">
                            {todos.length > 0 ?
                                todos.map(todo => <li key={todo._id} className="list-group-item">{<Todo todo={todo} reloadTodos={reloadTodos} />}</li>)
                                :
                                <div className="border shadow-sm">
                                    <p className="text-danger fs-5 p-2 text-center ">
                                        Add a Task
                                    </p>
                                </div>
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addTodoModal" tabIndex="-1" aria-labelledby="addTodoModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Todo</h5>
                            <button className="btn-close" data-bs-dismiss='modal' aria-label="close" type="button"></button>
                        </div>
                        <div className="modal-body">
                            <form method="post" onSubmit={handleSubmit}>
                                <label htmlFor="name" className="form-label">Name</label>
                                <input className="form-control" type="text" required name='name' value={formData.name} onChange={handleChange} placeholder="Todo name"
                                />
                                <button type="submit" data-bs-dismiss='modal' className="btn btn-success mt-3 w-50" disabled={!formData.name}>Add</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Home
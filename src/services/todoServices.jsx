import axios from "axios";

const token = localStorage.getItem('token');
// console.log(token);


const API_URL = 'http://localhost:5000/api/todos';

const getTodos = async () => {
    return await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

};

const createTodo = async (formData) => {
    try {
        await axios.post(API_URL, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

    } catch (error) {
        console.error(error);

    }
}
const updateTodo = async (todoID, formData) => {
    try {
        await axios.patch(`${API_URL}/${todoID}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

    } catch (error) {
        console.error(error);

    }
}
const viewTodo = async (todoID) => {
    try {
        return await axios.get(`${API_URL}/${todoID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

    } catch (error) {
        console.error(error);

    }
}
const deleteTodo = async (todoID) => {
    try {
        await axios.delete(`${API_URL}/${todoID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

    } catch (error) {
        console.error(error);

    }
}
const toggleComplete = async (todoID, currentState) => {
    try {
        let newState;
        if (currentState === true) {
            newState = false
        } else {
            newState = true
        }

        await axios.patch(`${API_URL}/${todoID}`, { completed: newState }, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

    } catch (error) {
        console.error(error);

    }
}

export {
    getTodos,
    createTodo,
    viewTodo,
    deleteTodo,
    updateTodo,
    toggleComplete
}
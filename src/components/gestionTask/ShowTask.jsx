import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState({ _id: "", text: "" });
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const url = 'http://localhost:4200/api/v1/taskController';

    const fetchTasks = async () => {
        const res = await fetch(url);
        const myData = await res.json(); 
        setTasks(myData.data.tasks);
    }

    useEffect(() => {
        fetchTasks()
    }, []);

    const handleDelete = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        });
        setTasks(tasks.filter(task => task._id !== id));
        navigate('/');
    }

    const handleUpdate = async () => {
        await fetch(`${url}/${updateTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: updateTask.text })
        });
        fetchTasks();
        setShowPopup(false);
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Tâches:</h2>
            <ul className="w-full">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task._id} className="mb-1">
                            <span className="inline-block w-full text-start bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 relative">
                                <button onClick={() => handleDelete(task._id)} className="absolute inset-y-0 right-0 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md">
                                    Supprimer
                                </button>
                                {task.text}
                                <button onClick={() => { setUpdateTask(task); setShowPopup(true); }} className="absolute inset-y-0 right-24 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md">
                                    Modifier
                                </button>
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">Aucune tâche pour le moment.</li>
                )}
            </ul>

            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2 className="text-xl font-bold mb-2">Modifier la tâche:</h2>
                        <textarea value={updateTask.text} onChange={(e) => setUpdateTask({ ...updateTask, text: e.target.value })} className="w-full h-20 mb-2"></textarea>
                        <div className="flex justify-end">
                            <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">Modifier</button>
                            <button onClick={() => setShowPopup(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowTask;

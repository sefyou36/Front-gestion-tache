import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate

const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate(); // Utilisation de useNavigate
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

        // Mettre à jour l'état après la suppression de la tâche
        setTasks(tasks.filter(task => task._id !== id));

        // Navigation vers une autre route après la suppression de la tâche
        navigate('/'); // Par exemple, retour à la page d'accueil
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Taches:</h2>
            <ul className="w-full">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <li key={task._id} className="mb-1">
                            <span className="inline-block w-full text-start bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 relative">
                                <button onClick={() => handleDelete(task._id)} className="absolute inset-y-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md">
                                    Delete
                                </button>
                                {task.text}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">Aucune tâche pour le moment.</li>
                )}
            </ul>
        </div>
    );
};

export default ShowTask;

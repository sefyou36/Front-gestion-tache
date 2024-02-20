import { useState } from "react"
import { Link } from "react-router-dom";
const AddTask = ()=>{
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask] = useState("")

    
    console.log(newTask)


    const addNewTask = async () =>{
        // Vérifier si le champ est vide
        if (!newTask.trim()) {
            return; // Ne rien faire si le champ est vide
        }
    
        const data =  await fetch('http://localhost:4200/api/v1/taskController',{
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text : newTask
            })
        }).then(res => res.json());
        setTasks([...tasks, data]);
        setNewTask("");
    }
    
    return (

        <>
        <div className="bg-gray-200 flex flex-col p-10 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-10 rounded shadow-md">
            <label htmlFor="task">Ajouter une tache ici!!</label>
            <input type="text" name="task" value={newTask} id="task" placeholder="Ajoute une tache" onChange={(e)=>{setNewTask(e.target.value)}}/>
            <button> <Link to = '/' className="bg-green-300" onClick={addNewTask} >
            Ajouter</Link> 
                </button>
        </div>
      </>
    )
}

export default AddTask
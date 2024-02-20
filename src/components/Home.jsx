import {Link} from 'react-router-dom'
import ShowTask from './gestionTask/ShowTask'

const Home = () =>{
return (
    <div> 
    {/* <h1>Home Page</h1> */}
    <ShowTask/>
     <button className="bg-red-500" >

         <Link to= '/addTask'>Ajouter une tache</Link>
        </button>   
    </div>
)

}

export default Home
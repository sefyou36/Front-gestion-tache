const Contact = () => {
    return (
       <div className="bg-gray-200 p-10 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-10 rounded shadow-md">
         <h2 className="text-2xl font-bold mb-5 text-center">Contactez-nous</h2>
         <form>
           <label className="block mb-2">Nom:</label>
           <input className="w-full p-2 mb-5 rounded" type="text" name="nom" />
   
           <label className="block mb-2">Email:</label>
           <input className="w-full p-2 mb-5 rounded" type="email" name="email" />
   
           <label className="block mb-2">Message:</label>
           <textarea className="w-full p-2 mb-5 rounded" name="message"></textarea>
   
           <button className="bg-blue-500 text-white font-bold p-3 rounded w-full">Envoyer</button>
         </form>
       </div>
    );
   };
   
   export default Contact;
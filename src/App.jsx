import Navbar from "./components/navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import{collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "./config/firebase";
import ContactCards from "./components/ContactCards";
import Modals from "./components/Modals";
import AddandUpdate from "./components/AddandUpdate";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";

const App = () => {

  const[contacts,setcontacts]=useState([]);
  const{isopen,onClose,onOpen} = useDisclose();

  useEffect(()=>{
    const getcontacts = async () =>{
     try {
      const contactref = collection(db,"contact");
      // const contactsnapshot = await getDocs(contactref);

      onSnapshot(contactref,(sanpshot)=>{
        const contactlist = sanpshot.docs.map((doc)=> {
          return{
            id:doc.id,
            ...doc.data(),
          };
        });
        setcontacts(contactlist);
        return contactlist;
      });
    
     } catch (error) {console.log(error)}
    };
    getcontacts();
    // console.log(contacts)
  },[]);

  //search
  const filterContacts =(e)=>{
    const value = e.target.value;
    const contactref = collection(db,"contact");
    onSnapshot(contactref,(sanpshot)=>{
      const contactlist = sanpshot.docs.map((doc)=> {
        return{
          id:doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactlist.filter(contact => contact.Name.toLowerCase().includes(value.toLowerCase()));
      setcontacts(filteredContacts);


      return filteredContacts;
    });
  }
  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">   <Navbar />
    <div className="flex gap-2">
    <div className=" relative flex flex-grow items-center">
     <FiSearch className="ml-1 absolute text-3xl text-white"/>
       <input onChange={filterContacts} type="text" className="h-10 flex-grow rounded-md 
       border border-white bg-transparent text-white pl-9" />
     </div>
    <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white"/>
    </div>
    <div className="mt-4 flex flex-col gap-3">
      {
        contacts.length <= 0 ? <NotFoundContact/> : contacts.map((contact)=>(
        <ContactCards key={contact.id} contact={contact}/>
        ))
      }
    </div>
     </div>
   <AddandUpdate onClose={onClose} isopen={isopen}/>
   <ToastContainer position="bottom-center"/>
     </>
  )
}

export default App
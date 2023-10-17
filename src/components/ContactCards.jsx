import { deleteDoc,doc } from "firebase/firestore"
import { BiEdit, BiSolidTrashAlt } from "react-icons/bi"
import { HiUserCircle } from "react-icons/hi"
import { toast } from "react-toastify";
import {db} from "../config/firebase";
import useDisclose from "../hooks/useDisclose";
import AddandUpdate from "./AddandUpdate";
// eslint-disable-next-line react/prop-types
const ContactCards = ({contact}) => {

  const{isopen,onClose,onOpen} = useDisclose();

  const deleteContact = async(id)=>{
    try {
      await deleteDoc(doc(db,"contact",id));
      toast.success("Contact deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  }
  return (
  <><div key={contact.id} className="bg-yellow flex justify-between items-center p-2 rounded-lg">
  <div className="flex gap-1">
  <HiUserCircle className="text-4xl text-orange"/>
   <div className="">
     <h2 className="font-bold">{contact.Name}</h2>
     <p className="text-sm">{contact.Email}</p>
   </div>
  </div>
   <div className="flex text-3xl">
     <BiEdit onClick={onOpen} className="cursor-pointer"/>
     <BiSolidTrashAlt onClick={()=> deleteContact(contact.id)} className="text-orange cursor-pointer"/>
   </div>
  </div>
  <AddandUpdate contact={contact} isUpdate isopen={isopen} onClose={onClose}/>
  </>
  );
}

export default ContactCards
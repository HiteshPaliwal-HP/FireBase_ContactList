import Modals from "./Modals"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ErrorMessage, Field,Form,Formik} from "formik";
import { addDoc, collection,doc, updateDoc } from "firebase/firestore";
import {db} from "../config/firebase";
import * as Yup from 'yup';

const contactSchemaValidation = Yup.object().shape({
    Name: Yup.string().required("Name is Required"),
    Email: Yup.string().email("Invalid email").required("Email is Required"),

});
const AddandUpdate = ({isopen,onClose,isUpdate,contact}) => {
        //    toast.configure();
        const addContact = async(contact)=>{
        try {
            const contactRef = collection(db,"contact");
            await addDoc(contactRef,contact);
            onClose();
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.log(error);
        }
        }

        const updateContact = async(contact,id)=>{
            try {
                const contactRef = doc(db,"contact",id);
                await updateDoc(contactRef,contact);
                onClose();
                toast.success("Contact Updated Successfully");
            } catch (error) {
                console.log(error);
            }
            }

  return (
    <div>
       <Modals isOpen={isopen} onClose={onClose}>
       <Formik 
       validationSchema={contactSchemaValidation}
       initialValues={
        isUpdate
        ?{
          Name:contact.Name,
          Email:contact.Email,   
       }
       :{
        Name:"",
        Email:"",
       }
       }
       onSubmit={(values)=>{
        console.log(values);
        isUpdate ? updateContact(values,contact.id) :
        addContact(values);
       
       }}
       >
          <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="Name">Name</label>
                <Field name="Name" className="h-10 border"/>
                <div className="text-xs text-red-500">
                    <ErrorMessage name="Name"/>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Emial">Email</label>
                <Field name="Email" className="h-10 border"/>
                <div className="text-xs text-red-500">
                    <ErrorMessage name="Email"/>
                </div>
              </div>

              <button className="self-end border bg-orange px-3 py-1.5">
              {isUpdate ? "update" :"Add"} Contact</button>
          </Form>
       </Formik>
        </Modals>
    </div>
  )
}

export default AddandUpdate

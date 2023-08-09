import React from 'react'
import {AiOutlineClose} from 'react-icons/ai'



const UseModal = ({content,close}) => {
  return (
    <div className='modal-container'>
        
        <div className='modal-content'>
            {content}
            <button style={{cursor:'pointer'}}
                onClick={()=> close()}
                className='modal-close' >
                    <AiOutlineClose/>
                </button>
        </div>

    </div>
  ) 
}



export default UseModal

export const useModal = (content,close) => {
    return (<UseModal content={content} close={close} />)
}




/**
 //! usage 
 import { useModal } from '../../hooks/useModal';
const [modal,setModal] = useState(null);

const closeModal = () => {
    setModal(null);
}
const getModal = (content) => {
    const m = useModal(content,closeModal);
setModal(m);
}
 */
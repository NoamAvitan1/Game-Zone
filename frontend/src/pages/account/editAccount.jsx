import React, { useState } from 'react'
import './editAccount.css';
import ImgDropInput from '../../components/reusfullComponents/imgDropInput/imgDropInput'
import useUser from '../../hooks/useUser';
import {uploadImageToCloudinary} from '../../services/cloudinaryRequests';

export default function EditAccount({closeModal}) {
    const {user,update} = useUser();
    const [imgInput,setImgInput] = useState(null);
    const [err,setErr] = useState(null);

    const handleSubmit = async () => {
        if (!imgInput) return setErr("No image selected") ;
        try {
            await uploadImageToCloudinary([imgInput],"secure_url")
                .then((res) => 
                {   
                    update({image:res[0]});
                    closeModal();
                });
        } catch (error) {
            console.log(error);
            closeModal();
            setErr(error);
        }
    }
  return (
    <div className='EditAccount' >
        <h2>Edit Profile</h2>
        {err && <div className="EditAccount-err-img-input">
            {err}
        </div> }
        {user && 
            (imgInput 
                ? <img src={URL.createObjectURL(imgInput)} alt="current progile img" /> 
                : <img src={user.image} alt="current progile img" />  )
        }
        <div className="EditAccount-img-input">
            <ImgDropInput addImage={(img)=>{
                setImgInput(img);
                setErr(null);
                }}/>
        </div>
        <button
            onClick={()=>handleSubmit()}
            className='update-button'
            >UPDATE</button>
    </div>
  )
}

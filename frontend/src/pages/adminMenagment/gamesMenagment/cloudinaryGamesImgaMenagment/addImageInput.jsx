import React, { useState } from 'react'

import ImgDropInput from '../../../../components/reusfullComponents/imgDropInput/imgDropInput' 
//!add loading its take time
//style
import './addImageInput.css'
import { uploadImageToCloudinary } from '../../../../services/cloudinaryRequests';
import UseCloudinaryImages from '../../../../hooks/useCloudinaryImages';

export default function AddImageInput({closeModal}) {
  const [images,setImages] = useState([]);
  const {addImageToGamesImgs} = UseCloudinaryImages();
  const handleSubmit = async (imagesArr) => {
      try {
        const res = await uploadImageToCloudinary(imagesArr,"secure_url");
        
        for (let i = 0; i < res.length ; i++) {
          const src = res[i].substring(0, res[i].lastIndexOf('/'));
          const name = res[i].substring(res[i].lastIndexOf('/') + 1);
          addImageToGamesImgs(src,"/",name);
        }
        if (res.length > 0) {
          closeModal();
        }
      } catch (error) {
        console.log(error);
      }
  }



  return (
    <div className='AddImageInput'>
      <div className="img-input-container">
        <ImgDropInput addImage={(img)=>setImages([...images,{img,preview:URL.createObjectURL(img)}])}/>
      </div>
      <div className="imgs-preview">
        {images.length > 0 && 
          images.map((img,ind)=>(
            <img 
              key={ind}
              src={img.preview} 
              alt="image from input preview" />
          ))}
      </div>
        <button
          disabled={images.length == 0}
          onClick={()=>{
            const imagesArr = images.map((img)=>img.img);
            handleSubmit(imagesArr);
          }}
          className='submit-add-img'>
          SUBMIT
        </button> 
    </div>
  )
}

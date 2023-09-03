import React, { useState } from 'react'
import './cldGamesImgsCollection.css'
import useCloudinaryImages from '../../../../hooks/useCloudinaryImages'
import { deleteImageFromCloudinary } from '../../../../services/cloudinaryRequests';
import SkeletonElement from '../../../../components/reusfullComponents/skeletons/skeletonElement'
export default function CldGamesImgsCollection() {
    const {data:imagesCollection , deleteImageFromGamesImgs , loading , error} = useCloudinaryImages();
    const [showImg ,setShowImg] = useState(-1);


    const handleDelete = async (name,id) => {
      const public_id = name.substring(0, name.lastIndexOf('.'));
      try {
        const {result} = await deleteImageFromCloudinary(public_id);
        if (result == "ok") deleteImageFromGamesImgs(id);
      } catch (error) {
        console.log(error);
      }
    }
  return (
    <div 
      onClick={()=>(showImg && setShowImg(-1))}
      className='CldGamesImgsCollection'>
      {imagesCollection ? imagesCollection.map((image,index)=>(
        <div 
          className="img-container"
          key={index}>
          <img 
            className={showImg == index ? "show" : ""}
            onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              setShowImg(index);
            }}
            src={image.src + image.route + image.name} 
            alt="image from the collection" 
             />
             <div 
              className="deleteContainer">
              <button 
               onClick={()=>handleDelete(image.name,image._id)}
               className="delete-img">
                 x
              </button>
             </div>

        </div>

      ))
      : loading 
        ? Array(12).fill(0)
        .map((_,key)=>(
          <div 
            key={key}
            className="img-container">
            <SkeletonElement type={"fit"} />
          </div>
        ))
        : <p>{error}</p>
    }
    </div>
  )
}

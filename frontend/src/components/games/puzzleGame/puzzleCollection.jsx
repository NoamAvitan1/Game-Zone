import React, { useEffect } from 'react'
//  STYLE
import './puzzleCollection.css';
//  COMPONENTS
import SkeletonElement from '../../reusfullComponents/skeletons/skeletonElement';
//  HOOKS
import useCloudinaryImages from '../../../hooks/useCloudinaryImages';
//  ASSETS
import puzzleCover from '../../../assets/icons/puzzleCover.svg';

export default function PuzzleCollection() {
    const {setImage,data:images_collection,selectPage,loading,error} = useCloudinaryImages();
    useEffect(()=>{
      selectPage(1);
    },[])

    
    return (
      <div className='PuzzleCollection'>
        {images_collection 
        ? images_collection.map((image)=>(
          <div 
            className="PuzzleCollection-image-preview" 
            key={image.name}
            onClick={()=>setImage(image)}>
            <img  src={image.src + image.route + image.name} className='PuzzleCollection-img' alt="image preview" />
            <img src={puzzleCover} className='PuzzleCollection-puzzle-cover' alt="puzzle cover" />
          </div>
          ))
        : (loading 
          ? Array(12).fill(0).map((_,k)=>
            <div key={k} className="PuzzleCollection-img-skeleton">
                <SkeletonElement   type={"fit"}/>    
            </div>)
          : <p>{error}</p> 
          ) 
        }
        
      </div>
  )
}

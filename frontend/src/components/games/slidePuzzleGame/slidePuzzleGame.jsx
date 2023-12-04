import React, { useEffect, useState } from 'react'
//style
import './slidePuzzleGame.css'
//components
import SlidePuzzleCollection from './slidePuzzleCollection'
import SlidePuzzleImgInput from './slidePuzzleImgInput'
import SlidePuzzleStartGame from './slidePuzzleStartGame';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton';
import Pagination from '../../reusfullComponents/pagination/pagination';
//hooks
import useCloudinaryImages from '../../../hooks/useCloudinaryImages';
//services
import { resizeCloudinaryImage } from '../../../services/resizeCloudinaryImage'; 
import { resizeImage } from '../../../services/resizeInputImage';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';




export default function SlidePuzzleGame() {
  const [puzzle_image,setPuzzleImage] = useState(null);
  const box_size = window.innerWidth < 600 ? 300 : 600; 
  const {currentImage,setImage,page,pages,selectPage} = useCloudinaryImages();
  const navigate = useNavigate();
  

  const updatePuzzleImage = () => {
    setPuzzleImage(resizeCloudinaryImage(currentImage.route + currentImage.name,box_size,box_size));
  }

  const handleImageChange = async (img) => {
    try {
      const resizedImageBlob = await resizeImage(img,box_size,box_size);
      const resizedImage = URL.createObjectURL(resizedImageBlob);
      setPuzzleImage(resizedImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(currentImage){
      updatePuzzleImage();
    }
  },[currentImage])

  

  return (
    <div className='SlidePuzzleGame' >
      {puzzle_image
        ? 
          <div>
            <NavBackButton 
              className="navBack" 
              onClick={() => {
                setPuzzleImage(null);
                setImage(null);
              }}/>
            <SlidePuzzleStartGame image={puzzle_image} box_size={box_size} />
          </div>
          
        : <div >
            <NavBackButton 
              className="navBack" 
              onClick={()=>{
                setImage(null);
                navigate(-1);
              }}  />
            <SlidePuzzleImgInput handleImageChange={handleImageChange} />
            <SlidePuzzleCollection  />
            <Pagination page={page} pages={pages} setPage={(p)=>selectPage(p)} />
          </div>
        }
    </div>
  )
}


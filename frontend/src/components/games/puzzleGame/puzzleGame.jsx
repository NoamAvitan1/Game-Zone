import React, { useState , useEffect } from 'react'
//  STYLE
import './puzzleGame.css';
//  COMPONENTS 
import PuzzleGameStart from './puzzleGameStart';
import SelectLevel from '../../reusfullComponents/selectLevel/selectLevel'
import PuzzleCollection from './puzzleCollection';
import PuzzleImgInput from './puzzleImgInput';
import NavBackButton from '../../reusfullComponents/navigateBackButton/navBackButton';
import Pagination from '../../reusfullComponents/pagination/pagination';
//hooks
import useCloudinaryImages from '../../../hooks/useCloudinaryImages';
//services
import { resizeCloudinaryImage } from '../../../services/resizeCloudinaryImage'; 
import { resizeImage } from '../../../services/resizeInputImage';
import { useNavigate } from 'react-router-dom';

export default function PuzzleGame() {
  const [puzzle_image,setPuzzleImage] = useState(null);
  const box_size = 300;//window.innerWidth < 600 ? 300 : 600; 
  const {currentImage,setImage,page,pages,selectPage} = useCloudinaryImages();
  const [level,setLevel] = useState(null);
  const navigate = useNavigate();
  console.log(box_size);
  

  const updatePuzzleImage = () => {
    setPuzzleImage(resizeCloudinaryImage(currentImage.route + currentImage.name,box_size,box_size));
  }

  const handleImageChange = async (img) => {
    try {
      const resizedImageBlob = await resizeImage(img,box_size,box_size);
      const resizedImage = URL.createObjectURL(resizedImageBlob);
      console.log(resizedImage);
      setPuzzleImage(resizedImage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(currentImage){
      updatePuzzleImage();
    }
  },[currentImage]);

  return (
    <div className='PuzzleGame'>
        
        {  puzzle_image ?
            <div className="">
              <NavBackButton onClick={()=>{
                setPuzzleImage(null);
                setImage(null);
              }} />
              {level 
                ?   <PuzzleGameStart setLevel={setLevel} level={level} image={puzzle_image} box_size={box_size} />
                :   <SelectLevel aditionalStyle={{marginTop:'30vh'}}  options={["easy","hard"]} handleChoice={setLevel} />}
            </div>
            :
            <div className="">
              <NavBackButton onClick={()=>{
                setImage(null);
                navigate(-1);
              }} />
              <PuzzleImgInput handleImageChange={handleImageChange} />
              <PuzzleCollection />
              <Pagination page={page} pages={pages} setPage={(p)=>selectPage(p)}/>
            </div>
            
        }
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// //style
// import './slidePuzzleGame.css'





// export default function SlidePuzzleGame() {


  

//   console.log({currentImage,puzzle_image});
//   return (
//     <div className='SlidePuzzleGame' >
//       {puzzle_image
//         ? 
//           <div>
//             <NavBackButton className="navBack" onClick={() => setPuzzleImage(null)}/>
//             <SlidePuzzleStartGame image={puzzle_image} box_size={box_size} />
//           </div>
          
//         : <div >
//             <NavBackButton className="navBack" />
//             <SlidePuzzleImgInput handleImageChange={handleImageChange} />
//             <SlidePuzzleCollection  />
//             <Pagination page={page} pages={pages} setPage={(p)=>selectPage(p)} />
//           </div>
//         }
//     </div>
//   )
// }
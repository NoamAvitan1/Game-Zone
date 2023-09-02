import React, { useState } from 'react'
//STYLE & ASSETS
import './memoryInputSearch.css';
import {FaSearch} from 'react-icons/fa';
//COMPONENTS
import ErrorMessage from '../../reusfullComponents/errorMessege/errorMessage';
//SERVICES
import { apiGet } from '../../../services/apiRequests'
//HOOKS
import useModal from '../../../hooks/useModal';
import UseMemoryGame from '../../../hooks/useMemoryGame';
import { useNavigate } from 'react-router-dom';

/*
    *set image 
*/

export default function MemoryInputSearch() {
    const [errorModal , setErrorModal] = useState(null);
    const [categoryS , setCategoryS] = useState(""); 
    const {setMemoryGame} = UseMemoryGame();
    const navigate = useNavigate();

    const handleSearch = async (search) => {
        try {
            const {data} = await apiGet(`https://api.pexels.com/v1/search?query=${search}&per_page=24`,
                {Authorization:"hAp3a30CK1fJrwGOIa3dtKy2Qy9n5KEU0rSsGp2n9OGfaMuqPFJ3z13H"});
            if(data.photos.length > 23)
                setMemoryGame({
                    api:`https://api.pexels.com/v1/search?query=${search}&per_page=`,
                    headers:{Authorization:"hAp3a30CK1fJrwGOIa3dtKy2Qy9n5KEU0rSsGp2n9OGfaMuqPFJ3z13H"},
                    keys:["photos"],
                    img_keys:["src","small"],
                    name:search
                });
            navigate(`/memoryGame/${search}`);
        } catch (error) {
            console.log(error);
            const m = useModal(
                <ErrorMessage
                    message={"Sorry we could not find category for this keyword , please try a different name"} />
                , () => setErrorModal(null)
                );
            setErrorModal(m)
        }
    }
  return (
    <div className='MemoryInputSearch'>
        {errorModal && errorModal}
        <input 
            onChange={(e)=>setCategoryS(e.target.value)}
            onKeyDown={(e)=>e.key == 'Enter' && handleSearch(categoryS)}
            type="text" 
            className='MemoryInputSearch-input'
            placeholder=' Search for something else'/>
        <button 
            onClick={()=>handleSearch(categoryS)}
            className='MemoryInputSearch-button'
            ><FaSearch/>
        </button>
    </div>
  )
}

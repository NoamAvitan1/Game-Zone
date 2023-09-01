import React, { useState } from 'react'
import { apiGet } from '../../../services/apiRequests'
import useModal from '../../../hooks/useModal';
import ErrorMessage from '../../reusfullComponents/errorMessege/errorMessage';

/*
    *set image 
*/

export default function MemoryInputSearch() {
    const [errorModal , setErrorModal] = useState(null);
    
    const handleSearch = async (search) => {
        try {
            const data = await apiGet(`https://api.pexels.com/v1/search?query=${search}&per_page=24`);
            //TODO set the cards
        } catch (error) {
            const m = useModal(
                <ErrorMessage
                    message={"Sorry we could not find category for this keyword , please try a different name"} />
                , () => setErrorModal(null)
                );
            setErrorModal(m)
        }
    }
  return (
    <div>
        {errorModal && errorModal}
        <input type="text" />
        <button></button>
    </div>
  )
}

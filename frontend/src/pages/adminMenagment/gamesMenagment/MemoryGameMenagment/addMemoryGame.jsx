import React, { useState } from 'react'
import './addMemoryGame.css';
import ImgDropInput from '../../../../components/reusfullComponents/imgDropInput/imgDropInput'
import {uploadImageToCloudinary} from '../../../../services/cloudinaryRequests'
//assets
import {AiOutlinePlus} from 'react-icons/ai';
import UseMemoryGame from '../../../../hooks/useMemoryGame';
export default function AddMemoryGame({closeModal}) {
  const [keys,setMainKeys] = useState([""]);
  const [img_keys,setImgKeys] = useState([""]);
  const [headers,setHeaders] = useState({"":""}); 
  const [img_url,setBackgroundImage] = useState("");
  const [name,setName] = useState("");
  const [api,setApi] = useState("");
  const {addMemory} = UseMemoryGame();
  const [error,setError] = useState(null);


  const addGame = async (game) => {
    if (game.name.length < 1) return setError({type:"name",msg:"Name is required !"});
    if (game.api.length < 1) return setError({type:"api",msg:"Api is required !"});
    try {
      await uploadImageToCloudinary([img_url],"secure_url")
      .then((res)=>{
        addMemory({...game,img_url:res[0]});
        closeModal();
      }); 
    } catch (error) {
      console.log(error);
      setError({type:"BackgroundImage",msg:"Faild to upload img"});
    }
  }
  return (
    <div className='AddMemoryGame'>
        <h2>ADD Memory Game</h2>
        {error && <div className="error-field">
          {error.msg}
          </div>}
        <div className='form' >
            <label className='api-lable' htmlFor="">Name</label>
            <input 
              value={name}
              onChange={(e)=>{
                if (error && error.type == "name") setError(null);
                setName(e.target.value)
              }}
              className='input'
              required
              type="text" />

            <label className='api-lable' htmlFor="">API</label>
            <input 
              value={api}
              required
              onChange={(e)=>{
                if (error && error.type == "api") setError(null);
                setApi(e.target.value);
              }}
              className='input'
              type="text" />

            <div className="lable-container">
              <label htmlFor="">Headers</label>
              <AiOutlinePlus className='AiOutlinePlus' onClick={()=>setHeaders({...headers,"":""})} />
            </div>

            {Object.entries(headers).map(([key, value]) => (
              <div className="headers-container" key={key}>

                <input 
                  defaultValue={key}
                  onKeyDown={(e)=>{
                    if(e.key == "Enter"){
                      let newObj = {...headers};
                      newObj[e.target.value] = value;
                      delete newObj[key];
                      setHeaders(newObj)
                    }
                  }}
                  placeholder='key'
                  className='input'
                  type="text" />

                <p className='object-mid'>:</p>

                <input 
                  onKeyDown={(e)=>{
                    if(e.key == "Enter"){
                      let newObj = {...headers};
                      newObj[key] = e.target.value;
                      setHeaders(newObj);
                    }
                  }}
                   defaultValue={value}
                  placeholder='value'
                  className='input'
                  type="text" />

              </div>
            ))}


            

            <div className="lable-container">
              <label htmlFor="">Main Keys</label>
              <AiOutlinePlus className='AiOutlinePlus' onClick={()=>setMainKeys([...keys,""])} />
            </div>
            {keys.map((inp,i)=>(
              <div className="input-container">
                <input type="text" 
                className='input'
                onChange={(e)=>{
                  const u_mainKeys = keys.map((k,ind)=>(i==ind ? e.target.value : k));
                  setMainKeys(u_mainKeys);
                }} value={inp}  key={i} />
                <button
                  onClick={()=>{
                    const u_mainKeys = keys.filter((k,ind)=> ind != i );
                    setMainKeys(u_mainKeys);
                  }}
                  >-</button>
              </div>

            ))}

            <div className="lable-container">
              <label htmlFor="">Image Keys</label>
              <AiOutlinePlus className='AiOutlinePlus' onClick={()=>setImgKeys([...img_keys,""])} />
            </div>
            {img_keys.map((inp,i)=>(
              <div className="input-container">
                <input type="text" 
                className='input'
                onChange={(e)=>{
                  const u_imgKeys = img_keys.map((k,ind)=>(i==ind ? e.target.value : k));
                  setImgKeys(u_imgKeys);
                }} value={inp}  key={i} />
                <button
                  onClick={()=>{
                    const u_imgKeys = img_keys.filter((k,ind)=> ind != i );
                    setImgKeys(u_imgKeys);
                  }}
                  >-</button>
              </div>

            ))} 
          

                <div className="image-input-container">
                  <label htmlFor="">Background Image</label>
                  <ImgDropInput addImage={(img)=>setBackgroundImage(img)} />
                </div>
            
            

            <button
              type='submit'
              onClick={()=>addGame({keys,img_keys,headers,img_url,api,name})}
              >ADD</button>
        </div>
    </div> 
  )
}
              {
                /* <div className="object-container">
                <p>{"{"}</p>
                {Object.keys(headers).map((key) => (
                  <p key={key}>
                    {key} : {headers[key]},
                  </p>
                ))}
                <p>{"}"}</p>
              </div> */}
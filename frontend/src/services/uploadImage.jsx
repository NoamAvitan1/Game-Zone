import axios from "axios";
import { UPLOAD_IMAGE } from "../constants/urls";
import { apiGet } from "./apiRequests";
//!pay attantion to send array!!!
export const uploadImageToCloudinary = async (images,key) => {
    try {
        //get a sign from cloudinary in the backend
        const {data:uploadParams} = await apiGet(UPLOAD_IMAGE,{},true);
        console.log(uploadParams);
        //create a query srtring from the sign
        const queryString = Object.keys(uploadParams)
            .map((key) => `${key}=${encodeURIComponent(uploadParams[key])}`)
            .join('&');

        const uploadUrl = `https://api.cloudinary.com/v1_1/dhojbnefp/upload?${queryString}`;
        console.log(uploadUrl);
        const formData = new FormData()

        let responses = [];
        for (let i = 0; i < images.length ; i++) {
            formData.append(`file`, images[i]);
            await axios.post(uploadUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                if (key) {
                    responses.push(res.data[key]);
                } else {
                    responses.push(res.data);
                }
            })
        }


        console.log(responses);
        return responses;
    } catch (error) {
        console.log(error);
    }
}

/* 
TODO: 1. when calling this function - {secure_url} = uploadImageToCloudinary(the image from user);
* then check if secure_url exist and save in the user
 */ 

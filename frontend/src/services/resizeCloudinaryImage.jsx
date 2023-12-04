import {Cloudinary} from '@cloudinary/url-gen';
import {Resize} from '@cloudinary/url-gen/actions';

const cld = new Cloudinary({
    cloud:{
      cloudName:"dhojbnefp"
    }
})

export const resizeCloudinaryImage = (route,width,height) => {
    try {
        const resized_image = cld.image(route)
        .resize(Resize.crop().width(width*3).height(height*3).gravity("auto"))
        .resize(Resize.scale().width(width).height(height))
        .quality('auto')
        .format('auto')
        .toURL();
        const index = resized_image.indexOf('?');
        if (index !== -1) {
          return resized_image.substring(0, index);
        }
        return resized_image;

    } catch (error) {
        console.log(error);
    }
}


import { useState, useRef } from 'react';
import { Button, Input, useToast, Image, HStack } from '@chakra-ui/react';
import axios from 'axios';
export default function ImageUploader(props) {
  const [image, setImage] = useState(props.image);
  const toast = useToast();
  const targetRef = useRef(null);
  const handleClick = () => {
    targetRef.current.click();
  };
  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('id', props.imageFolder)
    formData.append('image', file);
    
    reader.onloadend = () => {
      setImage(reader.result);
      props.upt(file)
    };
    reader.readAsDataURL(file);
  };

  const handleImageUploadClick = () => {
    if (image) {
      // You can perform any necessary logic here to handle the image upload, such as sending it to a server.
      // Here, we'll just display a success message.
      toast({
        title: 'Image uploaded',
        description: 'Your image has been uploaded.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'No image selected',
        description: 'Please select an image to upload.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    
      <HStack>
      {image && (
        <Image src={image} maxW={'40%'} maxH={'40%'}/>
      )}
      <Input ref={targetRef} type="file" hidden={true} onChange={handleImageInputChange} />
      <Button onClick={handleClick}>Upload image</Button>
      </HStack>
    
  );
}

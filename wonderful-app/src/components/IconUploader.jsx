import { useState, useRef } from 'react';
import {
    Button, 
    Input,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  

export default function IconUploader(props) {
  const [image, setImage] = useState(props.image);
  const targetRef = useRef(null);
  const handleClick = () => {
    targetRef.current.click();
  };
  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      props.upt(file)
    };
    reader.readAsDataURL(file);
  };


  return (
        <>
            <Center>
                <Avatar size="xl" src={image}>
                  <AvatarBadge
                    as={IconButton}
                    size="sm"
                    rounded="full"
                    top="-10px"
                    colorScheme="red"
                    aria-label="remove Image"
                    onClick={()=> props.upt('')}
                    icon={<SmallCloseIcon />}
                  />
                </Avatar>           
              </Center>
              <Center w="full">
                <Button onClick={handleClick} w="full">Change Icon</Button>
                <Input ref={targetRef} type="file" hidden={true} onChange={handleImageInputChange} position={'absolute'}/>
              </Center>
        </>
  );
}

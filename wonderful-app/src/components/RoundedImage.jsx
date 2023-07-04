import { Box } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalBody, Image } from "@chakra-ui/react";
import { useState } from "react";

const RoundedImage = ({ imageUrl, width, height }) => {
    const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
    <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Image src={imageUrl} alt="Modal Image" width="100%" height="auto" />
          </ModalBody>
        </ModalContent>
      </Modal>
    <Box
      borderRadius="md"
      border="2px solid"
      borderColor="teal.500" // Replace "teal.500" with the desired color from the Chakra theme
      overflow="hidden"
      width={width}
      height={height}
      display={'inline-block'}
    >
      <Image src={imageUrl} alt="image" style={{ width: "100%", height: "100%", objectFit: "cover" }} onClick={handleOpen} cursor="pointer"/>
    </Box>
    </>
  );
};

export default RoundedImage;

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    Box,
    Button,
  } from '@chakra-ui/react'
import {BiAlignLeft, BiImage} from 'react-icons/bi'
export default function ComponentsDrawer(props){
  const handleClickOption = (i) => {
    props.addQ(i)
    props.onClose()
  }
  return(
    <Drawer
        isOpen={props.isOpen}
        placement='right'
        onClose={props.onClose}
        finalFocusRef={props.btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Select a type of question</DrawerHeader>

          <DrawerBody>
            <Stack>

              <Button leftIcon={<BiAlignLeft />}  colorScheme='red' variant='solid'  onClick={() => handleClickOption({q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:false, t:0})}>
                Text Selection
              </Button>
                
              <Button leftIcon={<BiImage />} colorScheme={'red'} variant={'solid'}  onClick={() => handleClickOption({q : "", pa : [{a:"", t:1}, {a:"", t:1}], m:false, t:1})} >
                  Image Selection
              </Button>

              <Button leftIcon={<BiImage />} colorScheme={'red'} variant={'solid'}  onClick={() => handleClickOption({q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:true, t:0})} >
                   Multiple Text Selection
              </Button>

              <Button leftIcon={<BiImage />} colorScheme={'red'} variant={'solid'}  onClick={() => handleClickOption({q : "", pa : [{a:"", t:1}, {a:"", t:1}], m:true, t:1})} >
                   Multiple Image Selection
              </Button>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}
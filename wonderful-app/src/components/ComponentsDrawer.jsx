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
import { useDispatch } from 'react-redux'
import { addQuestion } from '../redux/createSurvey'
import {BiAlignLeft, BiImage, BiDotsHorizontalRounded} from 'react-icons/bi'
export default function ComponentsDrawer(props){
  const dispatch = useDispatch()
  const handleClickOption = (i) => {
    dispatch(addQuestion(i))
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

              <Button leftIcon={<BiDotsHorizontalRounded />} colorScheme={'red'} variant={'solid'}  onClick={() => handleClickOption({q : "", pa : [{a:"0", t:2}, {a:"10", t:2}], m:false, t:2})} >
                   Bar Selection
              </Button>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}
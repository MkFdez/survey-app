
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    Input,
  } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import  gSurvey  from '../../utils/survey_generator'
import { useDispatch } from 'react-redux'
import { updateTitle, apiSurvey } from '../redux/createSurvey'
export default function GenerateSurveyDialog(props) {
    const cancelRef = useRef()
    const [value, setValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    async function generateSurvey(){
        setIsLoading(true)
        const content = await gSurvey(value)
        dispatch(updateTitle(content.title))
        dispatch(apiSurvey(content.questions))
        setIsLoading(false)
        props.onClose()
    
    }
    return (
      <>
        <AlertDialog
          isOpen={ props.isOpen}
          leastDestructiveRef={props.cancelRef}
          onClose={props.onClose}
          closeOnEsc={false}
          closeOnOverlayClick={false}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Generate Survey
              </AlertDialogHeader>
  
              <AlertDialogBody>
                <Input value={value} onChange={(e) => setValue(e.target.value)}  placeholder='Survey topic ex. habbits in shower' />
              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button isDisabled={isLoading} ref={cancelRef} onClick={props.onClose}>
                  Cancel
                </Button>
                <Button isLoading={isLoading} colorScheme='red' onClick={generateSurvey} ml={3}>
                  Generate
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
  }
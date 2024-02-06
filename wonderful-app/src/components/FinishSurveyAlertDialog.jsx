import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export default function FinishSurveyAlertDialog(props)
{
    return (
        <AlertDialog
        isOpen={props.isOpen}
        leastDestructiveRef={props.cancelRef}
        onClose={props.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Finish Survey
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? All the blank questionsand his possible answers, including blank possible answers of non-blank questions will be deprecated
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={props.cancelRef} onClick={props.onClose}>
                Keep Editing
              </Button>
              <Link to={"/"}>
              <Button colorScheme='red' onClick={props.onAccept} ml={3}>
                Finish
              </Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    )
}
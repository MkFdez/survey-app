
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateQuestion, goDown, goUp, removeQuestion } from "../redux/createSurvey"
import ImageQuestion from "./PossibleAnswers/ImageQuestion"
import StandardQuestion from "./PossibleAnswers/StandardQuestion"
import { AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box, Input, HStack, Badge, Flex, IconButton, Button,  Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Portal
    } from "@chakra-ui/react"
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';
import BarSelection from "./PossibleAnswers/BarSelection"
export default function Question(props){
    const dispatch = useDispatch()
    let body = <></>
    let badge = ''
    switch(props.data.pa[0].t){
        case 0:
            body = <StandardQuestion parentIndex={props.index} data={props.data.pa} add={props.addAns} upt={props.uptData}/>
            badge = 'text selection'
            break;
        case 1:
            body = <ImageQuestion parentIndex={props.index} data={props.data.pa} add={props.addAns} upt={props.uptData} imageFolder={props.imageFolder}/>
            badge = 'image selection'
            break;
        case 2: 
            body = <BarSelection data={props.data.pa} parentIndex={props.index}/>
            badge = 'bar selection'
            break;
    }
    return (
        <AccordionItem>
            <Flex justifyContent={'space-between'}>
                <Badge colorScheme={props.data.m ? 'green' : 'red'} h={'min-content'} ml={'10px'}>{`${props.data.m ? `multiple ${badge}`: `single ${badge}`} Selection`}</Badge>
                <Flex justify="center">
                   
                        <IconButton
                         h={'min-content'}
                         w={'min-content'}
                        icon={<BiChevronUp />}
                        aria-label="Arrow Up"
                        fontSize={'20px'}
                        variant="unstyled"
                        onClick={() => {dispatch(goUp(props.index))}}
                        />
                    
                    
                        <IconButton
                        h={'min-content'}
                        w={'min-content'}
                        icon={<BiChevronDown />}
                        aria-label="Arrow Down"
                        fontSize={'20px'}
                        variant="unstyled"
                        onClick={() => {dispatch(goDown(props.index))}}
                        />
                    
                </Flex>
    </Flex>
                    <HStack w={"100%"} justifyContent={"space-between"} padding={"10px"}>
                        
                        
                        <Box as="span" flex='1' textAlign='left' maxW={"80%"}>
                            <Flex alignItems={'center'}>
                            <Popover>
                                <PopoverTrigger>
                                <Button fontWeight={'bold'} mr={1} background={'red.400'} _hover={{ bg: 'red.600' }} >X</Button>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>Do you want to delete this entire question?</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Button background={'red.400'} onClick={() => {dispatch(removeQuestion(props.index))}}>Delete</Button>
                                    </PopoverBody>
                            
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                                
                            <Input value={props.data.q} onChange={(event) => {dispatch(updateQuestion({newValue: event.target.value, index: props.index}))}} placeholder={`Question #${props.index+1}`} size='md' />

                            </Flex>
                        </Box>
                        
                        <AccordionButton position={"relative"} w={"max-content"} float={"right"}>                       
                            <AccordionIcon />
                        </AccordionButton>
                    </HStack>
                    <AccordionPanel pb={4} pl={"20px"} pr={"20px"}>
                    {body}
                    </AccordionPanel>
            </AccordionItem>
    )
}
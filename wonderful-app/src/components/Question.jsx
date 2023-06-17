
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateQuestion } from "../redux/createSurvey"
import ImageQuestion from "./PossibleAnswers/ImageQuestion"
import StandardQuestion from "./PossibleAnswers/StandardQuestion"
import { AccordionItem, AccordionPanel, AccordionButton, AccordionIcon, Box, Input, HStack, Badge} from "@chakra-ui/react"
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
    }
    return (
        <AccordionItem>
                    <Badge colorScheme={props.data.m ? 'green' : 'red'} ml={'10px'}>{`${props.data.m ? `multiple ${badge}`: `single ${badge}`} Selection`}</Badge>
                    <HStack w={"100%"} justifyContent={"space-between"} padding={"10px"}>
                        
                        
                        <Box as="span" flex='1' textAlign='left' maxW={"80%"}>
                       
                                <Input value={props.data.q} onChange={(event) => {dispatch(updateQuestion({newValue: event.target.value, index: props.index}))}} placeholder={`Question #${props.index+1}`} size='md' />
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
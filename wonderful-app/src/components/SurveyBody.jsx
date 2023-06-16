import { Box, Heading, Radio,Image, RadioGroup, Stack, Flex } from "@chakra-ui/react"
import React from "react";

export default function SurveyBody(props){
    let x = 0;
    let elements = []
    while (x < props.radios.length){
        elements.push( <Stack direction={['column', 'column', 'row', 'row' ]} spacing={"30px"} align={"center"}>
            {props.radios.slice(x,x == props.radios.length-1 ? x+1 : x+2 )}
            </Stack>)
        x+=2
    }
    return (
        <Box boxShadow="lg" padding="20px" borderRadius="10px">
        <center>
            <Heading as='h3' size='md'w={"100%"}  mb={"10px"}>{props.heading}</Heading>
        </center>
        <RadioGroup onChange={(x) => props.changeValue(x)} value={props.value} mb={"20px"}>
            <Stack direction={['column', 'column', 'column', 'column' ]} spacing={"30px"} align={"center"}>
                {React.Children.toArray(elements)}
            </Stack>
        </RadioGroup>
        
        </Box>
    )
}
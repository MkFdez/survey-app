import { SliderMark, Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Flex, Tooltip, Heading, NumberInputField } from "@chakra-ui/react"
import { useState } from "react"
export default function BarSelecion2(props){
    const [showTooltip, setShowTooltip] = useState(false)
    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
      }
    const getValue = value =>  {
        try{
            let a = parseInt(value)
            return a
        }catch{
            return 0
        }
    }
    return (
      <Box boxShadow="lg" padding="20px" borderRadius="10px">
        <center>
            <Heading as='h3' size='md'w={"100%"}  mb={"35px"}>{props.heading}</Heading>
        </center>
        <Slider aria-label='slider-ex-6' onChange={(val) => props.onChange(val)} defaultValue={getValue(props.start)}
        mb={2}
      min={getValue(props.start)}
      max={getValue(props.end)}
      colorScheme='teal'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
          <SliderMark value={getValue(props.start)} {...labelStyles}>
            {props.start}
          </SliderMark>
          <SliderMark  value={getValue(props.end)} {...labelStyles}>
            {props.end}
          </SliderMark>
          <SliderMark
            value={getValue(props.value)}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
          >
            {props.value}
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='teal.500'
            color='white'
            placement='top'
            isOpen={showTooltip}
            
            
      ><SliderThumb /></Tooltip>
          
        </Slider>
        </Box>
    )
}
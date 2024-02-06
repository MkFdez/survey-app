import { SliderMark, Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Flex, Tooltip, NumberInput, NumberInputField } from "@chakra-ui/react"
import { useState, useRef} from "react"
import { useDispatch } from "react-redux"
import { updateQuestionData } from "../../redux/createSurvey"
export default function BarSelection(props) {
    
    const dispatch = useDispatch()
    const [sliderValue, setSliderValue] = useState('0')
    const [showTooltip, setShowTooltip] = useState(false)
    const start = props.data[0].a
    const end = props.data[1].a
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
      <Box  pb={2}>
       
          <Flex align="center" justifyContent={'center'} mb={2}>
            <Box>
            <NumberInput  value={start} onChange={(valueString) => {
                if(parseInt(end) <= parseInt(valueString)) dispatch(updateQuestionData({d:parseInt(valueString)+1, questionIndex: 1, i:props.parentIndex}))
                dispatch(updateQuestionData({d:valueString, questionIndex: 0, i:props.parentIndex}
                  ))
                } }>
                  <NumberInputField />
                  </NumberInput>
            </Box>
            <Box px={2}>-</Box>
            <Box>
            <NumberInput  value={end} onChange={(valueString) => {
                if(parseInt(valueString) <= parseInt(start)) dispatch(updateQuestionData({d:parseInt(start)+1, questionIndex: 1, i:props.parentIndex}))
                dispatch(updateQuestionData({d:valueString, questionIndex: 1, i:props.parentIndex}))
            }}>
                  <NumberInputField />
              </NumberInput>
            </Box>
      </Flex>
 
         
        <Slider aria-label='slider-ex-6' onChange={(val) => setSliderValue(val)} defaultValue={5}
        isDisabled={true}
      min={getValue(start)}
      max={getValue(end)}
      colorScheme='teal'
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}>
          <SliderMark value={getValue(start)} {...labelStyles}>
            {start}
          </SliderMark>
          <SliderMark  value={getValue(end)} {...labelStyles}>
            {end}
          </SliderMark>
          <SliderMark
            value={getValue(sliderValue)}
            textAlign='center'
            bg='blue.500'
            color='white'
            mt='-10'
            ml='-5'
            w='12'
            display={'none'}
          >
            {sliderValue}
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
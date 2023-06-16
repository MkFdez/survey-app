import {useState} from 'react'
import { SliderMark, SliderFilledTrack, SliderTrack, SliderThumb, Tooltip, Slider} from '@chakra-ui/react'


export default function GenderPicker() {
    const [sliderValue, setSliderValue] = useState(0)
    const [showTooltip, setShowTooltip] = useState(false)
    const [red, setRedValue] = useState("50")
    return (
      
      <Slider
        id='slider'
        defaultValue={0}
        min={0}
        max={100}
        
        onChange={(v) => {
            setSliderValue(v);
            const temp = v + 80;
            setRedValue(temp.toString(16))
            console.log(`#${red}32a8`)
                            }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
          Man
        </SliderMark>
        <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
          Man<br/> who < br/> like bts
        </SliderMark>
        <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
          Multi<br/>color <br/> zone
        </SliderMark>
        <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
          Woman<br/> who like <br/> warhammer
        </SliderMark>
        <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
          Washing <br/> Machine
        </SliderMark>
        <SliderTrack >
          <SliderFilledTrack bgColor={`#${red}32a8`}/>
        </SliderTrack>
        <Tooltip
          hasArrow
          bg={`#${red}32a8`}
          color='white'
          placement='top'
          isOpen={showTooltip}
          label={`${sliderValue}%`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
     
    )
  }
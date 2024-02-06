import { Box, Button, Flex, Icon, Popover, PopoverTrigger, PopoverBody, PopoverContent, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { MdGraphicEq, MdPlayCircle, MdPauseCircle, MdFullscreen, MdFullscreenExit, MdVolumeUp, MdVolumeDown, MdVolumeOff } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {changeVolDisplay} from '../redux/player'

export default function CustomControls(props){
   const dispatch = useDispatch()
  const displayVol = useSelector(state => state.player.volumenDisplay)
    const [isHide, setIsHide] = useState(true)
    if(isHide && displayVol){
        dispatch(changeVolDisplay())
    
    }
    const getMinsAndSecs = (time) => {
        let mins = Math.floor(time / 60);
        let secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    
    }
    return (
        <Box position={'absolute'} bottom={0} left={0} h={props.isFullscreen ? "10%":'20%'} w={'100%'} onMouseOver={() => setIsHide(false)} onMouseOut={() => setIsHide(true)} >
        <Box h={'100%'} w={'100%'} bg={'gray.700'} display={'flex'} flexDirection={'column'} paddingTop={2} paddingLeft={4} paddingRight={4}  opacity={'0.8'} hidden={isHide ? true : false} onMouseOver={() => setIsHide(false)} onMouseOut={() => setIsHide(true)}>
            <Flex alignItems={"center"}>
            <Icon color={'white'} onClick={props.onPlay} h={props.isFullscreen? 47 :27} w={props.isFullscreen? 47 :27} as={props.isPlaying ? MdPauseCircle : MdPlayCircle} opacity={'1.0'}/>
            <Icon color={'white'} onClick={() => {
                console.log('clicked')
                dispatch(changeVolDisplay())}
                } as={props.volume > 0.5 ?MdVolumeUp : props.volume > 0 ? MdVolumeDown : MdVolumeOff} h={props.isFullscreen? 47 :27} w={props.isFullscreen? 47 :27}/>
            <Popover 
            isOpen={displayVol}
             >
                
                <PopoverContent position={'relative'} top={-10} left={0} >
                    <PopoverBody>
                    <Slider aria-label='slider-ex-1' min={0} max={1} step={0.01} value={props.volume} onChange={(val) => {props.onVolumeChange(val)}}>
                        <SliderTrack>
                        <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    </PopoverBody>
                </PopoverContent>
                </Popover>
            <Text color={'white'} ml={2} fontSize={props.isFullscreen? '2xl' :'xl'}>{getMinsAndSecs(props.actual) + '/' + getMinsAndSecs(props.duration)}</Text>
            <Icon color={'white'} mr={2} onClick={props.onFullscreen} h={props.isFullscreen? 47 :27} w={props.isFullscreen? 47 :27} as={props.isFullscreen ? MdFullscreenExit : MdFullscreen} />
            
            </Flex>
            
            <Slider aria-label='slider-ex-4' defaultValue={30} w={'100%'} min={0} max={props.duration} value={props.actual}onMouseUp={() => {props.onPlay();}} onMouseDown={() => {if(props.isPlaying) props.onPlay();}} step={0.01} onChange={(val) => {
                props.setCurrentTime(val)
            }

            }>
                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>
                <SliderThumb boxSize={props.isFullscreen? 6 :4}>
                    <Box color='tomato' as={MdGraphicEq} />
                </SliderThumb>
            </Slider>
        </Box>
        </Box>
    )
}
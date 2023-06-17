import { useDispatch } from "react-redux";
import { addAnswer, updateQuestionData } from "../../redux/createSurvey";
import {  Button,  Stack, RadioGroup } from "@chakra-ui/react";
import ImageUploader from "../ImageUploader";
export default function ImageQuestion(props){
    const dispatch = useDispatch()
    function buildELements(o)
    {
        let temp = []
        o.forEach((e,i) => {
            
            let comp =   <ImageUploader image={e.a == "" ? null : e.a} key={i} imageFolder={props.imageFolder} upt={(d) => {dispatch(updateQuestionData({d:d,questionIndex:i, i: props.parentIndex}))}} />   
            temp.push(comp)

        });
        
        return temp
    }
   let elements = buildELements(props.data)

    return(
        <>      
            <Stack>
                <RadioGroup>        
                    <Stack>       
                        {elements} 
                    </Stack>
                </RadioGroup>
                
                <Button maxW={'30%'} onClick={() => dispatch(addAnswer({d: {a:"", t:1}, i: props.parentIndex}))}>Add</Button>
            </Stack>
        </>
      
    )
}
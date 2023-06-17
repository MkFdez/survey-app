import { useDispatch } from "react-redux";
import { addAnswer, updateQuestionData } from "../../redux/createSurvey";
import { Radio,  Button, Input, Stack} from "@chakra-ui/react";

export default function StandardQuestion(props){
    const dispatch = useDispatch()
    function buildELements(o)
    {
        let temp = []
        o.forEach((e,i) => {
            let comp = <></>
            switch(e.t){
                case 0:
                    comp = <Input key={i} value={e.a} onChange={(event) => {dispatch(updateQuestionData({d:event.target.value, i: props.parentIndex, questionIndex: i}))}} placeholder={`Possible Answer ${i+1}`}/>
                    break;
                case 1:
                    comp =<Radio key={i} value={i.toString}><Input maxW={'30%'} placeholder="Type whatever you want"/> <Input maxW={'40%'}/></Radio>
                    break;
                }
            temp.push(comp)
        });
        
        return temp
    }
    /*
    function handleInputChange(index, event){
        const newValue = event.target.value
        let temp = [...options]
        temp[index].a = newValue
        console.log(`temp => ${temp[0].a}`)
        console.log(`op => ${options[0].a}`)
        setOptions(temp)
        setElements(buildELements(options))
    }
    function AddElement(t=0 )
    {         
        let temp = options
        temp.push({a:"", t:t})
        setOptions(temp)
        setElements(buildELements(options))
        
    }
    
    const [options, setOptions] = useState([{a:"", t:0}, {a:"", t:0}])
    const [elements, setElements] = useState(buildELements(options))
    const [value, setValue] = React.useState()
    */
   let elements = buildELements(props.data)
    return(
        <>      
            <Stack>
                
                        {elements} 
                    
                
                <Button maxW={'30%'} colorScheme="green" onClick={() => dispatch(addAnswer({d:{a:"", t:0}, i:props.parentIndex}))}>Add</Button>
            </Stack>
        </>
      
    )
}
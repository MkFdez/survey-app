import { Box, Button, Input, Stack } from "@chakra-ui/react"
import ComponentsDrawer from "./components/ComponentsDrawer"
import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { useDisclosure, Accordion} from "@chakra-ui/react"
import Question from "./components/Question"
import FinishSurveyAlertDialog from "./components/FinishSurveyAlertDialog"
import LoadingHamster from "./components/LoadingHamster"
import Cookies from 'js-cookie'
import axios from 'axios'


export default function CreateSurvey(){
    const { isOpen:isOpenDialog, onOpen:onOpenDialog, onClose:onCloseDialog} = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const btnRef = React.useRef()
    const navigate = useNavigate()
    const [imageFolder, setFolder] = useState(generateGUID())
    const [isLoading, setLoading] = useState(false)
    //useEffect(() => (setTimeout(() => {setLoading(false)}, 1000)), [])
    const [title, setTitle] = useState('')
    const [questions, setQuestion] = useState([{q : "", pa : [{a:"", t:0}, {a:"", t:0}], m:false, t:1}])
    const questionList = questions.map((x,i) => <Question data={x} 
                                                index={i}
                                                key={i} 
                                                imageFolder={imageFolder}
                                                add={AddQuestion} 
                                                del={() => {RemoveQuestion(i)}} 
                                                upt={(newValue) => {UpdateQuestion(newValue, i)}} 
                                                uptData={(d, questionIndex) => {UpdateQuestionData(d, i, questionIndex)}} 
                                                addAns={(d) => AddAnswer(d,i)}/>)
    function AddQuestion(d){
        setQuestion([...questions, d])
    }
    function UpdateQuestionData(d,i,questionIndex){
        setQuestion(x => x.map((y,index) => (index != i ? y : {...y,pa : y.pa.map((z,ind) => questionIndex != ind ? z : {...z, a:d})})))
    }
    function RemoveQuestion(i){
        setQuestion(x => x.filter((y, index) => index != i))
    }
    function UpdateQuestion(newValue, index){
        setQuestion(x => x.map((y,i) => i != index ? y : {...y, q:newValue} ))
    }
    function AddAnswer(d,i){
        setQuestion(x => x.map((y,index) => i != index ? y  : {...y, pa: [...y.pa, d]} ))
    }

     async function createSurvey(){
        let toUpload = []
        let copy = [...questions]
        for await(const x of copy) {
            x.pa = x.pa.filter(y => y.a != "")
            if(x.pa.length >= 2 && x.q != ""){
            x.pa = await Promise.all(x.pa.map( async(y,i) => {
                    if(y.t == 1){
                        const formData = new FormData();
                        formData.append('id', imageFolder)
                        formData.append('image', y.a);
                        let path = await axios
                        .post('http://localhost:5000/api/uploads', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        })
                        .then((response) => {                                     
                        return response.data.final_path
                        })
                        console.log(i)  
                                          
                        return  {...y, a: path}
                        
                    }else{
                        return y
                    }
                }))
                console.log(x)
                toUpload.push(x)
            }


          
        }
        const obj = {
            questions : toUpload,
            title: title,
        }
        const token = 'Bearer ' + Cookies.get('token')
        const config = {
            headers: { Authorization: token },
          }
        axios.post("http://localhost:5000/api/survey",
           obj,
           config
        ).then(({data})=> {navigate(`/survey/info/${data.id}`)})
         
    }
    function generateGUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
     return (
            isLoading 
            ? 
            <Box ml={'auto'} mr={'auto'} w={'min-content'} mt={'30px'}>
            <LoadingHamster /> 
            </Box>
            :

        <Stack pl={'10%'} pr={'10%'}>
            <FinishSurveyAlertDialog isOpen={isOpenDialog} onClose={onCloseDialog} onOpen={onCloseDialog} cancelRef={cancelRef} onAccept={createSurvey}/>
            <ComponentsDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} addQ={AddQuestion} />
            <Input value={title} onChange={(event) => {setTitle(event.target.value)}} placeholder="Survey Title" ml={"auto"} mr={"auto"} w={"90%"} p={7}  fontSize={25} fontWeight={"bold"} textAlign={"center"} ></Input>
            <Accordion defaultIndex={[0]} allowMultiple>
                {questionList}
        </Accordion>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen} w={'100%'} >
                Add Question
        </Button>
        <Button  colorScheme='red'  w={'100%'} onClick={onOpenDialog} >
                Finish
        </Button>
        </Stack>
     
     )
}
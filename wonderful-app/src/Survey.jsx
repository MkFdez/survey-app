import { Radio, Button, Heading,  Progress, Grid, GridItem, Image} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import LoadingHamster from "./components/LoadingHamster";
import { useState, useEffect} from "react";
import axios from "axios";
import SurveyBody from "./components/SurveyBody";
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import './survey.css'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { start, answer, nextPage as next, prevPage, changeValue as change, reset, setSurvey } from "./redux/survey";

//data => object with 2 parameters (p => question, a => list of possible answers)
export default function Survey(){
    let radios = [];
    var {id} = useParams()
    const survey = useSelector(state => state.survey.survey)
    const [loading, setLoading] = useState(true)
    const ans = useSelector(state => state.survey.answers)
    const dispatch = useDispatch()
    console.log(id)

    useEffect(() => {
        dispatch(reset())
        axios.get("http://localhost:5000/api/survey", 
        {
            params:
            {
            id:id
            }
        }).then(({data}) => {
            console.log(data)
            dispatch(setSurvey(data))
            setLoading(false)
            dispatch(start(data.question.length))
        }).catch(err => {console.log(err)})
    }, [])
    function nextPage(){
        if(actualPage == survey.question.length-1){
        toast({
            title: 'Survey Complete.',
            description: "The survey have been completed successful.",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          finishSurvey()
        }
        dispatch(next())
    }
    function previousPage(){
        dispatch(prevPage())
    }
    function changeValue(val){
        dispatch(change(val))
        dispatch(answer())
    }
    const toast = useToast()
    const actualPage= useSelector(state => state.survey.actualPage)
    if( !loading){
        if(actualPage < survey.question.length){
            radios = survey.question[actualPage].pa.map((x,i) => <Radio key={i} value={i.toString()}>{x.t == 1 ? <Image
            boxSize='150px'
            objectFit='cover'
            src={'http://localhost:5000/'+x.a}
            alt='Dan Abramov'
            /> : x.a}</Radio>)
    }
}
        
    const finishSurvey =  async () => {
        axios.post('http://localhost:5000/api/survey/finish', {surveyId : id, response: ans}).then(() => {console.log('done')})
    }

    const value = useSelector(state => state.survey.value)
    let percent = 0
    if(!loading){
     percent = Math.round((actualPage/survey.question.length)*100)
    }
    return(
        <div className="center-container">
            {
                loading 
            ? <LoadingHamster /> 
            :
        radios.length > 0 ? 
        <>
        <center>
            <Heading as='h2' size='lg' w={"100%"}  mb={"10px"}>{"Complete the survey"}</Heading>
            <Heading as='h6' size='sm'w={"100%"}  mb={"10px"}>{`By ${survey.owner.username}`}</Heading>
        </center>
        <Progress colorScheme='green' size='lg' value={percent} ml={"auto"} mr={"auto"} mb={"10px"}/>
        <Heading as='h6' size='xs'w={"max-content"} ml={"auto"} mr={"auto"} mb={"10px"}>{`${actualPage} of ${survey.question.length}`}</Heading>     
        <SurveyBody value={value} changeValue={changeValue} radios={radios} heading={survey.question[actualPage].q}/>  
        <Grid templateColumns='repeat(8, 1fr)' mt={"10px"} gap={0}>
            <GridItem colSpan={1} h='10'>
                <Button colorScheme='blue' w="100%" onClick={previousPage} isDisabled={actualPage == 0}><ArrowBackIcon /></Button>
            </GridItem>
            <GridItem colStart={8} colEnd={9} h='10' >
                <Button w="100%" colorScheme='blue' onClick={nextPage} marginRight={"2px"}><ArrowForwardIcon /></Button>
            </GridItem>
        </Grid>
        </>
        :
        <Heading ml={"auto"} mr={"auto"} mb={"10px"}>{"Survey Complete"}</Heading>
        
     }
        </div>
    )
}
import { Radio, Button, Heading,  Progress, Grid, GridItem, Image, Checkbox} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import LoadingHamster from "./components/LoadingHamster";
import { useState, useEffect} from "react";
import axios from "axios";
import SurveyBody from "./components/SurveyBody";
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'
import './survey.css'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { start, answer, nextPage as next, prevPage, changeValue as change, reset, setSurvey, answerMulti} from "./redux/survey";
import BarSelecion2 from "./components/ToAnsweComponents/BarSelection";
import Cookies from 'js-cookie'
import SurveySuccess from "./components/SurveySuccess";
import API_URL from "../config/backend";
//data => object with 2 parameters (p => question, a => list of possible answers)
export default function Survey(){
    const API = API_URL
    let radios = [];
    var {id} = useParams()
    const survey = useSelector(state => state.survey.survey)
    let body = null
    const [loading, setLoading] = useState(true)
    const [ip, setIp] = useState('')
    const ans = useSelector(state => state.survey.answers)
    const value = useSelector(state => state.survey.value)
    const multValues = useSelector(state => state.survey.multiValue)
    const dispatch = useDispatch()
    const youCant = ()=>{
        toast({
            title: 'Access denied',
            description: "You have already completed this survey",
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        window.location.href = `${API}/`;
                    
    }

    useEffect(() => {
        console.log(import.meta.env.VITE_IP_API_KEY)
        dispatch(reset())
        axios.get(`https://api.ipdata.co?api-key=${import.meta.env.VITE_IP_API_KEY}`).then(({data}) => {
            setIp(data.ip)
            if(!Cookies.get(id)){
            axios.get(`${API}/api/survey/checkIp`, {
                params: {
                    id: id,
                    ip: data.ip
                }
            }).then(({data}) => {
                if(data.exist){
                    //youCant()
                }
            })}else{
                //youCant()
            } })
        
        axios.get(`${API}/api/survey`, 
        {
            params:
            {
            id:id
            }
        }).then(({data}) => {
            dispatch(setSurvey(data))
            setLoading(false)
            dispatch(start(data.questions.length))
        }).catch(err => {console.log(err)})
    }, [])
    function nextPage(){
        if(actualPage == survey.questions.length-1){
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
        if(actualPage < survey.questions.length){
        if(survey.questions[actualPage].pa[0].t != 2){
            radios = survey.questions[actualPage].m ? 
            survey.questions[actualPage].pa.map((x,i) => <Checkbox isChecked={multValues.includes(i.toString())} 
            onChange={() => dispatch(answerMulti(i.toString()))} key={i} value={i.toString()}>{x.t == 1 ? <Image
                boxSize='150px'
                objectFit='cover'
                src={`${API}/`+x.a}
                alt='Dan Abramov'
                /> : x.a}</Checkbox>)
            :
            survey.questions[actualPage].pa.map((x,i) => <Radio key={i} value={i.toString()}>{x.t == 1 ? <Image
            boxSize='150px'
            objectFit='cover'
            src={`${API}/`+x.a}
            alt='Dan Abramov'
            /> : x.a}</Radio>)
            body = <SurveyBody multiple={survey.questions[actualPage].pa[0].m} value={value} changeValue={changeValue} radios={radios} heading={survey.questions[actualPage].q}/>  
        }else{
            if(survey.questions[actualPage].pa[0].a > value || survey.questions[actualPage].pa[1].a < value ) {
                changeValue(survey.questions[actualPage].pa[0].a)
            }
            body = <BarSelecion2 
            heading={survey.questions[actualPage].q}
            start= {survey.questions[actualPage].pa[0].a} 
            end= {survey.questions[actualPage].pa[1].a} 
            onChange={changeValue} 
            value={value} />
       

    }
    }
}
        
    const finishSurvey =  async () => {
        axios.post(`${API}/api/survey/finish`, {surveyId : id, response: JSON.stringify( ans ), ip: ip}).then(() => {console.log('done')})
        Cookies.set(id, true)
    }

    
    let percent = 0
    if(!loading){
     percent = Math.round((actualPage/survey.questions.length)*100)
    }
    return(
        <div className="center-container">
            {
                loading 
            ? <LoadingHamster /> 
            :
        body != null? 
        <>
        <center>
            <Heading as='h2' size='lg' w={"100%"}  mb={"10px"}>{"Complete the survey"}</Heading>
            <Heading as='h6' size='sm'w={"100%"}  mb={"10px"}>{`By ${survey.owner.username}`}</Heading>
        </center>
        <Progress colorScheme='green' size='lg' value={percent} ml={"auto"} mr={"auto"} mb={"10px"}/>
        <Heading as='h6' size='xs'w={"max-content"} ml={"auto"} mr={"auto"} mb={"10px"}>{`${actualPage} of ${survey.questions.length}`}</Heading>     
        {body}  
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
        <SurveySuccess/>
        
     }
        </div>
    )
}
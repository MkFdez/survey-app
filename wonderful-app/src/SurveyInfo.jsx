import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Link as ChakraLink,
  Center,
  Flex,
  CircularProgress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  Collapse,
  Button,
} from '@chakra-ui/react';
import QRCode from 'qrcode'
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import CopyTextComponent from './components/CopyTextComponent';
import axios from 'axios';
import RoundedImage from './components/RoundedImage';
import DatesGraphic from './components/DatesGraphic';
import API_URL from '../config/backend';
export default function SurveyInfo() {
  const API = API_URL()
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]) 
  const [dates, setDates] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const chartRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState('300px');
  useEffect(() => {
    let canvas = document.getElementById('qrcode')
    let url = 'https://surveyswebsite.onrender.com/survey/'+id
    if(!canvas) return
    console.log(canvas)
    console.log(url)
    QRCode.toCanvas(canvas, url, function (error) {
      if (error) console.error(error)
      console.log('success!');
    })
  }, [survey]);
  const forceResize = () => {
    
   
    // Create a new resize event
    var resizeEvent = new Event('resize');
    
    // Dispatch the event on the element
    window.dispatchEvent(resizeEvent);
    
      }
      const handleQuestionToggle = (questionId) => {
        
        if (selectedQuestion === questionId) {
          setSelectedQuestion(null);
        } else {
          setSelectedQuestion(questionId);
        }
         //setTimeout(() => {forceResize()}, 200)
      };
  useEffect(() => {
    
    forceResize()
    const updateContainerHeight = () => {
      if(chartRef.current != null){
      const height = chartRef.current.clientHeight;
      setContainerHeight(height);
      }
    };

    window.addEventListener('resize', updateContainerHeight);
    updateContainerHeight();

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);
  const chartHeight = containerHeight > 0 ? containerHeight : 300;
  var colors = [
    "#FF5252", // Red,
    "#536DFE",  // RoyalBlue
    "#FF4081", // Pink
    "#E040FB", // Purple
    "#673AB7", // DeepPurple
    "#3F51B5", // Indigo
    "#03A9F4", // LightBlue
    "#00BCD4", // Cyan
    "#009688", // Teal
    "#4CAF50", // Green
    "#8BC34A", // LimeGreen
    "#CDDC39", // Lime
    "#FFEB3B", // Yellow
    "#FFC107", // Amber
    "#FF9800", // Orange
    "#FF5722", // DeepOrange
    "#795548", // Brown
    "#9E9E9E", // Grey
    "#607D8B", // BlueGrey
    
    "#4CAF50", // Green
  ];
  
  
    
    
  
  useEffect(() => {
    // Fetch survey data from the server using the surveyId
    fetchSurveyData();
  }, [id]);

  const fetchSurveyData = async () => {
    try {
      const data = await axios.get(`${API}/api/survey/info`, {params:{surveyId:id}})
      
        let temp_resp = data.data        
      setSurvey(temp_resp)
      let q = []
      let temp = temp_resp.responses.map(x =>  typeof(x.response) == typeof('word') ? JSON.parse(x.response): x.response)
      let dates_array = temp_resp.responses.map(x => x.date)
      setDates(dates_array)
      for(let i = 0; i < temp[0].length; i++){
        if(typeof(temp[0][i]) == typeof([])){
          let b = []
          for(let a of temp){
            b = b.concat(a[i])
          
          }
          q.push(b)
        }else{
        q.push(temp.map(x => x[i]))
        }
      }
      setQuestions(q)
      
      
    } catch (error) {
      console.log('Error fetching survey data:', error);
    }
  };

  if (!survey) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal.500" />
      </Center>
    );
  }

  const link = 'https://surveyswebsite.onrender.com/survey/'+id

  //console.log(questions)
  const participants = survey.responses.map((x,i) => `User ${i}`)
  // Count the number of participants
  const participantsCount = participants.length;
 

  const getPieChartData = (answers, i) => {
    const counts = new Map();
    // Count the occurrences of each answer
    answers.forEach((answer) => {
      counts.set(answer, (counts.get(answer) || 0) + 1);
    });
    console.log(answers)
    // Convert the answer counts to pie chart data format
    const totalAnswers = answers.length;
    const pieData = Array.from(counts, ([answer, count]) => ({
      answer: answer ,
      value: count,
      percent: ((count / totalAnswers) * 100).toFixed(0),
    }));
    
    return pieData;
  };

  const renderQuestionChart = (question, i) => {
    const pieData = getPieChartData(question, i);
    return (
      <Box key={i}>
        <center>
        <Heading as="h2" size="md" mb={2}>
          {survey.moreData.questions[i].q}
        </Heading>
        </center>
        {question.length > 0 ? (
           <Box ref={chartRef} height={'300px'} width={'100%'}>
            <ResponsiveContainer width="95%" height={400}>
            <PieChart height={300} width={400} >
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="answer"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#3182CE"
                
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} style={{outline: 'none'}} fill={colors[index]} />
                ))}
              </Pie>
              <Legend layout="vertical" verticalAlign="bottom" align="center" formatter={
                (value, entry, index) =>  
                  survey.moreData.questions[i].pa[0].t != 1 
                ? <span className="text-color-class">{survey.moreData.questions[i].pa[0].t == 0?  survey.moreData.questions[i].pa[index].a : value}</span> 
                : <RoundedImage imageUrl={`${API}/`+survey.moreData.questions[i].pa[index].a} width={'20%'} height={"20%"}/>
                }/>
              
            </PieChart>
            </ResponsiveContainer>
   
          </Box>
        ) : (
          <Text>No answers yet for this question.</Text>
        )}
      </Box>
    );
  };

  return (
    <>
    <Nav />
    <Box p={8}>
      <Heading as="h1" mb={6} fontSize="2xl">
        Survey Details
      </Heading>
      <Box mb={6} >
        <Text fontSize="lg">
          Survey Link:{' '}
          
        
          
        </Text>
        <CopyTextComponent text={link} ></CopyTextComponent>
      </Box>
      <Grid templateColumns={{ sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={4} mb={6}>
        <Stat>
          <StatLabel>Total Participants</StatLabel>
          <StatNumber>{participantsCount}</StatNumber>
          <StatHelpText>Click the questions to view details</StatHelpText>
        </Stat>
        <canvas  id='qrcode' height={'30%'} width={"30%"}></canvas>
          
      </Grid>
      <DatesGraphic datesData={dates} />
    {
      questions.length > 0 ?
      <>
      <Box mb={6}>
        <Flex justify="center">
          <Box p={4} borderWidth={1} borderRadius="md" >
            {
            questions.map((question, i) => (
              <Button
                key={i}
                variant={selectedQuestion === i ? 'solid' : 'outline'}
                colorScheme="teal"
                size="sm"
                onClick={() => {
                  handleQuestionToggle(i)
                  if(selectedQuestion == i || selectedQuestion == null) 
                      {forceResize()}
                }}
                mr={2}
              >
                {`question ${i}`}
              </Button>
            ))}
          </Box>
        </Flex>
      </Box>
      <Box width="100%" overflowX="auto">
        <Flex direction="column" align="stretch">
          {questions.map((question, i) => (
            <Collapse key={i} in={selectedQuestion === i} >
              {renderQuestionChart(question, i)}
              </Collapse>
          ))}
        </Flex>
      </Box>
      </>
      :
      <center><Text>nobody has answered this survey</Text></center>
          }
    </Box>
    <Footer  />
    </>
  );
}

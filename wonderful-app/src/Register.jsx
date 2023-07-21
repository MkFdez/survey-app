import { React } from 'react'
import { useState } from 'react';
import axios from 'axios';
import Cookie from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import {
    Button,
    Flex,
    FormErrorMessage,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { SmallCloseIcon } from '@chakra-ui/icons';
  import IconUploader from './components/IconUploader';
import { set } from 'lodash';
  export default function Register({check}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [p_picture, setPicture] = useState('');
    const [usernameError, setUsernameError] = useState({error: false, message: ''});
    const [emailError, setEmailError] = useState({error: false, message: ''});
    const [passwordError, setPasswordError] = useState({error: false, message: ''});

    const [isLoading, setIsLoading] = useState(false);
    console.log(p_picture)
    let path = null
    async function onFormSubmit(e){
      
      e.preventDefault();
      if(passwordError.error){
        return
      }
      setIsLoading(true)
      const formData = new FormData();
      formData.append('id', `pps/${generateGUID()}`)
      formData.append('image', p_picture);
      try{
      const imageResponse = await axios
      .post('http://localhost:5000/upload', formData, {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      })
      path = imageResponse.data.final_path
    }catch(err){
      path = null
    }
      try{
      const userResponse = await axios.post('http://localhost:5000/api/users', {
        username: username,
        email: email,
        password: password,
        picture: path,
      })
      
    }catch(err){
      console.log(err)
        if(err.response.data.error.includes('username')){
          setUsernameError({error: true, message: 'username already exists'})
        }
        if(err.response.data.error == 'email'){
          setEmailError({error: true, message: 'email already exists'})
        }
       setIsLoading(false)
       return
    }
    
      
      const loginResponse = await axios.post('http://localhost:5000/api/login', {
        username: username,
        password: password,
      })
      const { token } = loginResponse.data;
      const {picture} = loginResponse.data;
      console.log(token);
      const cookie = new Cookie();
      cookie.set('token', token, { path: '/', sameSite: 'none', secure: true});
      cookie.set('picture', picture, { path: '/', sameSite: 'none', secure: true});
      check()
      navigate('/');
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
      <form>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.100', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            Register
          </Heading>
          <FormControl id="userName">
            <FormLabel>User Icon</FormLabel>
            <Stack direction={['column', 'row']} spacing={6}>
              <IconUploader image={p_picture} upt={(img) => {setPicture(img)}}/>
            </Stack>
          </FormControl>
          
          <FormControl isInvalid={usernameError.error} id="userName" isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              value={username}
              onChange={(e) => {
                setUsernameError({error:false, message:""})
                setUsername(e.target.value)}}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
            
             {usernameError.error && <FormErrorMessage>{usernameError.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={emailError.error} id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
                value={email}
                onChange={(e) => {
                  setEmailError({error: false, message:""})
                  setEmail(e.target.value)}}
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
            {emailError.error && <FormErrorMessage>{emailError.message}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={passwordError.error} id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              value={password}  
              onChange={(e) => {
                if(!e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)){
                  setPasswordError({error: true, message:"the password must be at least eight characters, at least one letter and one number"})
                  }else{
                    setPasswordError({error: false, message:""})
                  }
                
                setPassword(e.target.value)
              }}
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
            {passwordError.error && <FormErrorMessage>{passwordError.message}</FormErrorMessage>}
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
            isLoading={isLoading}
              onClick={onFormSubmit}
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    );
  }
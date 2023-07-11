import { useState } from 'react'
import Cookie from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import axios from 'axios';
  
  export default function Login({check}) {
    const navigate = useNavigate()
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await axios.post('http://localhost:5000/api/login', {
            withCredentials: true,
            mode:'no-cors',
            username: username,
            password: password});
        const {token} = response.data;
        const {picture} = response.data;
        console.log(token)
        console.log(picture)
        
        const cookie = new Cookie();
        
        if(!rememberMe) {
            const expirationDate = new Date();
            // Set the cookie with an expiration time of 30 day from the current time
            expirationDate.setDate(expirationDate.getDate() + 30);
            cookie.set('token', token, { expires: expirationDate,  path: '/' , sameSite: 'none', secure: true});
            cookie.set('picture', picture, { expires: expirationDate,  path: '/' , sameSite: 'none', secure: true});
        }else{
            cookie.set('token', token, { path: '/' , sameSite: 'none', secure: true});
            cookie.set('picture', picture, { path: '/' , sameSite: 'none', secure: true});
        }
        check()
        navigate('/')
    }
    return (
        <form>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" value={username} onChange={e => setUsername(e.target.value)}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox value={rememberMe} onChange={e => setRememberMe(e.target.checked)}>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                  <Link href='/user/register'color={'blue.400'} >Register</Link>
                </Stack>
                <Button
                onClick={handleSubmit}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </form>
    );
  }
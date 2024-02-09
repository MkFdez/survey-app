import { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Heading
} from '@chakra-ui/react';
import Cookies from 'universal-cookie';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import darkIcon from '../assets/forDarkIcon.png'  
import lightIcon from '../assets/forLightIcon.png'  
import isAuthenticated from '../../utils/isAuthenticated';
import { useNavigate} from 'react-router-dom';
import logout from '../../utils/logout';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Nav() {
  const navigate = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [picture, setPicture] = useState('')
  const [authenticated, setAutheticated] = useState(false)
  console.log(authenticated)
  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticatedResult = await isAuthenticated();
      if(isAuthenticatedResult){
        const cookie = new Cookies()
        setPicture(`https://surveybackend-r4pd.onrender.com/${cookie.get('picture')}`)
      }else{
        console.log('not Authenticated')
      }
      setAutheticated(isAuthenticatedResult)
    };

    checkAuthentication();
  }, []);
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box display='flex' alignItems={"center"}>
            
            <Image  onClick={() => {navigate('/')}}   w={"30px"} h={"30px"}              
                      src={colorMode == "light" ? lightIcon : darkIcon}
                    />
            <Heading onClick={() => {navigate('/')}}  as='h3' size="s">{"Cool Name"}</Heading>
            
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            {!authenticated
            ?
            <Flex alignItems={'center'}><Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            href={'/user/login'}>
            Sign In
          </Button></Flex>
            :
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={picture}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={picture}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={() => {navigate('/user/surveys')}}>Your Surveys</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={()=>{
                    window.location.reload()
                    logout()
                    window.location.reload();
                  }}>Logout</MenuItem>
                </MenuList>
              </Menu>
    }
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
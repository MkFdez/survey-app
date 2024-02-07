import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tbody, Tr, Th, Td, Link, Button, Box, Heading, Center } from '@chakra-ui/react';
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cookies from 'js-cookie'
import API_URL from '../config/backend';
const UserSurveys = () => {
  const [data, setData] = useState([]);
  const API = API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = 'Bearer ' + Cookies.get('token')
        const config = {
            headers: { Authorization: token },
          }
        const response = await axios.get(`${API}/api/users/surveys`, config);
        setData(response.data.surveys);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
    <Nav />
    <Box>
      <Center>
        <Heading as="h2" size="xl" mt={8} mb={4}>
          My Surveys
        </Heading>
      </Center>
      <Box display="flex" justifyContent="center">
        <Table variant="striped" size="sm" width="100%" m={4}> 
          <thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Public</Th>
              <Th>Responses</Th>
              <Th>ID</Th>
            </Tr>
          </thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.title}</Td>
                <Td>{formatDate(item.date)}</Td>
                <Td>{item.public.toString()}</Td>
                <Td>{item.responses.length}</Td>
                <Td>
                  <Link href={`https://surveyswebsite.onrender.com//survey/info/${item.id}`} isExternal>
                    <Button variant="link">Info</Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
    <Footer />
    </>
  );
};

export default UserSurveys;

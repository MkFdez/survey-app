import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import {
  FcComboChart,
  FcShare,
  FcPrivacy,
  FcBusinessman,
} from 'react-icons/fc';



const Card = ({ heading, description, icon }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function Features() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Features
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Easy to use'}
            icon={<Icon as={FcBusinessman} w={10} h={10} />}
            description={
              'Build your surveys easily by using a clean UI and our powerful tools'
            }
          />
          <Card
            heading={'Have the control'}
            icon={<Icon as={FcComboChart} w={10} h={10} />}
            description={
              'All the mretrics are available for having a better control of your surveys'
            }
            href={'#'}
          />
          <Card
            heading={'AI Assistant'}
            icon={<Image src='https://img.icons8.com/fluency/48/bot.png' w={10} h={10} />}
            description={
              'Use AI for building surveys automatically just by giving the topic'
            }
            href={'#'}
          />
          <Card
            heading={'Easy to share'}
            icon={<Icon as={FcShare} w={10} h={10} />}
            description={
              'Just copy the link and share it with the world'
            }
            href={'#'}
          />
          <Card
            heading={'Secure'}
            icon={<Icon as={FcPrivacy} w={10} h={10} />}
            description={
              'The system controls users interaction for avoiding distorted results in your surveys, protecting also user anonymity'
            }
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  );
}
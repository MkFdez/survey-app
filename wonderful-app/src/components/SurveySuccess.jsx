import { Box, Heading, Button } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

export default function SurveySuccess() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Survey Completed
      </Heading>
      <Link to='/'>
      <Button leftIcon={<ArrowBackIcon />}  colorScheme='teal' variant='outline'>
             Back to Home
        </Button>
        </Link>
    </Box>
  );
}
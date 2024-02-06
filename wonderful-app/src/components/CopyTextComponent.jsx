import { Box, Button } from "@chakra-ui/react";
import { useClipboard, useToast } from "@chakra-ui/react";
export default function CopyTextComponent({ text }) {
    const { hasCopied, onCopy } = useClipboard(text);
    const toast = useToast()
    const handleCopy = () => {
        onCopy()
        toast({
            title: 'Link Copied',
            description: "The link was successfuly copied",
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
    }
    return (
      <Box p={4} borderWidth={1} borderRadius="md" maxW={'max-content'} >
        <Box  marginRight="5" display={'inline'}>
          {text}
        </Box>
        <Button onClick={handleCopy} colorScheme="teal" size="sm">
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Box>
    );
  }
  
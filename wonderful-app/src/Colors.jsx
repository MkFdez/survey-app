import { Grid, GridItem } from '@chakra-ui/react'

export default function Colors(){
    function generateHex(){
        let x = Math.floor((Math.random() * 255));
        let result = x.toString(16)
        if(x <=15){
            result = "0" + result
        }
        return result
    }
    const generateRandomColor = () => `#${generateHex()}${generateHex()}${generateHex()}`
    let colors = []
    for(let i = 0; i < 32; i++){
        let temp = generateRandomColor()
        let grid = <GridItem key={i} alignItems={"center"} alignContent={"center"} w='100%' h='65' bg={temp}>{temp}</GridItem>
        colors.push(grid)
    }

    return (
        <Grid templateColumns='repeat(8, 1fr)' gap={1} w='80%'>
            {colors}
        </Grid>
    )
}
import { Grid, GridItem } from '@chakra-ui/react'

export default function OddNumbers(){
    function isOdd(num)
    {
        if(num ==0 ){
            return false
        }
        let stop = Math.sqrt(num)
        if (num <= 3) {
            return true
        }
        for(let i = 2; i <= stop; i++){
            if(num%i == 0){
                return false
            }
        }
        return true
    }

    let numbers = []
    for(let i = 0; i < 32; i++){
        numbers.push(i)
    }
    let values = numbers.map((x) => {
    let prime = isOdd(x)
    return(
    <GridItem key={x} alignItems={"center"} alignContent={"center"} w='100%' h='65' bg={prime ? "red" : x%2==0 ? "green.300":"yellow.300"}>{x}</GridItem>
    )
})
    return (
        <Grid templateColumns='repeat(8, 1fr)' gap={1} w='80%'>
            {values}
        </Grid>
    )
}
 
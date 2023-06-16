import { useState, useEffect } from "react"
import { Radio, Image, Button, Input, Stack, RadioGroup } from "@chakra-ui/react";
import React from "react";
import ImageUploader from "../ImageUploader";
export default function ImageQuestion(props){

    function buildELements(o)
    {
        let temp = []
        o.forEach((e,i) => {
            
            let comp =   <ImageUploader image={e.a == "" ? null : e.a} key={i} imageFolder={props.imageFolder} upt={(d) => {props.upt(d,i)}} />   
            temp.push(comp)

        });
        
        return temp
    }
   let elements = buildELements(props.data)

    return(
        <>      
            <Stack>
                <RadioGroup>        
                    <Stack>       
                        {elements} 
                    </Stack>
                </RadioGroup>
                
                <Button maxW={'30%'} onClick={() => props.add({a:"", t:1})}>Add</Button>
            </Stack>
        </>
      
    )
}
import * as React from 'react'
import  {ChakraProvider}  from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import Survey from './Survey.jsx'
import { lightTheme, darkTheme } from "./theme"
import Nav from './components/Nav.jsx'
import Home from './Home.jsx'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'
import {Provider} from 'react-redux'

const test = [{p: "Select the correct Answer \n 2+2 is:", a:[{type:"i", value:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},{type:"i", value:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},{type:"i", value:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'},{type:"i", value:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}]}, {p: "Select the correct Answer \n 7+2 is:", a:[{type:"t", value:8},{type:"t", value:0},{type:"t", value:20},{type:"t", value:2}]}] 
const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
  <Provider store={store}>
      <ChakraProvider theme={darkTheme}>      
        <App />     
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
)


<div>
{ !visible ?
   <Skeleton>
     <div>content</div>
     <div>content</div>
     <div>content</div>
   </Skeleton>
 :
<Card maxW='sm'>
<CardBody>
<Image
src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
alt='Green double couch with wooden legs'
borderRadius='lg'
/>
<Stack mt='6' spacing='3'>
<Heading size='md'>Living room Sofa</Heading>
<Text>
 This sofa is perfect for modern tropical spaces, baroque inspired
 spaces, earthy toned spaces and for people who love a chic design with a
 sprinkle of vintage design.
</Text>
<Text color='blue.600' fontSize='2xl'>
 $450
</Text>
</Stack>
</CardBody>
<Divider />
<CardFooter>
<ButtonGroup spacing='2'>
<Button variant='solid' colorScheme='blue'>
 Buy now
</Button>
<Button variant='ghost' colorScheme='blue'>
 Add to cart
</Button>
</ButtonGroup>
</CardFooter>
</Card>
}
 <a href="https://vitejs.dev" target="_blank">
   <img src={viteLogo} className="logo" alt="Vite logo" />
 </a>
 <a href="https://react.dev" target="_blank">
   <img src={reactLogo} className="logo react" alt="React logo" />
 </a>
</div>
<h1>Vite + React</h1>
<div className="card">
 <button onClick={() => setCount((count) => count + 1)}>
   count is {count}
 </button>
 <p>
   Edit <code>src/App.jsx</code> and save to test HMR
 </p>
</div>
<p className="read-the-docs">
 Click on the Vite and React logos to learn more
</p>
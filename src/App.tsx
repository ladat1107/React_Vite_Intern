import React from 'react'
import './App.css'
import Specialtys from './components/Specialtys/Specialtys'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
function App(): React.ReactElement {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Specialtys />
      </QueryClientProvider>

    </>

  )
}

export default App

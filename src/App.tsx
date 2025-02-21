import React from 'react'
import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Specialtys from './components/Specialtys/Specialtys'
function App(): React.ReactElement {
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

import React from 'react'
import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import LiveAnyWhere from './components/PageTaiwind/LiveAnyWhere'
function App(): React.ReactElement {
  // Create a client
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LiveAnyWhere />
      </QueryClientProvider>

    </>

  )
}

export default App

import React, { FC } from 'react'
import Login from './Components/Login/Login';
import Home from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: FC = () => {

  // UseQuery
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
  )

  // Get Token
  const [getToken, setGetToken] = React.useState<string | null>('')
  React.useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')
    if (!token && hash) {
      token = hash.split('&')[0].split('=')[1]
      window.location.hash = ""
      window.localStorage.setItem('token', token)
    }
    setGetToken(token)
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper__flex">
        {getToken ? <Home code={getToken} /> : <Login />}
      </div>
    </QueryClientProvider>
  );
}

export default App;

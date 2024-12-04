import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useLocationStorage from './hooks/useLocationStorage'
import useDebouncedState from './hooks/useDebouncedState'
import useFetch from './hooks/useFetch'
import usePrevious from './hooks/usePrevious'
import useCustomEffect from './hooks/useCustomEffect'

function App() {
  const [count, setCount] = useLocationStorage('count', 0);
  const [count1, setCount1] = useState(0);
  const prevCount = usePrevious(count)
//  const [nonDebouncedState, setNonDebouncedState] = useState();
    const [search, setSearch] = useDebouncedState('', 3000);
    
  useCustomEffect(() => {
    console.log("custom useEffect called on mounting");
  }, [count1])

  //const [data, error] = useFetch('https://jsonplaceholder.typicode.com/todos/3');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount( count + 1)}>
          count is {count}
          <br></br>
          prev count is {prevCount}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            
        ></input>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

        {/* <div>
        {data ? <div>User ID: {data.userId}</div> : <div>Loading...</div>}
        </div> */}
    </>
  )
}

export default App

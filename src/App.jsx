import { useCallback, useState , useEffect , useRef} from 'react'

import './App.css'


function App() {
  
  const [length , setLength] = useState(8)
  const [numberUse,setNumber] = useState(false)
  const [charUse,setChar] = useState(false)
  const [password,setPassword] = useState("")

  const passwordGenerator = useCallback((e)=>{
    let pass = ""
    let str = "";
    str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberUse) str+= "0123456789"
    if(charUse) str+="!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"

    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random()*str.length + 1);
      pass+=str[char];
    }
    setPassword(pass);
  },[length,numberUse,charUse,setPassword])
  
  const copyPasswordtoClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(()=>{
    passwordGenerator();
  },[length,numberUse,charUse,passwordGenerator])

  const passwordRef  = useRef();
  return (
    <>
        <div className='flex max-w-6xl mx-auto h-screen justify-center items-center'>
          <div className="w-4/5 h-40 mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-900 text-center">
            PASSWORD GENERATOR
            
            <div className=' justify-center flex shadow rounded overflow-hidden mb-4 my-5'>
              <input type="text"
              value={password}
              placeholder='Password'
              readOnly
              ref={passwordRef}
              className='w-3/5  outline-none py-1 px-3 '
              />
              <button className=' outline-none  bg-blue-700 shrink-0 text-white py-2 px-2 cursor-pointer'
              onClick={copyPasswordtoClipboard}
              >Copy</button>
            </div>
            <div className='flex text-sm gap-x-2 justify-center'>
                <div className='flex items-center gap-x-1'>
                  <input 
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  className='cursor-pointer'
                  onChange={(e)=>{
                    setLength(e.target.value)
                  }}
                  />
                  <label>Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input type="checkbox" defaultChecked={numberUse} id="numberInput" 
                  className='cursor-pointer'
                  onChange={()=>{
                    setNumber( (prev) => !prev)
                  }}
                  />
                  <label htmlFor="numberInput">Numbers</label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input type="checkbox" defaultChecked={charUse} id="charInput" 
                  className='cursor-pointer'
                  onChange={()=>{
                    setChar( (prev) => !prev)
                  }}
                  />
                  <label htmlFor="charInput">Characters</label>
                </div>
            </div>
          </div>

        </div>
    </>
   
  )
}

export default App

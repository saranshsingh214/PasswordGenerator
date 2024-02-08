import { useState,useCallback,useEffect,useRef} from 'react'
function App() {

  const [length,setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] =useState(false);
  const [password,setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const copyPassword = ()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  }

  const passwordGenerator = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="~!@#$%^&*/";
    
    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*(str.length)+1);
      pass+=str.charAt(char);
    }
    setPassword(pass);
    console.log(password);

  },[length,numberAllowed,charAllowed,setPassword]);
  
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,setPassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto px-4 py-3 shadow-md rounded-lg my-8 text-orange-500 bg-gray-700">
         <h1 className='text-white text-center text-lg my-2'>Password Generator</h1>
        <div className="shadow rounded-lg flex overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3 '
          placeholder='password'
          readOnly
          ref={passwordRef}
           />

          <button onClick={copyPassword} className='bg-blue-700 text-white px-3 py-1'>COPY</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="item-center gap-x-1 flex">
            <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursonr-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
             />
             <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{setNumberAllowed((prev)=>!prev)}}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{setCharAllowed((prev)=>!prev)}}
             />
             <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

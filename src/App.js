import { useEffect, useState } from 'react';
import Home from './components/Home'
import Board from './components/Board';
import './App.css';


function App() {
  const [level,setLevel]=useState('1');
  const [respData,setRespdata]=useState({});
  const [unsolvedArr,setUnsolvedArr]=useState([]);
  const [playing,setPlaying]=useState(false);
  const [userVal,setUserVal]=useState();
  const [row,setRow]=useState();
  const [col,setCol]=useState();
  const [isCorrect,setIsCorrect]=useState(false);
  const [correctVal,setCorrectVal]=useState(0);
  const [errorVal,setErrorVal]=useState(0);
  
  useEffect(()=>{
    if(userVal!=undefined && row!=undefined && col!=undefined){
      if(respData?.response?.solution[row][col]==userVal){
        setIsCorrect(true);
        setCorrectVal(correctVal+1);
      }else{
        setIsCorrect(false)
        setErrorVal(errorVal+1);
      }
    }
  },[row,col])

  useEffect(()=>{
    setCol();
    setRow();
    setIsCorrect(false)
  },[userVal])

  useEffect(()=>{
      const newArr=unsolvedArr.map((ele,rowIndex)=>(
          ele.map((val,colIndex)=>{
            if(rowIndex==row && colIndex==col){
              return userVal;
            }else{
              return val;
            }
          })
        )
      ) 
      setUnsolvedArr(newArr);
    
  },[row,col])

  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://sudoku-board.p.rapidapi.com/new-board',
    params: {diff: level, stype: 'list', solu: 'true'},
    headers: {
      'X-RapidAPI-Key': 'dc0db86c08msh354055d4adef621p1d5776jsne236f0b7ffe1',
      'X-RapidAPI-Host': 'sudoku-board.p.rapidapi.com'
    }
  };

  const sendGetRequest = async () => {
     try{
      const resp = await axios(options);
      setRespdata(resp.data)
      setUnsolvedArr(resp.data.response["unsolved-sudoku"])
      setPlaying(true);
    }catch (err) {
      console.error(err);
    }
  };

  const checkLevel=(val)=>{
    if(val==1){
      return "Easy"
    }else if(val==2){
      return "Medium"
    }else{
      return "Hard"
    }
  }

  const leveColor=()=>{
    if(level==1){
      return "green"
    }else if(level==2){
      return "medium"
    }else{
      return "red"
    }
  }
  
  const setIndices=(r,c)=>{
      setCol(c);
      setRow(r);
  }


  return (
    <div className="App">
      {
        (!playing)?
        <Home setLevel={setLevel} sendGetRequest={sendGetRequest}/>
        :
        (
         
            <div className='flex flex-col items-center mt-10'>
              <div>
                <h2 className='font-bold text-5xl text-blue-600' >Sudoku</h2>
                <h3 className='font-semibold mt-5'>Level : <span className={leveColor()}>{checkLevel(level)}</span> </h3>
                <p className='font-semibold'>Wrong attempts : <span className='red'>{errorVal}</span></p>
                <p className='font-semibold'>Correct attempts : <span className='green'>{correctVal}</span></p>
              </div>
              <div className='mt-10 w-full flex justify-evenly'>
                <Board unsolvedArr={unsolvedArr} setIndices={setIndices}/>
                
                <div className='grid grid-cols-3 gap-2'>
                    {[1,2,3,4,5,6,7,8,9].map((num) => (
                      <button
                      className='bg-gray-200 w-10 h-10 font-semibold'
                      key={num}
                      value={num}
                      onClick={(e) => {
                          setUserVal(e.target.value);
                      }}
                      >
                      {num}
                      </button>
                    ))}
                </div>
              </div>
              
            </div>
          
        )
      }
    </div>
  );
}

export default App;
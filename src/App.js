import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [level,setLevel]=useState('1');
  const [respData,SetRespdata]=useState({});
  const [unsolvedArr,setUnsolvedArr]=useState([]);
  const [playing,SetPlaying]=useState(false);
  const [userVal,setUserVal]=useState();
  const [row,SetRow]=useState();
  const [col,setCol]=useState();
  const [isCorrect,setIsCorrect]=useState(false);
  // const [error,setError]=useState(0);
  
  useEffect(()=>{
    if(userVal!=undefined && row!=undefined && col!=undefined){
      if(respData?.response?.solution[row][col]==userVal){
        setIsCorrect(true);
      }else{
        setIsCorrect(false)
      }
      // console.log(respData?.response["unsolved-sudoku"][row][col]);
    }
  },[row,col,userVal])

  useEffect(()=>{
    if(isCorrect==true){
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
    }
  },[isCorrect])

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
      SetRespdata(resp.data)
      setUnsolvedArr(resp.data.response["unsolved-sudoku"])
      SetPlaying(true);
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
  
  const setIndices=(r,c)=>{
      setCol(c);
      SetRow(r);
  }


  return (
    <div className="App">
      {
        (!playing)?
        (
          <div>
            <form>
              <label>Choose level : </label>
              <select onChange={(e)=>setLevel(e.target.value)}>
                <option value='1'>Easy</option>
                <option value='2'>Medium</option>
                <option value='3'>Hard</option>
              </select>
            </form>
            <div>
              <button onClick={()=>sendGetRequest()}>Play Game</button>
            </div>
          </div>
        )
        :
        (
          <div>
            <div>
              <h2>Sudoku</h2>
              <h3>Your Level : {checkLevel(level)}</h3>
              {/* <p>Error : {error}</p> */}
            </div>
            {
              unsolvedArr?.map((ele,rowIndex)=>(
                ele.map((val,colIndex)=>{
                  if(colIndex==8 && val==0)
                    return <><button onClick={()=>setIndices(rowIndex,colIndex)}>_</button><br/></>
                  else if(colIndex==8 && val!=0)
                    return <><button>{val} </button><br/></>
                  else if(val==0)
                    return <><button onClick={()=>setIndices(rowIndex,colIndex)}>_</button></>
                  else if(val!=0) 
                    return <><button>{val} </button></>
                })

              )
              )
            }
            <br/>
            <div>
              {[1,2,3,4,5,6,7,8,9].map((num) => (
                  <button
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
        )
      }
      
    </div>
  );
}

export default App;

import React from 'react'
import '../App.js'

export default function Board({unsolvedArr,setIndices}) {
  return (
    <div className=''>
        <table className='App-table w-96 h-96 text-2xl text-center'>
              {
                unsolvedArr?.map((ele,rowIndex)=>(
                    <tr className={((rowIndex+1)%3==0)?'bottom-border':'border'}>
                        { ele.map((val,colIndex)=>{
                      if(colIndex===8 && val===0)
                        return <td className={((colIndex+1)%3==0)?'right-border':'border'}><button onClick={()=>setIndices(rowIndex,colIndex)}>.</button><br/></td>
                      else if(colIndex===8 && val!==0)
                        return <td className={((colIndex+1)%3==0)?'right-border':'border'}><button>{val} </button><br/></td>
                      else if(val===0){
                        return <td className={((colIndex+1)%3==0)?'right-border':'border'}><button onClick={()=>setIndices(rowIndex,colIndex)}>.</button></td>
                      }
                      else if(val!==0){
                        return <td className={((colIndex+1)%3==0)?'right-border':'border'}><button>{val} </button></td>
                      } 
                      })
                      }
                    </tr>
                  )
                )
              }
        </table>
    </div>
  )
}

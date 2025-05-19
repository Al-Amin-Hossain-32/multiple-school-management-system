import React, { useState } from 'react'
import { MenuItem } from '@mui/material'

function Notice() {
  const noticeData = [
    {
      notice_id : "asdf",
      title :"This is Notice Title 1",
      descripton : "This is notice Description  1",
      role:["student","teacher","all"],
    },
    {
      notice_id : "asdasdf",
      title :"This is Notice Title 2",
      descripton : "This is notice Description 2 ",
      role:["student","teacher","all"],
    }
  ]

  const [notice,setNotice] = useState(noticeData)
  
//  const singleNoticeGenaratie =(notice)=>{
//   notice.map((sNotice)=>{
//     <p>{sNotice.title}</p>
//   })
//  }
 
  
  return (
    <div>
      <h3>Notice</h3>
      {notice.map((n)=>(
          <div>
            <h2>Notice: This is notice **{n.role[0]}**</h2>
             <h3>{n.title}</h3>
             <p>{n.descripton}</p>

             </div>
      ))}
    </div>
  )
}

export default Notice
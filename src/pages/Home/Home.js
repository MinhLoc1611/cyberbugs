import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    const userLogin = useSelector(state=>state.UserCyberBugReducer.userLogin);
  return (
    <div>
        {userLogin?.name}
        <img src={userLogin?.avatar} alt={userLogin?.name}/>
    </div>
  )
}

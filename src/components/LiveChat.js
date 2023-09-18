import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomNames } from "../helpers/randomNames";
import { generateRandomMessage } from "../helpers/randomMessages";

const LiveChat = () => {
    const [postLiveMessage,setPostLiveMessage] = useState("")
   const dispatch = useDispatch()
   const chatMessages = useSelector(store=>store.chat.messages)
    useEffect(() => {
      const interval =  setInterval(()=>{
         dispatch(addMessage({
            name:generateRandomNames(),
            message:generateRandomMessage(25)
         }))
        },500)
        return () => clearInterval(interval)
    },[])

  return (
    <>
    <div className="border w-3/4 border-gray-300 ml-4 rounded-lg ">
    <h1 className="font-normal text-2xl mt-3 ml-3 mb-3">Live Chat</h1> <hr />
    <div className=" h-[450px] ml-2 p-2  rounded-lg overflow-y-scroll  flex flex-col-reverse">
        
     {chatMessages?.map((c,index)=>(
        <ChatMessage key={index} name={c.name} message={c.message}/>
     ))}
     
    </div>
    <div className="w-full p-2 mt-2 ml-10 mb-6 ">
        <form action="" onSubmit={(e)=>{
            e.preventDefault()
            dispatch(addMessage({
                name:"Rahul V S",
                message:postLiveMessage
            }))
            setPostLiveMessage("")
        }}>
            <div className="flex">
            <input onChange={(e)=>{
                setPostLiveMessage(e.target.value)

            }} type="text" value={postLiveMessage} placeholder="Chat...."  className="pl-3 w-3/4 border border-l-white border-t-white border-r-white border-b-blue-600 border-b-2 h-10"/>
    <button type="submit"><img src="https://cdn.icon-icons.com/icons2/1875/PNG/512/send_120237.png" alt="Send" className=" ml-3 mt-1 w-8 h-8 mr-2" /></button>
</div> 
  </form>
    </div>
    </div>
    </>
  );
};

export default LiveChat;

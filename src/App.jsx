import { useState,useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import { ChatMessages } from './components/ChatMessages'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import './App.css'

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(()=>{
    Chatbot.addResponses({
      'goodmorning': 'Good Morning,I hope you are well',
      'goodafternoon': 'Good After Noon,I hope you are doing good',
      'goodevening': 'Good evening,I hope you have a clear thaught of study',
      'hijarvis': 'Hi sir, now start the journey',
      'goodnight':'Good Night, have a sweet dream',
      'goodbye': 'Goodbye. Have a great day!',
      'give me a unique id': function() {
        return `Sure! Here's a unique ID: ${crypto.randomUUID()}`;
      },
      'cureent time': function(){
        return `Sure! time is: ${dayjs().format("DD MMM YYYY, dddd, HH:mm a")}`
      }
    })
  })

      return (
        <div className="app-container">

          {chatMessages.length === 0 && (
            <p className="welcome-message">
              Welcome to the chatbot project! Send a message using the textbox below.
            </p>
          )}
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      )
}

export default App

import { useState } from 'react';
import loadingSpinner from '../assets/spinner-loader.gif'
import {Chatbot} from 'supersimpledev'
import dayjs from 'dayjs'
import './ChatInput.css'

export function ChatInput({ setChatMessages, chatMessages }) {
      const [inputText, setInputText] = useState('')
      const [isLoading, setIsLoading] = useState(false);

      function saveInputText(event) {
        setInputText(event.target.value);
      }

      async function sendMessage() {
        if (isLoading || inputText === '') {
          return;
        }

        // Set isLoading to true at the start, and set it to
        // false after everything is done.
        setIsLoading(true);

        setInputText('')

        const newChatMessages = [
          ...chatMessages, {
            message: inputText,
            sender: "user",
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
          }
        ]
        setChatMessages([
          ...newChatMessages,
          // This creates a temporary Loading... message.
          // Because we don't save this message in newChatMessages,
          // it will be remove later, when we add the response.
          {
            message: <img src={loadingSpinner} className="loading-spinner" />,
            sender: 'robot',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
          }
        ]);
        const response = await Chatbot.getResponseAsync(inputText);
        setChatMessages([
          ...newChatMessages, {
            message: response,
            sender: "robot",
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
          }
        ])
        setIsLoading(false)
      }

      function handleEventKey(event) {
        if (event.key === 'Enter') {
          sendMessage()
        } else if (event.key === 'Escape') {
          setInputText('');
        }
      }
      return (
        <div className="chat-input-container">
          <input
            onChange={saveInputText}
            placeholder='Send a message to chatbot'
            size='30'
            onKeyDown={handleEventKey}
            value={inputText}
            className='chat-input'
          />
          <button onClick={sendMessage} className='js-button'>
            Send
          </button>
        </div>
      );
    }

import robotProfileImage from '../assets/bot.png'
import userProfileImage from '../assets/user.png'
import dayjs from 'dayjs';
import './ChatMessage.css'

export function ChatMessage({ message, sender,time }) {
      return (
        <div className={
          sender === 'user'
            ? 'chat-message-user'
            : 'chat-message-robot'
        }>
          {sender === 'robot' && (<img src={robotProfileImage} className='chat-message-profile' />)}
          <div className='chat-message-text'>
            {message}
            {/* The "time && (" check is optional. I added it just to be safe. */}
        {time && (
          <div className='chat-message-time'>
            {dayjs(time).format('h:mma')}
          </div>
        )}
          </div>
          {sender === 'user' && (<img src={userProfileImage} className='chat-message-profile' />)}
        </div>
      );
    }
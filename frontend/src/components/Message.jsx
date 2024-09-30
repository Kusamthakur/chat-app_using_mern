import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    // Manage time with useState
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        if (message?.createdAt) {
            const date = new Date(message.createdAt);
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');
            setFormattedTime(`${hours}:${minutes}:${seconds}`);
        }
    }, [message]);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        alt="User Avatar" 
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} 
                    />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">{formattedTime}</time>
            </div>
            <div className={`chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''}`}>
                {message?.message}
            </div>
        </div>
    )
}

export default Message;

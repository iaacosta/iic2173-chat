import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import Message from './Message';
import { colors } from 'lib/styles';

const Board = styled.ul`
  grid-area: message-board;
  background-color: ${colors.whiter};
  border-radius: 5px;
  padding: 1rem;
  list-style: none;
`;

interface Message {
  id: number;
  date: string;
  user: string;
  content: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    const { data }: AxiosResponse<Message[]> = await axios.get('/api/messages');
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Board>
      {messages.map(({ id, user, content }) => (
        <Message key={id} user={user} content={content} />
      ))}
    </Board>
  );
};

export default MessageBoard;

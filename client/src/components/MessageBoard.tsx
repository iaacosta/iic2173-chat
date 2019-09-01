import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import Message from './Message';
import { colors } from 'lib/styles';
import Loader from 'lib/components/Loader';

const Board = styled.div`
  grid-area: message-board;
  background-color: ${colors.whiter};
  border-radius: 5px;
  list-style: none;

  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: minmax(8rem, min-content) 1fr;
`;

const Centeree = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Message {
  id: number;
  date: number;
  user: string;
  content: string;
}

const MessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    const { data }: AxiosResponse<Message[]> = await axios.get('/api/messages');
    setMessages(data);
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Board>
      {loading ? (
        <Centeree>
          <Loader size={10} />
        </Centeree>
      ) : (
        messages.map(({ id, user, content, date }, idx) => (
          <Message
            key={id}
            idx={idx}
            user={user}
            content={content}
            date={date}
          />
        ))
      )}
    </Board>
  );
};

export default MessageBoard;

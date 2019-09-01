import React, { useState } from 'react';
import styled from 'styled-components';

import MessageElement from './MessageElement';
import Loader from 'lib/components/Loader';
import { colors } from 'lib/styles';
import { Message } from 'lib/types';

const Board = styled.div`
  grid-area: message-board;
  background-color: ${colors.whiter};
  border-radius: 5px;
  list-style: none;

  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: minmax(10rem, min-content) 1fr;

  grid-template-areas:
    'user-4 content-4'
    'user-3 content-3'
    'user-2 content-2'
    'user-1 content-1'
    'user-0 content-0';
`;

const Centeree = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  messages: Message[];
  loading: boolean;
}

const MessageBoard: React.FC<Props> = ({ messages, loading }) => {
  const [page, setPage] = useState(1);
  const shownMessages = messages.slice(0 + (page - 1) * 5, 5 + (page - 1) * 5);

  return (
    <>
      <Board>
        {loading ? (
          <Centeree>
            <Loader size={10} />
          </Centeree>
        ) : (
          shownMessages.map(({ id, user, content, date }, idx) => (
            <MessageElement
              key={id}
              idx={idx % 5}
              user={user}
              content={content}
              date={date}
            />
          ))
        )}
      </Board>
    </>
  );
};

export default MessageBoard;

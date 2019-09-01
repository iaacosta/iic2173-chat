import React from 'react';
import styled from 'styled-components';

import MessageElement from './MessageElement';
import { colors } from 'lib/styles';
import { Message } from 'lib/types';
import Loader from 'lib/components/Loader';

const Board = styled.div`
  grid-area: message-board;
  background-color: ${colors.whiter};
  border-radius: 5px;
  list-style: none;

  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: minmax(10rem, min-content) 1fr;
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

const MessageBoard: React.FC<Props> = ({ messages, loading }) => (
  <Board>
    {loading ? (
      <Centeree>
        <Loader size={10} />
      </Centeree>
    ) : (
      messages.map(({ id, user, content, date }, idx) => (
        <MessageElement
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

export default MessageBoard;

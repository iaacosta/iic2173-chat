import React, { useState } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import MessageElement from './MessageElement';
import Loader from 'lib/components/Loader';
import SvgRedo from 'lib/icons/Redo';
import { colors, rgba } from 'lib/styles';
import { Message } from 'lib/types';
import 'lib/styles/pagination.scss';

const Board = styled.div`
  grid-area: message-board;
  background-color: ${colors.whiter};
  border-radius: 5px;
  list-style: none;
  overflow: hidden;

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

const P = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  color: ${rgba(colors.black, 0.4)};
`;

const Footer = styled.div`
  grid-area: pagination;
  display: grid;
  grid-template-columns: 1fr min-content;
  justify-items: center;
  align-items: center;
`;

const IconBox = styled.div`
  cursor: pointer;
  height: 3rem;
  width: 3rem;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled(SvgRedo)`
  height: 2rem;
  width: 2rem;
  fill: ${colors.whiter};
  transition: fill 0.5s ease;
`;

interface Props {
  messages: Message[];
  loading: boolean;
  refreshCallback: () => void;
}

const MessageBoard: React.FC<Props> = ({
  messages,
  loading,
  refreshCallback,
}) => {
  const [page, setPage] = useState(1);
  const shownMessages = messages.slice(0 + (page - 1) * 5, 5 + (page - 1) * 5);

  const LoadingJSX = (
    <Centeree>
      <Loader size={10} />
    </Centeree>
  );

  const MessagesJSX =
    messages.length > 0 ? (
      shownMessages.map(({ id, user, content, date }, idx) => (
        <MessageElement
          key={id}
          idx={idx % 5}
          user={user}
          content={content}
          date={date}
        />
      ))
    ) : (
      <Centeree>
        <P>No hay mensajes. ¡Se el primero en escribir uno!</P>
      </Centeree>
    );

  const PaginateJSX = (
    <>
      <ReactPaginate
        pageCount={messages.length > 0 ? Math.ceil(messages.length / 5) : 1}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        previousLabel="&larr;"
        nextLabel="&rarr;"
        containerClassName="pagination"
        activeLinkClassName="pagination__link pagination__link--selected"
        pageLinkClassName="pagination__link"
        nextLinkClassName="pagination__label"
        previousLinkClassName="pagination__label"
        disabledClassName="pagination__label--disabled"
        breakLinkClassName="pagination__break"
        onPageChange={item => setPage(item.selected + 1)}
      />
      <IconBox onClick={refreshCallback}>
        <Icon />
      </IconBox>
    </>
  );

  return (
    <>
      <Board>{loading ? LoadingJSX : MessagesJSX}</Board>
      <Footer>{loading ? null : PaginateJSX}</Footer>
    </>
  );
};

export default MessageBoard;

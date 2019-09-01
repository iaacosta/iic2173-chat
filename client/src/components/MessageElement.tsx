import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { colors, rgba } from 'lib/styles';

const Item = styled.div<{ idx: number }>`
  line-height: 1.4;
  padding: 1.5rem;
  background-color: ${({ idx }) =>
    idx % 2 === 0 ? 'transparent' : rgba(colors.black, 0.02)};
`;

const User = styled(Item)`
  grid-area: ${({ idx }) => `user-${idx}`};
  color: ${colors.primaryDark};
  font-weight: 600;
  position: relative;
  hyphens: auto;
  font-size: 1.3rem;
  font-family: 'Fira Mono', monospace;
`;

const Content = styled(Item)`
  grid-area: ${({ idx }) => `content-${idx}`};
  display: grid;
  grid-template-rows: 1fr min-content;
  font-size: 1.3rem;
`;

const DateElem = styled.label`
  justify-self: end;
  font-size: 1.2rem;
  color: ${rgba(colors.primaryDark, 0.45)};
  letter-spacing: 1px;
`;

interface Props {
  idx: number;
  content: string;
  date: number;
  user: string;
}

const Message: React.FC<Props> = ({ idx, content, user, date }) => (
  <>
    <User as="p" idx={idx}>
      {user}
    </User>
    <Content idx={idx}>
      <p>{content}</p>
      <DateElem>{dayjs(date).format('HH:mm DD-MM-YYYY')}</DateElem>
    </Content>
  </>
);

export default Message;

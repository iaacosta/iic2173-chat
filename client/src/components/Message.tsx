import React from 'react';
import styled from 'styled-components';

import { colors } from 'lib/styles';
import { hyphenate } from 'lib/helpers';

interface Props {
  content: string;
  user: string;
}

const Li = styled.li`
  padding: 1rem 0;
  display: grid;
  font-size: 1.4rem;
  grid-template-columns: minmax(10rem, min-content) 1fr;
`;

const User = styled.p`
  margin-right: 1rem;
  color: ${colors.primaryDark};
  font-weight: 600;
  position: relative;
  hyphens: auto;
  font-size: 1.2rem;
  font-family: 'Fira Mono', monospace;

  &::after {
    content: ':';
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Content = styled.p`
  line-height: 1.4;
`;

const Message: React.FC<Props> = ({ content, user }) => {
  const displayUser = user.length > 10 ? hyphenate(user, 10) : user;

  return (
    <Li>
      <User>{displayUser}</User>
      <Content>{content}</Content>
    </Li>
  );
};

export default Message;

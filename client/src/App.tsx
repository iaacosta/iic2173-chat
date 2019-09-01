import React from 'react';
import styled from 'styled-components';

import Footer from 'components/Footer';
import { colors, lengths } from 'lib/styles';
import MessageBoard from 'components/MessageBoard';

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    ${colors.primaryDark},
    ${colors.primaryRegular}
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.main`
  height: calc(100vh - ${lengths.footerHeight});
  width: ${lengths.mainWidth};
  padding: 2rem;
  color: ${colors.black};
  background-color: ${colors.white};

  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: min-content 1fr min-content;
  grid-template-areas:
    'header api'
    'message-board api'
    'sender null';
  grid-gap: 1.5rem;
`;

const H1 = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  color: ${colors.secondary};
  font-family: 'Fira Mono', monospace;
  grid-area: header;
`;

const App: React.FC = () => {
  return (
    <Background>
      <Main>
        <H1>Chat app</H1>
        <MessageBoard />
      </Main>
      <Footer />
    </Background>
  );
};

export default App;

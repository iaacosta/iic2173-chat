import React from 'react';
import styled from 'styled-components';

import Footer from 'components/Footer';
import { colors, lengths } from 'lib/styles';

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
`;

const H1 = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  color: ${colors.secondary};
  font-family: 'Fira Mono', monospace;
`;

const App: React.FC = () => {
  return (
    <Background>
      <Main>
        <H1>Chat app</H1>
      </Main>
      <Footer />
    </Background>
  );
};

export default App;

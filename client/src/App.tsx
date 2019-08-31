import React from 'react';
import styled from 'styled-components';
import { colors } from 'lib/styles';

const Body = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
    to right bottom,
    ${colors.primaryDark},
    ${colors.primaryRegular}
  );
`;

const Div = styled.div`
  height: 100vh;
  width: 90%;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${colors.black};
  background-color: ${colors.white};
`;

const H1 = styled.h1`
  font-size: 4rem;
  font-weight: 300;
  color: ${colors.secondary};
  font-family: 'Fira Mono', monospace;
  margin: 2rem;
`;

const P = styled.p`
  font-size: 1.6rem;
`;

const App: React.FC = () => {
  return (
    <Body>
      <Div>
        <H1>Hello React app!</H1>
        <P>At least it is a working template</P>
      </Div>
    </Body>
  );
};

export default App;

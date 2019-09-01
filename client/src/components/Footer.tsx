import React from 'react';
import styled from 'styled-components';

import { lengths, colors, rgba } from 'lib/styles';

const FooterElem = styled.footer`
  width: ${lengths.mainWidth};
  height: ${lengths.footerHeight};
  background-color: ${colors.black};
  color: ${colors.white};
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

interface PProps {
  justify?: string;
}

const P = styled.p<PProps>`
  font-size: 1.4rem;
  color: ${rgba(colors.white, 0.5)};
  flex: 1;
  display: flex;
  justify-content: ${({ justify }) => justify || 'center'};
`;

const A = styled.a`
  cursor: pointer;
  transition: color 0.2s ease;

  &:link,
  &:visited {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:active {
    color: ${rgba(colors.white, 0.8)};
  }
`;

const Icon = styled.i`
  font-size: 1.9rem;
`;

const Footer: React.FC = () => (
  <FooterElem>
    <P justify="flex-start">Ignacio Acosta ~ iaacosta@uc.cl</P>
    <P justify="flex-end">
      <A href="https://github.com/cho19" target="_blank">
        <Icon />
        &nbsp;&nbsp;cho19
      </A>
    </P>
  </FooterElem>
);

export default Footer;

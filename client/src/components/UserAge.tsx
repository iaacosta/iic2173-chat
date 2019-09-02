import React from 'react';

import { APIData } from 'lib/types';
import styled from 'styled-components';
import { colors, rgba } from 'lib/styles';

const Container = styled.div`
  grid-area: api-board;
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  align-items: center;
  justify-items: center;
`;

const P = styled.p`
  justify-self: start;
  font-size: 1.5rem;
`;

const Status = styled.p`
  padding: 1rem;
  text-align: center;
  font-size: 1.5rem;
  grid-row: 1 / -1;
  color: ${rgba(colors.black, 0.5)};
`;

const AgeContainer = styled.div`
  line-height: 1;
`;

const Age = styled.p`
  font-size: 20rem;
  color: ${colors.secondary};
  font-weight: 100;
`;

const Label = styled.p`
  font-size: 1.5rem;
  color: ${rgba(colors.black, 0.4)};
  text-align: center;
  margin-top: -0.5rem;
`;

const A = styled.a`
  transition: color 0.3s ease;

  &:link,
  &:visited {
    color: ${colors.primaryDark};
  }

  &:hover,
  &:active {
    color: ${colors.primaryLight};
  }
`;

interface Props {
  data: APIData | null;
  limitReached: boolean;
}

const UserAge: React.FC<Props> = ({ data, limitReached }) => {
  if (limitReached)
    return (
      <Container>
        <Status>
          Limite alcanzado de llamadas a la API por hoy :( Lo siento.
        </Status>
      </Container>
    );
  else if (!data)
    return (
      <Container>
        <Status>Escribe tu nombre para utilizar la API</Status>
      </Container>
    );
  else if (!data.age)
    return (
      <Container>
        <Status>La API no tiene una estimación de tu edad :(</Status>
      </Container>
    );
  else
    return (
      <Container>
        <P>
          {data.name}, según&nbsp;
          <A href="https://agify.io" target="_blank">
            ageify.io
          </A>
          , deberías tener:
        </P>
        <AgeContainer>
          <Age>{data.age}</Age>
          <Label>años</Label>
        </AgeContainer>
        <P>
          Estadísticas recolectadas de {data.count} persona
          {data.count === 1 ? '' : 's'} con tu nombre.
        </P>
      </Container>
    );
};

export default UserAge;

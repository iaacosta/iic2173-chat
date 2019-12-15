import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios, { AxiosResponse } from 'axios';

import Footer from 'components/Footer';
import MessageBoard from 'components/MessageBoard';
import MessageInput from 'components/MessageInput';
import { colors, lengths } from 'lib/styles';
import { Message, APIResponse, APIData } from 'lib/types';
import UserAge from 'components/UserAge';

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
  grid-template-rows: min-content 1fr 3rem min-content;
  grid-template-areas:
    'app-header api-header'
    'message-board api-board'
    'pagination null'
    'input input';
  grid-gap: 1.5rem;
`;

const Header = styled.h1`
  grid-area: app-header;
  font-size: 4rem;
  font-weight: 300;
  color: ${colors.secondary};
  font-family: 'Fira Mono', monospace;
`;

const APIHeader = styled(Header)`
  grid-area: api-header;
`;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<APIData | null>(null);
  const [apiLimitReached, setApiLimitReached] = useState(false);

  const fetchMessages = async () => {
    try {
      const { data }: AxiosResponse<Message[]> = await axios.get(
        '/messages',
      );
      setMessages(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const fetchUserAge = async (name: string) => {
    if (name === '') return setApiData(null);
    try {
      const { data }: AxiosResponse<APIResponse> = await axios.get(
        `https://api.agify.io/?name=${name}&country_id=CL`,
      );
      setApiData({ ...data, name });
    } catch (err) {
      if (err.response.status === 429) setApiLimitReached(true);
      else console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <Background>
      <Main>
        <Header>Chat app</Header>
        <MessageBoard
          messages={messages}
          loading={loading}
          refreshCallback={fetchMessages}
        />
        <APIHeader>API</APIHeader>
        <UserAge data={apiData} limitReached={apiLimitReached} />
        <MessageInput postCallback={fetchMessages} apiCallback={fetchUserAge} />
      </Main>
      <Footer />
    </Background>
  );
};

export default App;

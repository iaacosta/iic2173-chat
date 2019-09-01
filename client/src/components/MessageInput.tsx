/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { colors, rgba } from 'lib/styles';

const InputArea = styled.div`
  grid-area: sender;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
`;

const Normalize = styled.input`
  padding: 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1.6rem;
  font-weight: inherit;
  background-color: ${colors.whiter};
  border: none;
  outline: none;
  transition: background-color 0.2s ease;

  &::placeholder {
    color: ${rgba(colors.black, 0.3)};
  }
`;

const TextArea = styled(Normalize)`
  resize: none;
  grid-row: 1 / -1;

  &:focus {
    background-color: ${rgba(colors.whiter, 0.7)};
  }
`;

const Input = styled(Normalize)`
  height: 5rem;

  &:focus {
    background-color: ${rgba(colors.whiter, 0.7)};
  }
`;

const Button = styled(Normalize)<{ valid: boolean }>`
  cursor: ${({ valid }) => (valid ? 'pointer' : 'auto')};
  background-color: ${({ valid }) =>
    valid ? colors.secondary : rgba(colors.black, 0.3)};
  color: ${colors.white};
  font-size: 1.6rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ valid }) =>
      valid ? rgba(colors.secondary, 0.8) : rgba(colors.black, 0.3)};
  }
`;

interface Props {
  postCallback: () => void;
}

const MessageInput: React.FC<Props> = ({ postCallback }) => {
  const [content, setContent] = useState('');
  const [contentValid, setContentValid] = useState(false);
  const [user, setUser] = useState('');

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    value === '' ? setContentValid(false) : setContentValid(true);
    setContent(value);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const pkg: { content: string; user?: string } = { content };
    if (user !== '') pkg.user = user;

    try {
      await axios.post('/api/messages', pkg);
      setContent('');
      setContentValid(false);
      postCallback();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleKeydown = ({ keyCode }: KeyboardEvent) =>
      keyCode === 13 ? handleSubmit({ preventDefault() {} } as any) : null;
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [handleSubmit]);

  return (
    <InputArea>
      <TextArea
        as="textarea"
        placeholder="Escribe tu mensaje aquí"
        value={content}
        onChange={handleContentChange}
      />
      <Input
        type="text"
        placeholder="Nombre (opcional)"
        value={user}
        onChange={e => setUser(e.currentTarget.value)}
      />
      <Button
        as="button"
        valid={contentValid}
        onClick={e => (contentValid ? handleSubmit(e) : null)}
      >
        Enviar
      </Button>
    </InputArea>
  );
};

export default MessageInput;

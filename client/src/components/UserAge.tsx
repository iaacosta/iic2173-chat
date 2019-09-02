import React from 'react';
import { APIData } from 'lib/types';

interface Props {
  data: APIData | null;
  limitReached: boolean;
}

const UserAge: React.FC<Props> = ({ data, limitReached }) => {
  if (limitReached) return <p>Limit has been reached for today in this API</p>;
  if (!data) return <p>Write your name for using the API</p>;
  return (
    <div>
      According to ageify.io, you should have {data.age} years. Statistics for
      {data.count} people with name {data.name}
    </div>
  );
};

export default UserAge;

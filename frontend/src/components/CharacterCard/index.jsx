import React from 'react';
import styled from 'styled-components';

const CharacterCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
`;

const CardCharacter = ({ character }) => (
  <CharacterCard>
    <h3>{character.name}</h3>
    <p>Type: {character.type}</p>
    <p>Passif: {character.passif}</p>
    {character.imgUrl && (
      <img
        src={`http://localhost:3000/api/image/${character.imgUrl}`}
        alt={character.name}
        style={{ width: '100%', height: 'auto' }}
      />
    )}
  </CharacterCard>
);

export default CardCharacter;

import React from 'react';
import styled from 'styled-components'
import CardCharacter from '../../components/CharacterCard';
import { useFetch } from '../../utils/hooks/userFetch';
import { Spinner, SimpleGrid } from '@chakra-ui/react';

const CharactersContainer = styled.div`
max-width: 1100px;

`;



function Home() {
  const { data, isLoading, error } = useFetch('http://localhost:3000/api/character');

  const characters = data;

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <CharactersContainer>
          <SimpleGrid max-width={1200} padding={5} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {characters.map((character, index) => (
              <CardCharacter
                key={`${character.name}-${index}`}
                character={character}
              />
            ))}
          </SimpleGrid>
        </CharactersContainer>
      )}
    </div>
  );
}

export default Home;

import React from 'react';
import CardCharacter from '../../components/CharacterCard';
import { useFetch } from '../../utils/hooks/userFetch';
import { Spinner } from '@chakra-ui/react';

function Home() {
  const { data: characters, isLoading, error } = useFetch('http://localhost:3000/api/character');

  if (isLoading) {
    return (
      <div>
        <h1>Bienvenue sur la page d'accueil</h1>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
    );
  }

  if (error) {
    return <div>Une erreur s'est produite lors du chargement des données.</div>;
  }

  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      {characters.map(character => (
        <CardCharacter key={character._id} character={character} />
      ))}
    </div>
  );
}

export default Home;

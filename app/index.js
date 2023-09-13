//importando o que vou usar
import "expo-router/entry";
import { StyleSheet, Text, View, Alert, Pressable, TextInput, Image } from 'react-native';
import React, { useState } from 'react'
import Axios from 'axios'


export default function App() {
  //const para o nome do Pokémon
  const [nome, setPokeNome] = useState("")

  //converte o nome pra lowecase (para não dar erro na API)
  const pokeNome = nome.toLowerCase()

  //const para verificar se o Pokémon foi escolhido
  const [pokeChosen, setPokeChosen] = useState(false)

  //const para o segundo tipo do Pokémon
  const [type2, setType2] = useState(null)

  //const para as informações do Pokémon
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    id: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  //função para buscar as informações do Pokémon com o Axios
  async function procuraPoke(){
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNome}`)

      .then((response) => {

        if (response.status === 404) {
          alert("Erro ao buscar dados");
          window.location.href = "/";
          setPokeChosen(false);

        } 
        
        else {

          // define o primeiro tipo
          const primaryType = response.data.types[0].type.name;

          // verifica se o Pokémon tem um segundo tipo
          const secondaryType = response.data.types.length > 1 ? response.data.types[1].type.name : null;
          setType2(secondaryType);

          // pega todos os dados do pokemon
          setPokemon({
            name: pokeNome,
            img: response.data.sprites.front_default,
            id: response.data.id,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: primaryType,
          });

          // define a verificação do pokemon como true, confirma essa verificação
          setPokeChosen(true);
        }
      })
      .catch((error) => {
        console.error("Erro na solicitação", error);
        alert("Nome Pokémon inválido!");
      });

    async function capitalize() {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titulo}>
        <Text style={styles.tituloText}>Pokémon DataBase</Text>
        <TextInput
            style={styles.input}
            onChangeText={(text) => setPokeNome(text)}
            value={pokeNome}
        />
        <Pressable onPress={procuraPoke} style={styles.button}>
            <Text style={styles.buttonText}>Procurar Pokémon</Text>
        </Pressable>
      </View>
      <View style={styles.display}>
        { !pokeChosen ? (
          <Text style={styles.escolha}>Escolha um Pokémon!</Text>
        ) : (
          <>
            <Text style={styles.pokeNome}>{pokemon.name}</Text>
            <Image source={{ uri: pokemon.img }} style={styles.pokemonImage} />
            <Text>
              <Text style={styles.pokemonType}>Tipo: </Text>
                <View style={styles.types}>
                    <Text style={[styles[pokemon.type], styles.allTypes]}>{pokemon.type}</Text>
                </View>
              {type2 && (
                <View style={styles.types}>
                    <Text style={[styles[type2], styles.allTypes]}>
                    {type2}
                    </Text>
                </View>
              )}
            </Text>
            <Text style={styles.pokemonNumber}>Nº Pokedex: {pokemon.id}</Text>
            <Text style={styles.pokemonStats}>Vida: {pokemon.hp}</Text>
            <Text style={styles.pokemonStats}>Ataque: {pokemon.attack}</Text>
            <Text style={styles.pokemonStats}>Defesa: {pokemon.defense}</Text>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textTransform: 'capitalize',
    overflow: 'scroll',
    height: 'auto',
  },

  titulo: {
    backgroundColor: 'rgba(83, 83, 83, 0.6)',
    width: '100%',
    height: 200,
    alignItems: 'center',
    paddingTop: 40,
  },

  tituloText: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  input: {
    width: 200,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(71, 71, 71, 0.6)',
    fontSize: 24,
    paddingLeft: 17,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#c2c2c2",
  },

  button: {
    width: 170,
    height: 40,
    backgroundColor: 'rgba(0, 192, 64, 0.6)',
    borderRadius: 10,
  },

  buttonText: {
    textAlign: "center",
    paddingTop: 10,
    fontSize: 18,
  },

  display: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e9e9e9',
    width: '100%',
    paddingBottom: 40,
    paddingTop: 40,
    height: '100%',
  },

  escolha:{
    fontSize: 40,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
  },

  pokeNome: {
    textTransform: 'capitalize',
    fontSize: 40,
    fontWeight: 'bold',
  },

  pokemonImage: {
    backgroundColor: '#f3f3f3',
    borderRadius: 1000,
    marginBottom: 40,
    marginTop: 10,
    width: 260,
    height: 260,
  },

  pokemonType: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },

  pokemonNumber: {
    padding: 5,
    fontSize: 20,
    fontWeight: "bold",
  },

  pokemonStats: {
    paddingTop: 8,
    fontSize: 18,
    fontWeight: "500",
  },

  types: {
    textTransform: 'capitalize',
    borderRadius: 20,
    margin: 8,
  },

  allTypes: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 8,
    fontSize: 18,
  },

  /* cores de fundo para cada tipo */

 fire:        { backgroundColor: '#F6AD7C'},
 water:       { backgroundColor: '#9EB9F5'},
 normal:      { backgroundColor: '#C8C6A7'},
 grass:       { backgroundColor: '#A8DD90'},
 fighting:    { backgroundColor: '#D67B76'},
 flying:      { backgroundColor: '#C8B9F6'},
 dark:        { backgroundColor: '#A49389'},
 fairy:       { backgroundColor: '#F6BECC'},
 dragon:      { backgroundColor: '#A27FF9'},
 poison:      { backgroundColor: '#C384C2'},
 psychic:     { backgroundColor: '#FA94B3'},
 ghost:       { backgroundColor: '#A593BD'},
 ice:         { backgroundColor: '#BCE7E6'},
 bug:         { backgroundColor: '#C7D06F'},
 steel:       { backgroundColor: '#D2D2DF'},
 rock:        { backgroundColor: '#D2C27D'},
 ground:      { backgroundColor: '#EBD89F'},
 electric:    { backgroundColor: '#F9E17B'}
})

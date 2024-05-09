import React, { useState } from "react";
import { useKeepAwake } from "expo-keep-awake";
import { Button, Container, Paragraph, CoordinatesText, Input, ParagraphSpan, ParagraphTitle } from "./styles";
import { getCurrentLocationAsync } from '../../services/LocationService';

function Home() {
  useKeepAwake();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coordinates, setCoordinates] = useState(null);

  const url = `https://logistica-rs.com.br/api-tracking-rs/received-webhook-location?lat={${coordinates?.latitude}}&long={${coordinates?.longitude}}&u={${phoneNumber}}$name={${name}}`


  const handleLocationButtonClick = async () => {
    try {
      const coords = await getCurrentLocationAsync();
      console.log('Localização atual:', coords);
      setCoordinates(coords);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
  };

  return (
    <Container>
      <ParagraphTitle>LOGÍSTICA RS</ParagraphTitle>
      <ParagraphSpan>Informe seu Nome Completo</ParagraphSpan>
      <Input
        placeholder="Digite o seu Nome"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <ParagraphSpan>Informe seu telefone</ParagraphSpan>
      <Input
        placeholder="Digite o seu Telefone"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />


      <Button onPress={handleLocationButtonClick}>
        <Paragraph>Envie sua localização</Paragraph>
      </Button>
      {coordinates && (
        <Container>
          <Paragraph>Sua localização foi enviada</Paragraph>
          <Paragraph>Nome: {name}</Paragraph>
          <Paragraph>Número de telefone: {phoneNumber}</Paragraph>
          <Paragraph>Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}</Paragraph>
        </Container>
      )}
    </Container>
  )
}

export default Home;

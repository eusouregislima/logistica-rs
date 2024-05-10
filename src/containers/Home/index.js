import React, { useState, useEffect } from "react";
import { useKeepAwake } from "expo-keep-awake";
import { Button, Container, Paragraph, CoordinatesText, Input, ParagraphSpan, ParagraphTitle } from "./styles";
import { getCurrentLocationAsync } from '../../services/LocationService';
import axios from 'axios'

function Home() {
  useKeepAwake();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const url = `https://logistica-rs.com.br/api-tracking-rs/received-webhook-location?lat=${coordinates?.latitude}&longitude=${coordinates?.longitude}&u=${phoneNumber}`;
  console.log(url)

  const getLocation = async () => {
    try {
      const coords = await getCurrentLocationAsync();
      console.log('Localização atual:', coords);
      setCoordinates(coords);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
    }
    finally {
      sendLocation()
    }
  };

  const sendLocation = async () => {
    try {
      await axios.get(url);
    }
    catch (error) {
      console.error(error)
    }

  }

  const startInterval = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        getLocation();
      }, 60000);
      setIntervalId(id);
    }
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);

  };

  useEffect(() => {
    if (phoneNumber) {
      startInterval();
    } else {
      stopInterval();
    }
  }, [phoneNumber]);


  const handleLocationButtonClick = async () => {
    if (phoneNumber !== "") {
      getLocation();
    }
    else {
      return
    }
  };

  return (
    <Container>
      <ParagraphTitle>LOGÍSTICA RS</ParagraphTitle>

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
          <Paragraph>Sua localização está sendo enviada</Paragraph>
        </Container>
      )}

    </Container>
  )
}

export default Home;

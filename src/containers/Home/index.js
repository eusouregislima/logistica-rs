import React, { useState } from 'react'
import { useKeepAwake } from 'expo-keep-awake'
import {
  Button,
  Container,
  Paragraph,
  CoordinatesText,
  Input,
  ParagraphSpan,
  ParagraphTitle,
} from './styles'
import { getCurrentLocationAsync } from '../../services/LocationService'
import api from '../../services/api'

function Home() {
  useKeepAwake()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [intervalId, setIntervalId] = useState(null)
  const [isLocation, setIsLocation] = useState(false);

  const getLocation = async () => {
    try {
      const coordData = await getCurrentLocationAsync()
      console.log('Localização atual:', coordData)
      sendLocation(coordData)
    } catch (error) {
      console.error('Erro ao obter localização:', error)
    }
  }

  const startInterval = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        getLocation()
      }, 60000)
      setIntervalId(id)
    }
  }


  const sendLocation = async (coordinates) => {
    try {
      const data = await api.get(
        `api-tracking-rs/received-webhook-location?lat=37.4220936&longitude=-122.083922&u=11968290266`,
      )

      console.log(data.status)
      startInterval()
      setIsLocation(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLocationButtonClick = async () => {
    if (phoneNumber !== '') {
      getLocation()
    } else {
      return
    }
  }

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
      {isLocation && (
        <Container>
          <Paragraph>Sua localização está sendo enviada</Paragraph>
        </Container>
      )}
    </Container>
  )
}

export default Home

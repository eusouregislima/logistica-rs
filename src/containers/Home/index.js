import React, { useState } from 'react'
import { useKeepAwake } from 'expo-keep-awake'
import {
  Button,
  Container,
  Paragraph,
  Select,
  Input,
  ParagraphSpan,
  ParagraphTitle,
  ParagraphButton,
} from './styles'
import { getCurrentLocationAsync } from '../../services/LocationService'
import api from '../../services/api'

function Home() {
  useKeepAwake()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [type, setType] = useState('')
  const [intervalId, setIntervalId] = useState(null)
  const [isLocation, setIsLocation] = useState(false)
  const [inputsDisabled, setInputsDisabled] = useState(false)

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
        `api-tracking-rs/received-webhook-location?lat=${coordinates.latitude}&longitude=${coordinates.longitude}&u=${phoneNumber}&tipo=${type}`,
      )
      startInterval()
      setIsLocation(true)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLocationButtonClick = async () => {
    if (phoneNumber !== '') {
      getLocation()
      setInputsDisabled(true)
    } else {
      return
    }
  }

  const placeholder = {
    label: 'Escolha o tipo de transporte...',
    value: null,
    color: '#ccc',
  }

  return (
    <Container>
      <ParagraphTitle>LOGÍSTICA RS</ParagraphTitle>

      <ParagraphSpan>Informe seu telefone</ParagraphSpan>
      <Input
        placeholder="Digite o seu Telefone"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        editable={!inputsDisabled}
      />
      <Select
        useNativeAndroidPickerStyle={false}
        placeholder={placeholder}
        onValueChange={(value) => setType(value)}
        items={[
          { label: 'Rodo-Trem', value: 'rodoTrem' },
          { label: 'Bi-Trem', value: 'biTrem' },
          { label: 'Carreta', value: 'carreta' },
          { label: 'Furgão/Baú', value: 'furgaoBau' },
        ]}
        disabled={inputsDisabled}
      />

      <Button onPress={handleLocationButtonClick}>
        <ParagraphButton> Envie sua localização </ParagraphButton>
      </Button>
      {isLocation && <Paragraph>Sua localização está sendo enviada</Paragraph>}
    </Container>
  )
}

export default Home

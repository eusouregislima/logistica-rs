import React, { useEffect, useState } from 'react'
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
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

BackgroundFetch.Result = {
  NewData: 'newData',
  NoData: 'noData',
  Failed: 'failed',
};

function Home() {
  useKeepAwake()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [type, setType] = useState('')
  const [intervalId, setIntervalId] = useState(null)
  const [isLocation, setIsLocation] = useState(false)
  const [inputsDisabled, setInputsDisabled] = useState(false)

  useEffect(() => {
    registerBackgroundFetch();
  }, []);

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

  const registerBackgroundFetch = async () => {
    try {
      TaskManager.defineTask('sendLocationTask', async () => {
        try {
          const coordData = await getCurrentLocationAsync();
          console.log('Localização atual:', coordData);
          sendLocation(coordData);
          return BackgroundFetch.Result.NewData;
        } catch (error) {
          console.error('Erro ao executar tarefa em segundo plano:', error);
          return BackgroundFetch.Result.Failed;
        }
      });

      await BackgroundFetch.registerTaskAsync('sendLocationTask', {
        minimumInterval: 60, // Intervalo mínimo em segundos
        stopOnTerminate: false, // Continua em segundo plano mesmo quando o aplicativo é fechado
        startOnBoot: true, // Inicia automaticamente após a inicialização do dispositivo
      });

      BackgroundFetch.setMinimumIntervalAsync(60); // Garante que a tarefa seja executada a cada 60 segundos
    } catch (error) {
      console.error('Erro ao registrar tarefa em segundo plano:', error);
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

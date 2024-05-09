import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components";

export const Container = styled(SafeAreaView)`
  background-color: #000;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const Paragraph = styled(Text)`
width: 300px;
color: #fff;
text-align: center;
`

export const ParagraphTitle = styled(Text)`
width: 300px;
color: #fff;
text-align: center;
font-size: 30px;
margin-bottom: 15px
`

export const ParagraphSpan = styled(Text)`
width: 300px;
color: #fff;
text-align: left;
`

export const Button = styled(TouchableOpacity)`
background-color: #000;
border: 1px solid #fff;
padding: 10px;
width: 300px;
margin-top: 15px;
`
export const ButtonStop = styled(TouchableOpacity)`
background-color: #000;
border: 1px solid #fff;
padding: 10px;
width: 300px;
margin-top: 65px;
`

export const CoordinatesText = styled(Text)`
margin-top: 15px;
width: 300px;
color: #fff;
text-align: center;
`

export const Input = styled(TextInput)`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 5px;
`
import { SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

import styled from "styled-components";

export const Container = styled(SafeAreaView)`
  background-color: #3c3c3c;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

`;

export const Paragraph = styled(Text)`
color: #fff;
text-align: center;
margin-top: 50px;
`

export const ParagraphButton = styled(Text)`
color: #fff;
text-align: center;
`

export const ParagraphTitle = styled(Text)`
color: #fff;
text-align: center;
font-size: 30px;
margin-bottom: 15px;
`

export const ParagraphSpan = styled(Text)`
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

export const CoordinatesText = styled(Text)`
margin-top: 15px;
width: 300px;
color: #fff;
text-align: center;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#fff"
})`
  width: 80%;
  height: 40px;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 5px;
`;

 export const Select = styled(RNPickerSelect)`
   width: 80%;
   border: 1px solid #ccc;
   margin: 10px 0;
 `
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [ratesobj, setRatesobj] = useState({});
  const [currency, setCurrency] = useState('');
  const [euroworth, setEuroworth] = useState(0);
  
  useEffect (() => {
    fetch('http://api.exchangeratesapi.io/v1/latest?access_key=f939754ac26ebd9a5eeb6432e83e745c')
    .then(response => response.json())
      .then(data => setRatesobj(data.rates))
      .catch(err => {
        Alert.alert("Oops..", err);
      });
  }, []);

  const convert = () => {
    const rate = ratesobj[currency];
    setEuroworth((amount / rate).toFixed(5))
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={{ fontSize: 22 }}>{euroworth} €</Text>
      <View style={styles.input}>
        <TextInput
          style={{fontSize: 20, width: 200, marginTop: 40}} placeholder='Enter amount'
          onChangeText={(amount) => setAmount(amount)}
          keyboardType="numeric"
        />
        <Picker style={{height:30, width:100}}
          selectedValue={currency}
          onValueChange={(value) => setCurrency(value)}>
          {
            Object.keys(ratesobj).map(item => 
            <Picker.Item key={item} label={item} value={item} />)
          }
        </Picker>
      </View>
      <Button
        title="CONVERT"
        onPress={convert}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flexDirection: 'row',
  },
});

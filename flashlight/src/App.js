import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

//import imgLight from './assets/icons/eco-light.png';
//import imgDark from './assets/icons/eco-light-off.png';

const App = () => {
  //const toggle = false;
  //const toggle = true;
  //const [value, setValue] = useState(false);
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    /**
     * Usar o toque para ligar o flash
     */
    Torch.switchState(toggle);
    console.log('Lanterna: ' + toggle);
    //Alert.alert('Status do flashlight: ' + toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Usar o movimento para ligar o flash
     */
    const subscription = RNShake.addListener(() => {
      handleChangeToggle();
    });
    console.log('Movimentar: ' + toggle);
    return () => subscription.remove();
  }, [toggle]);

  return (
    <View style={toggle ? style.containerLightOFF : style.containerLightON}>
      <TouchableOpacity
        onPress={() => {
          handleChangeToggle(toggle);
          console.log('Clicou: staus = ' + toggle);
        }}>
        <Image
          style={toggle ? style.lightingOFF : style.lightingON}
          source={
            toggle
              ? require('./assets/icons/eco-light-off.png')
              : require('./assets/icons/eco-light.png')
          }
        />
        <Image
          style={style.dio}
          source={
            toggle
              ? require('./assets/icons/dio_black.png')
              : require('./assets/icons/dio_white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  containerLightON: {
    flex: 1,
    backgroundColor: 'white',
    alignItem: 'center',
    justifyContent: 'center',
  },
  containerLightOFF: {
    flex: 1,
    backgroundColor: 'black',
    alignItem: 'center',
    justifyContent: 'center',
  },
  lightingON: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  lightingOFF: {
    height: 150,
    width: 150,
    tintColor: 'white',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  dio: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

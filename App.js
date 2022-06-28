import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';


const App = () => {
  const [alternar, setAlternar] = useState(false);

  const callbackAlternar = () => setAlternar(oldAlternar => !oldAlternar);

  useEffect(() => {
    Torch.switchState(alternar);
  }, [alternar]);

  useEffect(() => {

    const subscription = RNShake.addListener(() => {
      setAlternar(oldAlternar => !oldAlternar);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={alternar ? style.containerLight : style.containerBlack}>
      <TouchableOpacity onPress={callbackAlternar}>

        <Image style={alternar ? style.ligado : style.desligado}
          source={alternar ?
            require('./android/assets/icons/eco-light.png')
            : require('./android/assets/icons/eco-light-off.png')} />

      </TouchableOpacity>
    </View>
  );
}

export default App;

const style = StyleSheet.create({
  containerLight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerBlack:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  ligado:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  desligado:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  }
});
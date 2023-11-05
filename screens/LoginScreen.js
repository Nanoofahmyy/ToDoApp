import { KeyboardAvoidingView, StyleSheet, Text, View  , TextInput, TouchableOpacity, Image} from 'react-native'
import React  , { useState }from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3000';
const LoginScreen = () => {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/user/login`, {
            Email,
            Password,
          });
          const token = response.data.token;
          navigation.navigate('Home', { userToken: token });
        } catch (error) {
          console.error('Login failed', error);
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
        } else {
            setErrorMessage('An error occurred while logging in.');
        }
        }
      };

  return (
    <KeyboardAvoidingView
    style = {styles.container}
    behavior = "padding">
    

      <View style={styles.inputContainer}>

      <TextInput
                        placeholder="Email"
                        value={Email}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
       />
       <TextInput
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    style={styles.input}
                    secureTextEntry
                    value={Password}
                    onChangeText={(text) => setPassword(text)}
      />
      
      </View>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <View  style={styles.buttonContainer}>
        <TouchableOpacity
        
        onPress={handleLogin}
        style={styles.button}
        >
        <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => navigation.push('SignUp')}
        style={[styles.button , styles.buttonOutLine]}
        >
        
        <Text style={[styles.buttonOutLineText] }>Register</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>Don't have an account ? </Text>
      
      
      </View>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#EEEEEE'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '90%',
        borderRadius: 100,
      },
    inputContainer:{
        width:'80%'

    },
    input:{
        backgroundColor:'white' ,
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,

    },
    button:{
        backgroundColor:'#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignContent:"center",
        
    },
    buttonContainer:{
        width:'60%',
        justifyContent:"center",
        alignItems:"center",
        marginTop:40

    },
    buttonOutLineText:{
        textAlign:"center",
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
    },
    buttonOutLine:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'#0782F9',
        borderWidth:2,


    },
    buttonText:{
        color:'white',
        fontWeight:'700',
         textAlign:"center",
        fontSize:16
    },
    Text:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16
    }




})
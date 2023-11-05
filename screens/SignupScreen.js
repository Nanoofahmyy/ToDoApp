import { KeyboardAvoidingView, StyleSheet, Text, View  , TextInput, TouchableOpacity, Image} from 'react-native'
import React , { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const API_BASE_URL = 'http://localhost:3000';
const SignupScreen = () => {
    const navigation = useNavigation();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [UserName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
          const response = await axios.post(`${API_BASE_URL}/user/register`, {
            Email,
            Password,
            UserName
          });
          const token = response.data.token;
          navigation.navigate('Login');
        } catch (error) {
          console.error('Signup failed', error);
          if (error.response && error.response.data && error.response.data.error) {
            setErrorMessage(error.response.data.error);
        } else {
            setErrorMessage('An error occurred while register ..');
        }
          // Handle registration error
        }
      };

  return (
    <KeyboardAvoidingView
    style = {styles.container}
    behavior = "padding">
    

      <View style={styles.inputContainer}>
      <TextInput
                    placeholder="UserName"
                    value={UserName}
                    style={styles.input}
                    placeholderTextColor={'gray'}
                    onChangeText={(text) => setUserName(text)}
                />

      <TextInput
                        placeholder="Email"
                        value={Email}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}

       />
       <TextInput
                    placeholder="Password"
                    value={Password}
                    placeholderTextColor={'gray'}
                    style={styles.input}
                    secureTextEntry
                    onChangeText={(text) => setPassword(text)}
      />
      
      </View>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <View  style={styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button ]}
        >
        <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      
        <TouchableOpacity
        onPress={() => navigation.push('Login')}
        style={[styles.button , styles.buttonOutLine]}
        >
        <Text style={styles.buttonOutLineText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.Text}>Already have an account ! </Text>
      

        
      
      </View>

    </KeyboardAvoidingView>
  )
}

export default SignupScreen

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

        color:'#0782F9',
        fontWeight:'700',
        fontSize:16,
        textAlign:"center",
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
        fontSize:16,
        textAlign:"center",
    },
    Text:{
        color:'#0782F9',
        fontWeight:'700',
        fontSize:16
    }




})
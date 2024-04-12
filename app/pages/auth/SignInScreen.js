import React, {useState} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useDispatch } from 'react-redux';
import { COLORS } from '../../constants';


const SignInScreen = () => {

const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });




    // const textInputChange = (val) => {
    //     if( val.trim().length >= 4 ) {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: true,
    //             isValidUser: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             username: val,
    //             check_textInputChange: false,
    //             isValidUser: false
    //         });
    //     }
    // }

    // const handlePasswordChange = (val) => {
    //     if( val.trim().length >= 5 ) {
    //         setData({
    //             ...data,
    //             password: val,
    //             isValidPassword: true
    //         });
    //     } else {
    //         setData({
    //             ...data,
    //             password: val,
    //             isValidPassword: false
    //         });
    //     }
    // }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    // const loginHandle = (userName, password) => {
    //     const foundUser = Users.filter( item => {
    //         return userName == item.username && password == item.password;
    //     } );

    //     if ( data.username.length == 0 || data.password.length == 0 ) {
    //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     if ( foundUser.length == 0 ) {
    //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }
    // }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#42C6A5' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Bien<Text style={{color: COLORS.primary}}>venue</Text>! </Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: COLORS.backgroundColor
            }]}
        >
            <Text style={[styles.text_footer, {
                color: COLORS.text
            }]}>Prenom / Pseudo </Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={COLORS.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your username"
                    placeholderTextColor="#666666"
                   value={username}
                    style={[styles.textInput, {
                        color: COLORS.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => setUsername(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le nom ou Pseudo dous avoir au moins 4 chiffres.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: COLORS.text,
                marginTop: 35
            }]}>Mot de passe</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={COLORS.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    value={password}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: COLORS.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => setPassword(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Le mot de passe passe doit contenir au moins 8 carrecteres.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#42C6A5', marginTop:15}}>Mot de passe oublié?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    // onPress={() => {loginHandle( data.username, data.password )  }}
                    onPress={dispatch(loginAction(username, password))}

                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Se connecter</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    //onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#42C6A5',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#42C6A5'
                    }]}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#42C6A5'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

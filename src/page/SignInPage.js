import React, {Component} from 'react';
import {
    SafeAreaView,
    Text,
    StatusBar,
    Button,
    TextInput,
    View,
} from 'react-native';
import {signIn} from '../store/actions/SessionActions';
import STOREKEYS from '../store/STOREKEYS';
import WithStore from '../components/WithStore';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            twoFactorAuthCode: '',
        };
    }

    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <SafeAreaView style={{padding: 20}}>
                    <View>
                        <Text>Login:</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'black', borderWidth: 2}}
                            value={this.state.login}
                            onChangeText={text => this.setState({login: text})}
                        />
                    </View>
                    <View>
                        <Text>Password:</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'black', borderWidth: 2}}
                            secureTextEntry
                            value={this.state.password}
                            onChangeText={text => this.setState({password: text})}
                        />
                    </View>
                    <View>
                        <Text>Two Factor Code:</Text>
                        <TextInput
                            style={{height: 40, borderColor: 'black', borderWidth: 2}}
                            value={this.state.twoFactorAuthCode}
                            placeholder="Required when 2FA is enabled"
                            onChangeText={text => this.setState({twoFactorAuthCode: text})}
                        />
                    </View>
                    <View>
                        <Button
                            title="Log In"
                            onPress={() => signIn(this.state.login, this.state.password,
                                this.state.twoFactorAuthCode, true)}
                        />
                        {this.state.error && (
                            <Text style={{color: 'red'}}>
                                {this.state.error}
                            </Text>
                        )}
                    </View>
                </SafeAreaView>
            </>
        );
    }
}

export default WithStore({
    // Bind this.state.error to the error in the session object
    error: {key: STOREKEYS.SESSION, path: 'error', defaultValue: null},
})(App);
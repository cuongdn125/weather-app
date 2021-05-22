import React, { useState } from 'react';
import {View, StyleSheet, TextInput} from 'react-native';


export default function SearchInput(props) {

    const [text, setText] = useState('');
    function handleChangeText(text) {
        setText(text);
    }
    function handleSubmitEditing() {
        const {onSubmit} = props;
        const textInput = text; 
        if(!textInput) return;
        onSubmit(textInput);
        setText('');
    }
    return(
        <View style={styles.container}>
            <TextInput 
                value={text}
                autoCorrect={false}
                placeholder={props.placeholder}
                placeholderTextColor="white"
                style={styles.textInput}
                clearButtonMode="always"
                onChangeText={handleChangeText}
                onSubmitEditing={handleSubmitEditing}
            />
        </View>
    );
    
}
const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        paddingHorizontal: 10,
        borderRadius: 5,
        width: 300,
    }, 
    textInput: {
        flex: 1,
        color: 'white',
    },
});
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../theme/colors'

const TextDescription: React.FC= ({description}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:5
    },
    description:{
        fontSize:14,
        textAlign:"center",
        color:Colors.BLACK
    }
})

export default TextDescription
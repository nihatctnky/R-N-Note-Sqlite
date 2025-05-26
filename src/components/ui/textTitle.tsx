import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../theme/colors'

const TextTitle: React.FC = ({title}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding:5
    },
    title:{
        fontSize:24,
        fontWeight:"700",
        textAlign:"center",
        color:Colors.BLACK
    }
})

export default TextTitle
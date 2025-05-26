import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { RouteType } from '../routes/RouteType'
import { Colors } from '../../theme/colors'

type Props = RouteType<'textButton'>

const TextButton: React.FC<Props> = (props) => {
    const {title} =props
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical:10,
        marginVertical:10
    },
      title: {
        color: Colors.SECOND,
        fontSize: 16,
        fontWeight: '600',
      },
})

export default TextButton
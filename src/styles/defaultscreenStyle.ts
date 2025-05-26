import { StyleSheet } from "react-native";
import { Colors } from "../theme/colors";


const defaultScreenStyle = StyleSheet.create({
    safeContainer:{
        flex:1,
        backgroundColor: Colors.FIRST,
    },
    constainer:{
        flex:1,
        paddingHorizontal:10,
    
    }
})

export {defaultScreenStyle}
import { showMessage } from "react-native-flash-message";
import StaticColor from "../utils/Colors";
import { fontFamily } from "./Text";

// const ToastMessage = ({ message, type, color }) => {
//     return 
// }

const ToastMessage = {
    show({ message, type, color, backgroundColor }) {
        return showMessage({
            message,
            type: type || 'success',
            titleStyle: {
                fontSize: 12,
                fontFamily: fontFamily.regular,
                color: color || 'white',
            },
            backgroundColor: backgroundColor
        })
    }
}

export default ToastMessage;
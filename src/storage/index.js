import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocalStorage = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        return await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        // save error
        return e;
    }
};

export const getDataFromLocalStorge = async key => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        // read error
        return e;
    }
};

export const removeDataFromLocalStorage = async (keys = []) => {
    const data = [...keys];
    try {
        return await AsyncStorage.multiRemove(data);
    } catch (e) {
        // remove error
        return e;
    }
};

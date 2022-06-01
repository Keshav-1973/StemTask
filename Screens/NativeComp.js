//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, NativeModules, Image, TouchableOpacity, TouchableWithoutFeedback, PermissionsAndroid, Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Snackbar from 'react-native-snackbar';
import { useNetInfo } from "@react-native-community/netinfo";

const { ImagePickerModule } = NativeModules;




const NativeComp = () => {
    const [data, setData] = useState({ img: undefined, permission: false })
    const netInfo = useNetInfo();


    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setData(prev => ({ ...prev, permission: true }))
            }
        } catch (err) {
            console.log(err);
        }
    };


    const handleOnPressDownload = () => {
        if (!netInfo.isConnected) {
            Snackbar.show({
                text: 'No Internet Connection',
                duration: Snackbar.LENGTH_LONG
            })
        }


        if (data.permission) {
            ImagePickerModule.onDownload()
        }
        else {
            Alert.alert(
                "Alert",
                "Storage Permission has been denied. Go to Settings and allow permissions",
                [
                    {
                        text: "Cancel",
                    },
                    {
                        text: "OK",
                    },
                ],
                { cancelable: false }
            );
        }


    };
    const handleOnPressChoose = async () => {
        try {
            const uri = await ImagePickerModule.onPickImage();
            setData(prev => ({ ...prev, img: uri }))

        } catch (e) {
            console.error(e);
        }
    };
    const handleOnPressUpload = () => {

        if (!netInfo.isConnected) {
            Snackbar.show({
                text: 'No Internet Connection',
                duration: Snackbar.LENGTH_LONG
            })
        } else {
            ImagePickerModule.onUpload(data.img)
        }

    };

    useEffect(() => {
        requestStoragePermission();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#04734c", width: "100%", height: 40, alignSelf: "flex-start", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Download/Upload Manager</Text>
            </View>

            <View style={{ marginTop: 100 }}>
                {data.img == undefined ?
                    <TouchableWithoutFeedback onPress={() => handleOnPressChoose()} >
                        <Image style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../images/cloud-2044823_1280.png')} />
                    </TouchableWithoutFeedback>

                    :
                    <View style={{ height: 200, width: 200, alignSelf: "center" }}>
                        <TouchableWithoutFeedback onPress={() => { setData("") }}>
                            <Image source={require('../images/new.png')} style={{ width: 30, height: 30, alignSelf: "flex-end", position: "absolute", zIndex: 2, top: -3 }} />
                        </TouchableWithoutFeedback>

                        <Image
                            style={{ width: '100%', height: "100%", alignSelf: "center", resizeMode: "stretch" }}
                            source={{
                                uri:
                                    data.img
                            }}
                        />
                    </View>
                }
            </View>

            <View style={{ width: "100%", alignItems: "center" }}>
                {data.img == undefined ? <TouchableOpacity
                    onPress={() => handleOnPressChoose()}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Choose a File to Upload
                    </Text>
                </TouchableOpacity> : null}

                {data.img == undefined ? null : <TouchableOpacity style={{ backgroundColor: "#db2066", width: 90, height: 30, justifyContent: "center", alignItems: "center", marginTop: 20 }}
                    onPress={() => handleOnPressUpload()}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
                        UPLOAD
                    </Text>
                </TouchableOpacity>}

            </View>

            <TouchableOpacity style={{ backgroundColor: "#4c546b", width: 100, height: 30, justifyContent: "center", alignItems: "center", marginTop: 60, alignSelf: "center" }}
                onPress={() => handleOnPressDownload()}>
                <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
                    DOWNLOAD
                </Text>
            </TouchableOpacity>

            {netInfo.isConnected == false ? Snackbar.show({
                text: 'No Internet Connection',
                duration: Snackbar.LENGTH_LONG
            }) : Snackbar.dismiss()
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    BtnStyle: {
        borderRadius: 8,
        width: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    }
});

//make this component available to the app
export default NativeComp;

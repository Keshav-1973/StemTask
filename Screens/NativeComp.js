//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, NativeModules, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';



const { ImagePickerModule } = NativeModules;

const NativeComp = () => {

    const [image, setImage] = useState("")

    const handleOnPressDownload = () => {
        ImagePickerModule.onDownload()

    };
    const handleOnPressChoose = async () => {
        try {
            const data = await ImagePickerModule.onPickImage();
            console.log("promise", data);
            setImage(data)
        } catch (e) {
            console.error(e);
        }
    };
    const handleOnPressUpload = () => {
        ImagePickerModule.onUpload(image)

    };



    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "#04734c", width: "100%", height: 40, alignSelf: "flex-start", justifyContent: "center" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>Download/Upload Manager</Text>
            </View>

            <View style={{ marginTop: 100 }}>
                {image == "" ?
                    <TouchableWithoutFeedback onPress={() => handleOnPressChoose()} >
                        <Image style={{ width: 200, height: 200, alignSelf: "center" }} source={require('../images/cloud-2044823_1280.png')} />
                    </TouchableWithoutFeedback>

                    :
                    <View style={{ height: 200, width: 200, alignSelf: "center" }}>
                        <TouchableWithoutFeedback onPress={() => { setImage("") }}>
                            <Image source={require('../images/new.png')} style={{ width: 30, height: 30, alignSelf: "flex-end", position: "absolute", zIndex: 2, top: -3 }} />
                        </TouchableWithoutFeedback>

                        <Image
                            style={{ width: '100%', height: "100%", alignSelf: "center", resizeMode: "stretch" }}
                            source={{
                                uri:
                                    image
                            }}
                        />
                    </View>
                }
            </View>

            <View style={{ width: "100%", alignItems: "center" }}>
                {image == "" ? <TouchableOpacity
                    onPress={() => handleOnPressChoose()}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                        Choose a File to Upload
                    </Text>
                </TouchableOpacity> : null}

                {image == "" ? null : <TouchableOpacity style={{ backgroundColor: "#db2066", width: 90, height: 30, justifyContent: "center", alignItems: "center", marginTop: 20 }}
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

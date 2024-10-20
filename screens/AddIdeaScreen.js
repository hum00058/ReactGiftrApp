import React, { useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'

export default function AddIdeaScreen() {
  const [permission, requestCameraPermission] = useCameraPermissions()
  const cameraRef = useRef(null)
  const [name, setName] = useState('')

  async function requestPermissions() {
    const cameraStatus = await requestCameraPermission()
    if (!cameraStatus.granted) {
      Alert.alert('Error', 'Camera permission is required')
      return false
    }
    return true
  }

  async function takePicture() {
    const hasPermission = await requestPermissions()
    if (!hasPermission) {
      Alert.alert('Error', 'Camera permission is required')
      return
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          <Text>Add Idea:</Text>
          <TextInput
            placeholder="Idea"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <CameraView ref={cameraRef}></CameraView>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  }
})

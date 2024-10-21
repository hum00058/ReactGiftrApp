import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image
} from 'react-native'
import { CameraView, Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'

export default function AddIdeaScreen({ route }) {
  const { person } = route.params
  const [type, setType] = useState('back')
  const cameraRef = useRef(null)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Idea',
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            navigation.navigate('People')
          }}
        >
          <View>
            <Text>Save Idea</Text>
          </View>
        </TouchableOpacity>
      )
    })
    requestPermissions()
  })

  async function requestPermissions() {
    const cameraStatus = await Camera.requestCameraPermissionsAsync()
    if (!cameraStatus.granted) {
      Alert.alert('Error', 'Camera permission is required')
      return false
    }
    console.log('Camera permission granted')
    return true
  }

  async function takePicture() {
    if (!cameraRef.current) return
    try {
      const photo = await cameraRef.current.takePictureAsync()
      setImage(photo.uri)
      console.log(photo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.text}>Add Idea for {person.name}:</Text>
          <TextInput
            placeholder="Name..."
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.nameInput}
          />
          <TextInput
            editable
            multiline
            placeholder="Details..."
            value={bio}
            onChangeText={(text) => setBio(text)}
            style={styles.bioInput}
          />
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          ) : (
            <CameraView style={styles.camera} ref={cameraRef} type={type}>
              <TouchableOpacity onPress={takePicture}>
                <View style={styles.pictureButton}>
                  <Text>Take Picture</Text>
                </View>
              </TouchableOpacity>
            </CameraView>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  nameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  bioInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10
  },
  camera: {
    width: 'auto',
    height: 350,
    borderRadius: 5
  },
  pictureButton: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    top: 290,
    width: 150,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

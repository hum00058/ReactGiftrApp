import React, { useEffect, useRef, useState, useContext } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground
} from 'react-native'
import PeopleContext from '../PeopleContext'
import { CameraView, Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'

export default function AddIdeaScreen({ route }) {
  const { person } = route.params
  const { addIdea } = useContext(PeopleContext)
  const [facing, setFacing] = useState('back')
  const cameraRef = useRef(null)
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [image, setImage] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Idea',
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            addIdea(person.id, name, details, image)
            navigation.goBack()
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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.heading}>Add Idea for {person.name}:</Text>
          <TextInput
            placeholder="Name..."
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.nameInput}
          />
          <TextInput
            placeholder="Details..."
            value={details}
            onChangeText={(text) => setDetails(text)}
            style={styles.bioInput}
          />
          {image ? (
            <ImageBackground source={{ uri: image }} style={styles.camera}>
              <TouchableOpacity onPress={() => setImage(null)}>
                <View style={styles.pictureButton}>
                  <Text>Retake Picture</Text>
                </View>
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
              <View style={styles.cameraButtonContainer}>
                <TouchableOpacity
                  onPress={() =>
                    setFacing(facing === 'back' ? 'front' : 'back')
                  }
                >
                  <View style={styles.pictureButton}>
                    <Text>Flip Camera</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture}>
                  <View style={styles.pictureButton}>
                    <Text>Take Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
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
  cameraButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

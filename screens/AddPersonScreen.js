import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import PeopleContext from '../PeopleContext'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function AddPersonScreen() {
  const [name, setName] = useState('')
  const today = new Date()
  today.setHours(today.getHours() - 4) // EST
  const [dob, setDob] = useState(today)
  const { addPerson } = useContext(PeopleContext)
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add Person',
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            Alert.alert(
              'Save Person',
              'Are you sure you want to save this person?',
              [
                {
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'Save',
                  onPress: () => savePerson()
                }
              ]
            )
          }}
        >
          <View>
            <Text>Save Person</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, [name, dob])

  const savePerson = () => {
    console.log(name)
    if (name) {
      const formattedDob = dob.toISOString().split('T')[0]
      addPerson(name, formattedDob)
      navigation.goBack()
    } else {
      Alert.alert('Name is required', 'Please enter a name for this person')
      return
    }
  }

  const onChange = (event, selectedDate) => {
    setDob(selectedDate)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.infoContainer}>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <View style={styles.dateContainer}>
            <Text style={{ fontWeight: '500', color: '#999' }}>
              Date of Birth |
            </Text>
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={onChange}
              style={styles.datePicker}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginTop: 100,
    marginHorizontal: 20
  },
  dateContainer: {
    display: 'flex',
    marginHorizontal: 'auto',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5
  },
  datePicker: {
    display: 'flex',
    marginHorizontal: 'auto'
  }
})

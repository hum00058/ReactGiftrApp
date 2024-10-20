import React, { useContext, useState } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'
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

  const savePerson = () => {
    if (name && dob) {
      const formattedDob = dob.toISOString().split('T')[0]
      addPerson(name, formattedDob)
      navigation.goBack()
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
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={onChange}
            style={styles.datePicker}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={() => navigation.goBack()} />
          <Button title="Save" onPress={savePerson} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  input: {
    height: 40,
    margin: 12
  },
  datePicker: {
    alignSelf: 'center',
    margin: 12
  }
})

import React, { useContext, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import PeopleContext from '../PeopleContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function IdeaScreen({ route }) {
  const { id } = route.params
  const { people } = useContext(PeopleContext)
  const person = people.find((person) => person.id === id)
  const navigation = useNavigation()

  console.log(person)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: person.name,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            navigation.navigate('AddIdea', { person: person })
          }}
        >
          <View>
            <Text>Add Idea</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {person.ideas.length === 0 ? (
          <View style={styles.peopleAlert}>
            <Text>
              No gift ideas saved yet, press
              <Text style={{ fontWeight: 700 }}> 'Add Idea'</Text> to create.
            </Text>
          </View>
        ) : (
          <FlatList
            data={person.ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text>{item.text}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  peopleAlert: {
    padding: 20
  }
})

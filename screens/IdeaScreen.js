import React, { useContext, useEffect } from 'react'
import {
  View,
  Pressable,
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ideas for ' + person.name,
      headerRight: () => (
        <Pressable
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('AddIdeas')}
        >
          <View>
            <Text>Add Idea</Text>
          </View>
        </Pressable>
      )
    })
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View>
          {person.ideas ? (
            <View style={styles.peopleAlert}>
              <Text>No people saved yet.</Text>
            </View>
          ) : (
            <FlatList
              data={person.ideas}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable>
                  <Text>{item.text}</Text>
                </Pressable>
              )}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  peopleAlert: {
    padding: 20
  }
})

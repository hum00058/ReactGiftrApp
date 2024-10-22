import React, { useContext, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert
} from 'react-native'
import PeopleContext from '../PeopleContext'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function IdeaScreen({ route }) {
  const { id } = route.params
  const { people, deleteIdea } = useContext(PeopleContext)
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

  const deleteIdeaOnClick = (personId, ideaId) => {
    Alert.alert('Delete Idea', 'Are you sure you want to delete this idea?', [
      {
        text: 'Cancel'
      },
      {
        text: 'Delete',
        onPress: () => deleteIdea(personId, ideaId),
        style: 'destructive'
      }
    ])
  }

  const ideaItem = ({ item }) => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.listItem}>
          <Text style={styles.itemText_Name}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => deleteIdeaOnClick(person.id, item.id)}
          >
            <View style={styles.listItem_Button}>
              <Text style={styles.listItem_ButtonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Image source={{ uri: item.image }} style={styles.ideaImage} />
        <Text style={styles.itemText_Details}>{item.details}</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {person.ideas.length === 0 ? (
          <View style={styles.peopleAlert}>
            <Text style={{ marginTop: 250, margin: 20, color: '#999' }}>
              No gift ideas saved yet, press
              <Text style={{ fontWeight: 700 }}> 'Add Idea'</Text> to create.
            </Text>
          </View>
        ) : null}
        <FlatList
          data={person.ideas}
          keyExtractor={(item) => item.id}
          renderItem={(item) => ideaItem(item)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  peopleAlert: {
    padding: 20
  },
  ideaImage: {
    height: 250,
    borderRadius: 5
  },
  listItemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  listItem_Button: {
    backgroundColor: '#000',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  listItem_ButtonText: {
    color: '#fff',
    textAlign: 'center'
  },
  itemText_Name: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  itemText_Details: {
    fontSize: 16,
    paddingVertical: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%'
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

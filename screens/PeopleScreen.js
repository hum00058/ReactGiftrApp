import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect } from 'react'
import {
  Pressable,
  Button,
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  View
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import PeopleContext from '../PeopleContext'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function PeopleScreen() {
  const navigation = useNavigation()
  const { people, deletePerson } = useContext(PeopleContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('AddPerson')}
        >
          <View>
            <Text>Add Person</Text>
          </View>
        </Pressable>
      )
    })
  }, [])

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => deletePerson(id)}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  )

  const peopleItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.listItem}>
          <View style={styles.listItem_Info}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.dob}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('Ideas', { id: item.id })}
          >
            <View style={styles.listItem_Button}>
              <Text style={styles.listItem_Text}>Ideas</Text>
            </View>
          </Pressable>
        </View>
      </Swipeable>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {people.length === 0 ? (
          <View style={styles.peopleAlert}>
            <Text>No people saved yet.</Text>
          </View>
        ) : (
          <FlatList
            data={people}
            keyExtractor={(item) => item.id}
            renderItem={peopleItem}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50
  },
  peopleAlert: {
    padding: 20
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
  },
  listItem_Info: {
    justifyContent: 'space-between'
  },
  listItem_Button: {
    backgroundColor: '#008cff',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  listItem_Text: {
    color: '#fff',
    textAlign: 'center'
  },
  itemText: {
    fontSize: 18
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

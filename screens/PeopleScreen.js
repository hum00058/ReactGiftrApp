import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect } from 'react'
import {
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import PeopleContext from '../PeopleContext'
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler'

export default function PeopleScreen() {
  const navigation = useNavigation()
  const { people, deletePerson } = useContext(PeopleContext)

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('AddPerson')}
        >
          <View>
            <Text>Add Person</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, [])

  const daysUntilBirthday = (birthday) => {
    // birthday is in the format 'YYYY-MM-DD'
    const now = new Date()
    const [year, month, day] = birthday.split('-')
    const dobDate = new Date(year, month - 1, day)
    const dobThisYear = new Date(
      now.getFullYear(),
      dobDate.getMonth(),
      dobDate.getDate()
    )
    const dobNextYear = new Date(
      now.getFullYear() + 1,
      dobDate.getMonth(),
      dobDate.getDate()
    )
    if (dobDate.getMonth() > now.getMonth()) {
      // birthday is this year
      const differenceInTime = dobThisYear.getTime() - now.getTime()
      const differenceInDays = Math.round(
        differenceInTime / (1000 * 60 * 60 * 24)
      )
      return differenceInDays
    } else if (dobDate.getMonth() < now.getMonth()) {
      // birthday is next year
      const differenceInTime = dobNextYear.getTime() - now.getTime()
      const differenceInDays = Math.round(
        differenceInTime / (1000 * 60 * 60 * 24)
      )
      return differenceInDays
    } else if (dobDate.getMonth() === now.getMonth()) {
      // birthday month matches, check if it is this or next year

      if (dobDate.getDate() > now.getDate()) {
        // birthday is this year
        const differenceInTime = dobThisYear.getTime() - now.getTime()
        const differenceInDays = Math.round(
          differenceInTime / (1000 * 60 * 60 * 24)
        )
        return differenceInDays
      } else if (dobDate.getDate() < now.getDate()) {
        // birthday is next year
        const differenceInTime = dobNextYear.getTime() - now.getTime()
        const differenceInDays = Math.round(
          differenceInTime / (1000 * 60 * 60 * 24)
        )
        return differenceInDays
      } else if (dobThisYear.getDate() === now.getDate()) {
        // birthday is today
        return 0
      }
    }
  }

  const renderRightActions = (id) => (
    <TouchableOpacity
      onPress={() => {
        Alert.alert(
          'Delete Person',
          'Are you sure you want to delete this person?',
          [
            {
              text: 'Cancel'
            },
            {
              text: 'Delete',
              onPress: () => deletePerson(id),
              style: 'destructive'
            }
          ],
          { cancelable: false }
        )
      }}
      style={styles.deleteButton}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  )

  const peopleItem = ({ item }) => {
    return (
      <Swipeable renderRightActions={() => renderRightActions(item.id)}>
        <View style={styles.listItemContainer}>
          <View style={styles.listItem}>
            <Text style={styles.itemText_Name}>{item.name}</Text>
            <Text style={styles.itemText_Dob}>
              {item.dob} | in {daysUntilBirthday(item.dob)} days...
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ideas', { id: item.id })}
          >
            <View style={styles.listItem_Button}>
              <Text style={styles.listItem_ButtonText}>Ideas</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Swipeable>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        {people.length === 0 ? (
          <View style={styles.peopleAlert}>
            <Text>
              No people saved yet, press
              <Text style={{ fontWeight: 700 }}> 'Add Person'</Text> to create.
            </Text>
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
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff'
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
    paddingBottom: 5,
    fontWeight: 'semibold'
  },
  itemText_Dob: {
    color: '#999'
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

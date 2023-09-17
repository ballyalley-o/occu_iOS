import { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'
// styles
import styles from './welcome.style'
// constants
import { icons, TABS, SIZES } from '../../../constants'

const Welcome = () => {
  const [activeJobType, setActiveJobType] = useState(TABS.jobTypes[0])
  const [actieTab, setActiveTab] = useState(TABS.jobTypes[0])
  const router = useRouter()

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Guest!</Text>
        <Text style={styles.welcomeMessage}>Find the Job that you love</Text>
      </View>
      <View style={styles.searchContainer}>
        r
        <View style={styles.searchWrapper}>
          <TextInput
            styles={styles.searchInput}
            value=''
            onChange={() => {}}
            placeholder='Search it!'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={TABS.jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item)
                router.push(`/search/${item}`)
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome

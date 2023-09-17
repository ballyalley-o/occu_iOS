import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native'
// hooks
import { useRouter } from 'expo-router'
import { useFetch } from '../../../hooks'
// routes
import { ROUTES } from '../../../routes'
// components
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
// styles
import styles from './popularjobs.style'
// constants
import { COLORS, SIZES } from '../../../constants'

const Popularjobs = () => {
  const [selectedJob, setSelectedJob] = useState()
  const router = useRouter()
  const { data, isLoading, error } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  })

  const handleCardPress = (item) => {
    router.push(ROUTES.jobDetails(item))
    setSelectedJob(item.job_id)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' colors={COLORS.primary} />
        ) : error ? (
          <Text> Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs

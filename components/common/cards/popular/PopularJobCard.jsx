import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
// styles
import styles from './popularjobcard.style'
//util
import { imageChecker } from '../../../../utils'
// constants
import { imageURL } from '../../../../constants'

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={{
            uri: imageChecker(item.employer_logo)
              ? item.employer_logo
              : imageURL.job,
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title}
        </Text>
        <Text style={styles.location} numberOfLines={1}>
          {item.job_city
            ? item.job_city + ', ' + item.job_country
            : item.job_country}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard

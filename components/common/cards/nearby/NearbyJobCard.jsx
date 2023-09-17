import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
// styles
import styles from './nearbyjobcard.style'
//util
import { imageChecker } from '../../../../utils'
// constants
import { imageURL } from '../../../../constants'

const NearbyJobCard = ({ job, handleNavigate }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={{
            uri: imageChecker(job.employer_logo)
              ? job.employer_logo
              : imageURL.job,
          }}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job.job_title}
        </Text>
        <Text style={styles.jobType}>{job.job_employment_type}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard

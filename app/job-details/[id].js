import { useState, useCallback } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native'
// hooks
import { Stack, useRouter, useSearchParams } from 'expo-router'
import { useFetch } from '../../hooks'
// components
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from '../../components'
//styles
import { default_styles } from '../../theme'
// constants
import { COLORS, SIZES, icons } from '../../constants'

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false)
  const params = useSearchParams()
  const router = useRouter()

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  })

  const onRefresh = () => {}
  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            titile='Qualifcations'
            points={data[0].job_highlights?.qualifications ?? ['N/A']}
          />
        )
      case 'About':
      case 'Responsibilities':
      default:
        break
    }
  }

  return (
    <SafeAreaView style={default_styles.safeAreaView}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension='60%'
              //   handlePress={() => router.back()}
            />
          ),
          headerTitle: '',
        }}
      />
      <>
        <ScrollView
          showsVerticalScrollIndicato={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size='large' color={COLORS.primary} />
          ) : error ? (
            <Text>Something Went Wrong</Text>
          ) : data.length === 0 ? (
            <Text>Empty</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0].employer_logo}
                jobTitle={data[0].job_title}
                companyName={data[0].employer_name}
                location={data[0].job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}

export default JobDetails

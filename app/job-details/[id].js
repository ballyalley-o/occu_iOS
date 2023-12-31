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
import { Company, JobFooter, JobTabs, ScreenHeaderBtn } from '../../components'
// import displayTabContent from '../../components/jobdetails/tab-contents'
//styles
import { default_styles } from '../../theme'
// constants
import { GLOBAL } from '../../config'
import { COLORS, SIZES, TABS, icons } from '../../constants'

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState(TABS.jobs[0])
  const params = useSearchParams()
  const router = useRouter()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  const { data, isLoading, error, refetch } = useFetch('job-details', {
    job_id: params.id,
  })

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Qualifications':
        return (
          <Specifics
            title='Qualifications'
            points={data[0].job_highlights?.Qualifications ?? ['N/A']}
          />
        )
      case 'About':
        return <JobAbout info={data[0].job_description ?? 'Empty'} />
      case 'Responsibilities':
        return (
          <Specifics
            title='Responsibilities'
            points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
          />
        )
      default:
        return null
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
                tabs={TABS.jobs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={data[0]?.ActivityIndicator.job_google_link ?? GLOBAL.CAREERS}
        />
      </>
    </SafeAreaView>
  )
}

export default JobDetails

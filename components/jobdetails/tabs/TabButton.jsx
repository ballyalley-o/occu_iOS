import { Text, TouchableOpacity } from 'react-native'
// styles
import styles from './tabs.style'

const TabButton = ({ name, activeTab, onHandleSearchType }) => (
  <TouchableOpacity
    style={styles.btn(name, activeTab)}
    onPress={onHandleSearchType}
  >
    <Text styles={styles.btnText(name, activeTab)}>{name}</Text>
  </TouchableOpacity>
)

export default TabButton

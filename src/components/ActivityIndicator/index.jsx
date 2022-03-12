import styles from './index.module.css'

const ActivityIndicator = props => {
  const { colorstyle } = props

  const activeClass = colorstyle === 'dark' ? styles.dark : styles.light

  return (
    <svg className={styles.svg} width={props.width} height={props.height} viewBox="25 25 50 50">
      <circle className={`${styles.circle} ${activeClass}`} cx="50" cy="50" r="20"></circle>
    </svg>
  )
}

export default ActivityIndicator

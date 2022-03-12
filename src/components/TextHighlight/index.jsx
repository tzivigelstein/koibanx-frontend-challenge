import styles from './index.module.css'

export default function TextHighlight({ text, shouldBeHighlighted }) {
  const textArray = text.split(shouldBeHighlighted)
  return (
    <span>
      {textArray.map((item, index) => (
        <span key={crypto.randomUUID()}>
          {item}
          {index !== textArray.length - 1 && <span className={styles.highlight}>{shouldBeHighlighted}</span>}
        </span>
      ))}
    </span>
  )
}

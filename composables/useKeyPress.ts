import { ref, onMounted, onBeforeUnmount } from 'vue'

const useKeyPress = (targetKey: string): Ref< boolean > => {
  const keyPressed = ref< boolean >(false)

  const downHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      keyPressed.value = true
    }
  }

  const upHandler = ({ key }: KeyboardEvent): void => {
    if (key === targetKey) {
      keyPressed.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  })

  return keyPressed
}

export default useKeyPress

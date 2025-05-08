import { ref, onMounted } from 'vue'
import { Modal } from 'flowbite'

export function useModal(modalId) {
  const modalInstance = ref(null)

  const showModal = () => {
    if (modalInstance.value) {
      modalInstance.value.show()
    }
  }

  const hideModal = () => {
    if (modalInstance.value) {
      modalInstance.value.hide()
    }
  }

  onMounted(() => {
    const modalEl = document.getElementById(modalId)
    if (modalEl) {
      modalInstance.value = new Modal(modalEl)
    }
  })

  return {
    showModal,
    hideModal
  }
}

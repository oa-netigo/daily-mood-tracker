import { ref, onMounted } from 'vue'
import { Dropdown } from 'flowbite'

export function useDropdown(buttonId, dropdownId) {
  const dropdownInstance = ref(null)

  const showDropdown = () => {
    if (dropdownInstance.value) {
      dropdownInstance.value.show()
    }
  }

  const hideDropdown = () => {
    if (dropdownInstance.value) {
      dropdownInstance.value.hide()
    }
  }

  onMounted(() => {
    const button = document.getElementById(buttonId)
    const dropdown = document.getElementById(dropdownId)
    if (button && dropdown) {
      dropdownInstance.value = new Dropdown(dropdown, button)
    }
  })

  return {
    showDropdown,
    hideDropdown
  }
}

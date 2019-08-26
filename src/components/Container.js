import DropdownSelect from "./dropdown/DropdownSelect";
import SelectButton from "./SelectButton";

class Container {

  constructor ({ root }) {
    this.$root = root

    this._buildButton()
    this._buildDropdownSelect()
    this.$button.render()
    this._keyupEventListeners()

    this.$root.$store.on('selectedItemsChange', () => {
      this.$button.render()
    })

    this.$root.$store.on('isOpenedChange', (isOpened) => {
      this.$button.render()
      this._toggleDropdown()
    })
    
    // exit on outside click
    document.addEventListener('click', (e) => {
      if (!this.$root.$store.isOpened) {
        return
      }

      if (!this.$root.$el.contains(e.target)) {
        this.$root.$store.isOpened = false
      }
    })
  }

  _buildButton () {
    this.$button = new SelectButton({ root: this.$root })
    this.$root.$el.appendChild(this.$button.el)
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = new DropdownSelect({
      container: this
    })
  }

  _toggleDropdown () {
    if (this.$root.$store.isOpened) {
      this.$root.$el.classList.add('opened')
    } else {
      this.$root.$el.classList.remove('opened')
    }
  }

  _keyupEventListeners () {
    this.$root.$el.addEventListener('keyup', (e) => {
      if (e.code === 'Escape') {
        this.$root.$store.isOpened = false
      }
    })
  }
}

export default Container
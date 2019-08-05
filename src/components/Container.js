import DropdownSelect from "./DropdownSelect";

class Container {

  constructor ({ root }) {
    this.$root = root

    this._buildButton()
    this._buildDropdownSelect()

    this.$root.$store.on('selectedItemsChange', (selectedItems) => {
      this._rerenderButton()
    })
  }

  _buildButton () {
    this.$button = document.createElement('button')
    this.$button.innerText = this.$root.$options.placeholder || 'Select'
    this.$button.classList.add('form-control', 'd-flex', 'justify-content-between')

    this.$root.$el.appendChild(this.$button)
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = new DropdownSelect({
      container: this
    })
  }

  _rerenderButton () {
    let selectedItems = this.$root.$store.selectedItems

    this.$button.innerText = `${selectedItems.length} selected`
  }
}

export default Container
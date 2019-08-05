import DropdownSelect from "./DropdownSelect";

class Container {

  constructor ({ root }) {
    this.$root = root

    this._buildButton()
    this._buildDropdownSelect()
    this._rerenderButton()

    this.$root.$store.on('selectedItemsChange', () => {
      this._rerenderButton()
    })

    this.$root.$store.on('isOpenedChange', () => {
      this._rerenderButton()
    })

    // exit on outside click
    document.addEventListener('click', (e) => {
      if (!this.$root.$el.contains(e.target)) {
        this.$root.$store.isOpened = false
        this.$root.$el.classList.remove('opened')
      }
    })
  }

  _buildButton () {
    this.$button = document.createElement('button')
    this.$button.classList.add(
      'form-control', 'd-flex', 'justify-content-between', 'align-items-center'
    )

    let content = document.createElement('span')
    content.setAttribute('class', 'content')
    content.innerText = this.$root.$options.placeholder || 'Select'

    let caret = document.createElement('span')
    caret.classList.add('caret')
    caret.innerHTML = '&#9662;'
    caret.style.fontSize = '70%'

    this.$button.addEventListener('click', (e) => {
      this.$root.$store.isOpened = !this.$root.$store.isOpened

      if (this.$root.$store.isOpened) {
        this.$root.$el.classList.add('opened')
      } else {
        this.$root.$el.classList.remove('opened')
      }
    })

    this.$button.appendChild(content)
    this.$button.appendChild(caret)
    this.$root.$el.appendChild(this.$button)
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = new DropdownSelect({
      container: this
    })
  }

  _rerenderButton () {
    let selectedItems = this.$root.$store.selectedItems

    this.$button
      .querySelector('span.content')
      .innerText = `${selectedItems.length} selected`

    if (this.$root.$store.isOpened) {
      this.$button
        .querySelector('span.caret')
        .innerHTML = '&#9652;'
    } else {
      this.$button
        .querySelector('span.caret')
        .innerHTML = '&#9662;'
    }
  }
}

export default Container
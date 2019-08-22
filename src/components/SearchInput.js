class SearchInput {

  constructor({ root, dropdownSelect }) {
    this.$root = root
    this.$dropdownSelect = dropdownSelect

    this.render()
  }

  get el () {
    return this._inputContainer
  }

  /**
   * Set the `<input>` tag to be focused
   *
   * @memberof SearchInput
   */
  focus () {
    this._input.focus()
  }

  _build () {
    this._input = document.createElement('input')
    this._input.classList.add('form-control')
    this._input.setAttribute('placeholder', 'Search')
    this._input.setAttribute('type', 'text')
    this._input.setAttribute('autofocus', true)

    this._inputContainer = document.createElement('div')
    this._inputContainer.classList.add('p-2')
    this._inputContainer.appendChild(this._input)

    this._registerEventListeners()
  }

  _registerEventListeners () {
    // prevent default action for some key when pressed
    // navigating between options
    this._input.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'Enter') {
        e.preventDefault()

        if (e.code === 'ArrowUp') {
          if (this.$root.$store.hoveredItemIndex === null) {
            this.$root.$store.hoveredItemIndex = this.$root.$store.items.length - 1
          } else if (this.$root.$store.hoveredItemIndex > 0) {
            this.$root.$store.hoveredItemIndex--
          }
        } else if (e.code === 'ArrowDown') {
          if (this.$root.$store.hoveredItemIndex === null) {
            this.$root.$store.hoveredItemIndex = 0
          } else if (this.$root.$store.hoveredItemIndex < this.$root.$store.items.length - 1) {
            this.$root.$store.hoveredItemIndex++
          }
        }
        
        return false
      }
    })

    this._input.addEventListener('keyup', (e) => {
      if (e.code !== 'ArrowUp' && e.code !== 'ArrowDown') {
        this.$root.$store.keyword = this._input.value
      } 
      
      // toggle select option
      if (e.code === 'Enter') {
        if (this.$root.$store.hoveredItemIndex !== null) {
          let selectedItem = this.$root.$store.filteredItems[this.$root.$store.hoveredItemIndex]
          let selectedItems = this.$root.$store.selectedItems
          let index = selectedItems.findIndex(_selectedItem => _selectedItem.value === selectedItem.value)

          if (index > -1) {
            selectedItems.splice(index, 1)
          } else {
            if (this.$root.$store.isMultiple) {
              selectedItems.push(selectedItem)
            } else {
              selectedItems = [selectedItem]

              // close the dropdown because it is not `<select multiple>`
              this.$root.$store.isOpened = false
            }
          }

          this.$root.$store.selectedItems = selectedItems
          
          console.log(selectedItem, { index })
        }
      }
    })
  }

  render () {
    if (!this._input) {
      this._build()
    }
  }
}

export default SearchInput
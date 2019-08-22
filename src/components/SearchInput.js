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
    // prevent default action if arrow up and down is pressed
    // navigating between options
    this._input.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
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
    })
  }

  render () {
    if (!this._input) {
      this._build()
    }
  }
}

export default SearchInput
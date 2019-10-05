import SearchInput from "../SearchInput";
import Item from "./Item";

class DropdownSelect {
  constructor ({ container }) {
    this.$container = container
    this.$dropdownSelect = null
    this.$ulElement = null
    this.$input = null
    this.$optionItems = []

    this._buildDropdownSelect()
    this._eventListeners()
    this._buildSearchInput()
    this._buildOptionItems()
    this._rerenderOptionsItems()
  }

  _buildDropdownSelect () {
    this.$dropdownSelect = document.createElement('div')
    this.$dropdownSelect.classList.add(
      'dropdown-select',
      'bg-white',
      'shadow'
    )

    this.$container.$root.$el.appendChild(this.$dropdownSelect)
  }

  _buildSearchInput () {
    this.$input = new SearchInput({ root: this.$container.$root, dropdownSelect: this })
    this.$dropdownSelect.appendChild(this.$input.el)
    this.$input.render()
  }

  _buildOptionItems () {
    let ulElement = this.$ulElement
    
    this.$optionItems = []
    
    if (!ulElement) {
      ulElement = document.createElement('ul')
      ulElement.classList.add('list-group', 'mt-0')
  
      this.$dropdownSelect.appendChild(ulElement)
      this.$ulElement = ulElement
    }

    // clear option
    while (ulElement.lastChild) {
      ulElement.removeChild(ulElement.lastChild)
    }

    this.filteredItems.forEach((item, index) => {
      let itemDom = new Item({
        root: this.$container.$root,
        dropdownSelect: this,
        item,
        index
      })

      this.$optionItems.push(itemDom)
      ulElement.appendChild(itemDom.el)
    })

    // if no result
    if (this.filteredItems.length < 1) {
      let itemDom = document.createElement('li')
      itemDom.classList.add(
        'list-group-item', 'd-flex', 'flex-row',
        'justify-content-between', 'p-2', 'rounded-0',
        'list-group-item-secondary'
      )
      itemDom.innerText = 'No items.'
      ulElement.appendChild(itemDom)
    }
  }

  _rerenderOptionsItems () {
    this.$optionItems.forEach((itemDom) => {
      itemDom.render()
    })

    this._setDropdownMaxHeight()
  }

  _setDropdownMaxHeight () {
    let dropDownY = this.$dropdownSelect.getBoundingClientRect().y
    let maxHeight = window.innerHeight - dropDownY - 10
    maxHeight -= this.$input.el.clientHeight
    
    this.$ulElement.style.maxHeight = `${maxHeight}px`
  }

  _eventListeners () {
    window.addEventListener('resize', this._onWindowResize.bind(this))
    window.addEventListener('scroll', this._onWindowResize.bind(this))

    this.$container.$root.$store.on('isOpenedChange', isOpened => {
      if (isOpened) {
        setTimeout(() => {
          this._setDropdownMaxHeight()
        }, 100)
      }
    })

    this.$container.$root.$store.on('keywordChange', () => {
      this._buildOptionItems()
      this._rerenderOptionsItems()
    })

    this.$container.$root.$store.on('selectedItemsChange', () => {
      this._rerenderOptionsItems()
    })

    this.$container.$root.$store.on('hoveredItemIndexChange', index => {
      this._rerenderOptionsItems()
    })
  }

  _onWindowResize (e) {
    if (!this.$container.$root.$store.isOpened) {
      return
    }

    this._setDropdownMaxHeight()
  }

  get filteredItems () {
    return this.$container.$root.$store.filteredItems
  }
}

export default DropdownSelect
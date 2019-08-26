import SearchInput from "../SearchInput";
import Item from "./Item";

class DropdownSelect {
  constructor ({ container }) {
    this.$container = container
    this.$dropdownSelect = null
    this.$input = null
    this.$optionItems = []

    this._buildDropdownSelect()
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

    this.$container.$root.$el.appendChild(this.$dropdownSelect)
  }

  _buildSearchInput () {
    this.$input = new SearchInput({ root: this.$container.$root, dropdownSelect: this })
    this.$dropdownSelect.appendChild(this.$input.el)
    this.$input.render()
  }

  _buildOptionItems () {
    let listGroup = this.$dropdownSelect.querySelector('.list-group')
    
    this.$optionItems = []
    
    if (!listGroup) {
      listGroup = document.createElement('ul')
      listGroup.classList.add('list-group', 'mt-0')
  
      this.$dropdownSelect.appendChild(listGroup)
    }

    // clear option
    while (listGroup.lastChild) {
      listGroup.removeChild(listGroup.lastChild)
    }

    this.filteredItems.forEach((item, index) => {
      let itemDom = new Item({
        root: this.$container.$root,
        dropdownSelect: this,
        item,
        index
      })

      this.$optionItems.push(itemDom)
      listGroup.appendChild(itemDom.el)
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
      listGroup.appendChild(itemDom)
    }
  }

  _rerenderOptionsItems () {
    this.$optionItems.forEach((itemDom) => {
      itemDom.render()
    })
  }

  get filteredItems () {
    return this.$container.$root.$store.filteredItems
  }
}

export default DropdownSelect
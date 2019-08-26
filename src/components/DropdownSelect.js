import SearchInput from "./SearchInput";

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
      console.log('hovered item index', index)
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
    let store = this.$container.$root.$store
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

    this.filteredItems.forEach((item, i) => {
      let itemDom = document.createElement('li')

      
      itemDom.classList.add(
        'list-group-item', 'd-flex', 'flex-row',
        'justify-content-between', 'p-2', 'rounded-0'
      )
      
      if (item.disabled) {
        itemDom.classList.add('disabled')
      }

      itemDom.setAttribute('value', item.value)
      itemDom.innerText = item.label

      itemDom.addEventListener('click', (e) => {
        let selectedItems = store.selectedItems
        let currentTarget = e.currentTarget
        let index = selectedItems.findIndex(item => item.value === currentTarget.getAttribute('value'))

        if (index > -1) {
          selectedItems.splice(index, 1)
        } else {
          if (store.isMultiple) {
            selectedItems.push({
              value: currentTarget.getAttribute('value'),
              label: currentTarget.innerText
            })
          } else {
            selectedItems = [{
              value: currentTarget.getAttribute('value'),
              label: currentTarget.innerText
            }]

            // close this dropdown
            this.$container.$root.$store.isOpened = false
          }
        }

        store.selectedItems = selectedItems
        this._rerenderOptionsItems()
        this.$input.focus()
      })

      this.$optionItems.push(itemDom)
      listGroup.appendChild(itemDom)
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
    let store = this.$container.$root.$store

    this.$optionItems.forEach((itemDom, i) => {
      // is selected
      if (store.selectedItems.find(item => item.value === itemDom.getAttribute('value'))) {
        itemDom.classList.add('list-group-item-primary')
      } else {
        itemDom.classList.remove('list-group-item-primary')
      }

      // if this item is hovered
      if (i === this.$container.$root.$store.hoveredItemIndex) {
        itemDom.classList.add('hover')
      } else {
        itemDom.classList.remove('hover')
      }
    })
  }

  get filteredItems () {
    return this.$container.$root.$store.filteredItems
  }
}

export default DropdownSelect
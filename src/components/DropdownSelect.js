class DropdownSelect {
  constructor ({ container }) {
    this.$container = container
    this.$dropdownSelect = null
    this.$input = null
    this.$optionItems = []
    this.keyword = null

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

    this.$container.$root.$el.appendChild(this.$dropdownSelect)
  }

  _buildSearchInput () {
    this.$input = document.createElement('input')
    this.$input.classList.add('form-control')
    this.$input.setAttribute('placeholder', 'Search')
    this.$input.setAttribute('type', 'text')
    this.$input.setAttribute('autofocus', true)

    // prevent default action if arrow up and down is pressed
    this.$input.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        e.preventDefault()
        return false
      }
    })

    this.$input.addEventListener('keyup', (e) => {
      this.keyword = this.$input.value
      this._buildOptionItems()
      this._rerenderOptionsItems()
    })

    let inputContainer = document.createElement('div')
    inputContainer.classList.add('p-2')
    inputContainer.appendChild(this.$input)
    
    this.$dropdownSelect.appendChild(inputContainer)
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

    this.filteredItems.forEach(item => {
      let itemDom = document.createElement('li')
      itemDom.classList.add(
        'list-group-item', 'd-flex', 'flex-row',
        'justify-content-between', 'p-2', 'rounded-0'
      )
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

    this.$optionItems.forEach(itemDom => {
      // is selected
      if (store.selectedItems.find(item => item.value === itemDom.getAttribute('value'))) {
        itemDom.classList.add('list-group-item-primary')
      } else {
        itemDom.classList.remove('list-group-item-primary')
      }
    })
  }

  get filteredItems () {
    return this.$container.$root.$store.items.filter(item => {
      if (this.keyword) {
        return item.label.toLowerCase().includes(this.keyword.toLowerCase())
      }

      return true
    })
  }
}

export default DropdownSelect
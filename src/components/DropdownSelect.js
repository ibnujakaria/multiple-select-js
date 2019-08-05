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

    this.$container.$root.$el.appendChild(this.$dropdownSelect)
  }

  _buildSearchInput () {
    this.$input = document.createElement('input')
    this.$input.classList.add('form-control')
    this.$input.setAttribute('placeholder', 'Search')
    this.$input.setAttribute('type', 'text')

    let inputContainer = document.createElement('div')
    inputContainer.classList.add('p-2')
    inputContainer.appendChild(this.$input)
    
    this.$dropdownSelect.appendChild(inputContainer)
  }

  _buildOptionItems () {
    let store = this.$container.$root.$store
    this.$optionItems = []

    let listGroup = document.createElement('ul')
    listGroup.classList.add('list-group', 'mt-0')

    this.$dropdownSelect.appendChild(listGroup)

    store.items.forEach(item => {
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
          store.selectedItems.splice(index, 1)
        } else {
          store.selectedItems.push({
            value: currentTarget.getAttribute('value'),
            label: currentTarget.innerText
          })
        }

        store.selectedItems = selectedItems
        this._rerenderOptionsItems()
      })

      this.$optionItems.push(itemDom)
      listGroup.appendChild(itemDom)
    })
  }

  _rerenderOptionsItems () {
    let store = this.$container.$root.$store

    this.$optionItems.forEach(itemDom => {
      if (store.selectedItems.find(item => item.value === itemDom.getAttribute('value'))) {
        itemDom.classList.add('list-group-item-primary')
      } else {
        itemDom.classList.remove('list-group-item-primary')
      }
    })
  }
}

export default DropdownSelect
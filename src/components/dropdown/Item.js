/**
 * Class for handling `<li>` element for item options.
 *
 * @class Item
 */
class Item {

  constructor ({ root, dropdownSelect, item, index }) {
    this.$root = root
    this.$dropdownSelect = dropdownSelect
    this._item = item
    this._index = index

    this.build()
    this.render()
  }

  get el () {
    return this._li
  }

  build () {
    let store = this.$root.$store
    this._li = document.createElement('li')
      
    this._li.classList.add(
      'list-group-item', 'd-flex', 'flex-row',
      'justify-content-between', 'p-2', 'rounded-0'
    )
    
    if (this._item.disabled) {
      this._li.classList.add('disabled')
    }

    this._li.setAttribute('value', this._item.value)
    this._li.innerText = this._item.label

    this._li.addEventListener('click', (e) => {
      let selectedItems = store.selectedItems
      let currentTarget = e.currentTarget
      let selectedIndex = selectedItems.findIndex(item => item.value === currentTarget.getAttribute('value'))

      if (selectedIndex > -1) {
        selectedItems.splice(selectedIndex, 1)
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
          store.isOpened = false
        }
      }

      store.selectedItems = selectedItems
    })
  }

  render () {
    let store = this.$root.$store
    // is selected
    if (store.selectedItems.find(item => item.value === this._li.getAttribute('value'))) {
      this._li.classList.add('list-group-item-primary')
    } else {
      this._li.classList.remove('list-group-item-primary')
    }

    // if this item is hovered
    if (this._index === store.hoveredItemIndex) {
      this._li.classList.add('hover')
    } else {
      this._li.classList.remove('hover')
    }
  }
}

export default Item
import Container from './components/Container'
import Store from './store/Store'
import './scss/multiple-select.scss'

var selectMultipleContainerId = 0

class MultipleSelect {

  
  constructor(elId, options) {
    selectMultipleContainerId++

    this.$store = new Store()

    let { el, select, isMultiple, items, selectedItems } = this._buildRootElement(elId)

    this.$el = el
    this.$select = select
    this.$options = options
    this.$store.isMultiple = isMultiple
    this.$store.items = items
    this.$store.selectedItems = selectedItems

    this.$container = new Container({
      root: this
    })

    // syncing with the actual select
    this.$store.on('selectedItemsChange', (selectedItems) => {
      this.$select.querySelectorAll('option').forEach(option => {
        if (selectedItems.find(item => item.value === option.value)) {
          option.setAttribute('selected', true)
        } else {
          option.removeAttribute('selected')
        }
      })
    })

    // when the container is done rendered, the dropdown
    // will automatically focused
    let observer = new MutationObserver(() => {
      if (this.$el.classList.contains('opened')) {
        this.$container.$dropdownSelect.$input.focus()
      }
    })

    observer.observe(this.$el, { attributes: true, childList: true });
  }

  _buildRootElement (elId) {
    let select = document.querySelector(elId)
    let root = document.createElement('div')
    let items = []
    let selectedItems = []

    root.setAttribute('id', `multiple-select-container-${selectMultipleContainerId}`)
    root.style.position = 'relative'
    
    select.querySelectorAll('option:not([disabled])').forEach(option => {
      items.push({ value: option.value, label: option.innerText })
    })

    // get the already selected items
    select.querySelectorAll('option[selected]').forEach(option => {
      selectedItems.push({ value: option.value, label: option.innerText })
    })

    let isMultiple = select.getAttribute('multiple') !== null
    
    select.insertAdjacentElement('afterend', root)
    select.hidden = true

    return {
      select, el: root, isMultiple, items, selectedItems
    }
  }
}

window.MultipleSelect = MultipleSelect

export default MultipleSelect
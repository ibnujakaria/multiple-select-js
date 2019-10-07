import Container from './components/Container'
import Store from './store/Store'
import './scss/multiple-select.scss'

var selectMultipleContainerId = 0

class MultipleSelect {
  
  constructor(elId, options) {
    selectMultipleContainerId++

    const defaultOptions = {
      placeholder: 'Select'
    }

    this.$store = new Store()
    let { el, select, isMultiple, items, selectedItems } = this._buildRootElement(elId)
    this.$el = el
    this.$select = select
    this.$options = { ...defaultOptions, ...options }
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

      if (selectedItems.length < 1) {
        this.$select.value = ''
      }

      const changeEvent = document.createEvent('HTMLEvents')
      changeEvent.initEvent('change', true, true)

      const inputEvent = document.createEvent('HTMLEvents')
      inputEvent.initEvent('input', true, true)
      
      this.$select.dispatchEvent(changeEvent)
      this.$select.dispatchEvent(inputEvent)
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

  /**
   * Creating `<div>` for root element right after the `<select>` element.
   * And then hide the `<select>` element.
   *
   * @param {*} elId
   * @returns {*}
   * @memberof MultipleSelect
   */
  _buildRootElement (elId) {
    let select = document.querySelector(elId)
    let root = document.createElement('div')
    let items = []
    let selectedItems = []

    root.setAttribute('id', `multiple-select-container-${selectMultipleContainerId}`)
    root.style.position = 'relative'
    
    Array.from(select.options).forEach(option => {
      items.push({
        value: option.value,
        label: option.innerText.trim(),
        disabled: option.disabled
      })
    })

    // get the already selected items
    Array.from(select.selectedOptions).forEach(option => {
      selectedItems.push({ value: option.value, label: option.innerText.trim() })
    })

    // add event listener when <select> element changed via js
    select.addEventListener('change', e => {
      let values = Array.from(select.selectedOptions).map(el => el.value)
      let selectedItems = this.$store.selectedItems.map(item => item.value)
      let isTheSameLength = values.length === selectedItems.length

      function isTheSameComponents () {
        let found = true

        console.log({ values, selectedItems })
        values.forEach(value => {
          if (!selectedItems.find(item => item === value)) {
            found = false
            return
          }
        })

        return found
      }

      if (!isTheSameLength || !isTheSameComponents()) {
        // console.log('changed through js', values, selectedItems)
        this.$store.selectedItems = this.$store.items.filter(item => {
          return values.find(value => value === item.value)
        })
      }
    })

    select.insertAdjacentElement('afterend', root)
    select.hidden = true
    

    let isMultiple = select.multiple

    return {
      select, el: root, isMultiple, items, selectedItems
    }
  }
}

window.MultipleSelect = MultipleSelect

export default MultipleSelect

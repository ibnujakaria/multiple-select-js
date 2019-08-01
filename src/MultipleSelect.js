import Vue from 'vue'
import Store from './store/store.js'
import Container from './components/Container.vue'

var selectMultipleContainerId = 0

class MultipleSelect {

  constructor(el, options) {
    selectMultipleContainerId++
    
    this.store = Store.build()
    this._buildContainer(el, options)
    
    new Vue({
      ...this._vueAppProperties(),
      render: h => h(Container)
    }).$mount(`#multiple-select-container-${selectMultipleContainerId}`)
  }

  _buildContainer (el, options) {
    let dom = document.querySelector(el)
    let select = dom.cloneNode(true)
    let root = document.createElement('div')
    let items = []
    let selectedItems = []

    dom.querySelectorAll('option:not([disabled])').forEach(option => {
      items.push({ value: option.value, label: option.innerText })
    })

    // get the already selected items
    dom.querySelectorAll('option[selected]').forEach(option => {
      selectedItems.push({ value: option.value, label: option.innerText })
    })

    let isMultiple = select.getAttribute('multiple') !== null

    console.log('isMultiple:', select, isMultiple)
    root.setAttribute('id', `multiple-select-container-${selectMultipleContainerId}`)

    this.store.commit('SET_IS_MULTIPLE', isMultiple)
    this.store.commit('SET_ITEMS', items)
    this.store.commit('SET_OPTIONS', options)

    if (isMultiple) {
      this.store.commit('SET_SELECTED_ITEMS', selectedItems)
    } else {
      this.store.commit('SET_SELECTED_ITEM', selectedItems[0])
    }
    
    dom.replaceWith(root)
    root.prepend(select)

    if (isMultiple) {
      select.setAttribute('v-model', 'selectedItems')
    } else {
      select.setAttribute('v-model', 'selectedItem')
    }
    select.hidden = true
  }

  _vueAppProperties () {
    return {
      mounted () {
        console.log('MultipleSelect mounted()')
        console.log(this.$el.classList)
      },
      computed: {
        selectedItems: {
          get () {
            return this.$store.state.selectedItems.map(item => {
              return item.value
            })
          },
          set (value) {
            // this.$store.commit('SELECT_ITEM')
          }
        },
        selectedItem: {
          get () {
            if (!this.$store.state.selectedItem) {
              return null
            }

            return this.$store.state.selectedItem.value
          }
        }
      },
      store: this.store,
      methods: {
      },
      components: { Container }
    }
  }
}

window.MultipleSelect = MultipleSelect

export default MultipleSelect
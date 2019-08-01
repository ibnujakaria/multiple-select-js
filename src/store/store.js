import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  build: () => {
    return new Vuex.Store({
      state: {
        items: [],
        options: {},
        selectedItems: [], // this is for multiple select
        selectedItem: null, // this is for non multiple select
        hoveredItemIndex: null, // for hovering item by pressing arrow button on keyboard
        keyword: null,
        isMultiple: false
      },
      getters: {
        isSelected: state => item => {
          if (state.isMultiple) {
            return !!state.selectedItems.find(_item => _item.value === item.value)
          }

          return state.selectedItem && state.selectedItem.value === item.value
        },
        isHovered: (state, getters) => item => {
          return getters.hoveredItem && getters.hoveredItem.value === item.value
        }, 
        items: state => {
          return state.items.filter(item => {
            if (state.keyword) {
              return item.label.toLowerCase().includes(state.keyword.toLowerCase())
            }

            return true
          })
        },
        hoveredItem: (state, getters) => {
          if (state.hoveredItemIndex === null) {
            return null;
          }

          return getters.items[state.hoveredItemIndex]
        }
      },
      mutations: {
        SET_IS_MULTIPLE (state, isMultiple) {
          state.isMultiple = isMultiple
        },
        SET_ITEMS (state, items) {
          state.items = items
        },
        SET_OPTIONS (state, options) {
          state.options = options || {}
        },
        SET_KEYWORD (state, keyword) {
          state.keyword = keyword
        },
        SELECT_ITEM (state, item) {
          if (state.isMultiple) {
            const index = state.selectedItems.findIndex(_item => _item.value === item.value)
            
            console.log({ item, index })
            if (index !== -1) {
              state.selectedItems.splice(index, 1)
            } else {
              state.selectedItems.push(item)
            }
          } else {
            if (state.selectedItem && state.selectedItems.values === item.value) {
              state.selectedItem = null
            } else {
              state.selectedItem = item
            }
          }
        },
        SET_SELECTED_ITEM (state, selectedItem) {
          state.selectedItem = selectedItem
        },
        SET_SELECTED_ITEMS (state, selectedItems) {
          state.selectedItems = selectedItems
        },
        SET_HOVERED_ITEM_INDEX (state, index) {
          state.hoveredItemIndex = index
        }
      }
    })
  }
}
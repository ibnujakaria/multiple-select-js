<template>
  <div class="dropdown-select bg-white shadow">
    <div class="p-2">
      <input ref="input" type="text" class="form-control" placeholder="Search" v-model="keyword">
    </div>
    <ul class="list-group mt-0" ref="listGroup">
      <li
        class="list-group-item d-flex flex-row justify-content-between p-2 rounded-0"
        :class="getItemClasses(item)"
        v-for="(item, i) of items"
        :key="i"
        @click="selectItem(item)"
        @mouseenter="setHoveredItemIndex(i)"
      >
        {{ item.label }}

        <i class="fa fa-check" v-if="isSelected(item)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  props: ['container'],
  computed: {
    ...mapGetters(['items', 'hoveredItem']),
    ...mapState(['isMultiple', 'hoveredItemIndex']),
    keyword: {
      get () {
        return this.$store.state.keyword
      },
      set (keyword) {
        this.$store.commit('SET_KEYWORD', keyword)
      }
    }
  },
  mounted () {
    this.setMaxHeight()
    this.$refs.input.focus()
    document.addEventListener('click', this.hideWhenClickOutside)
    document.addEventListener('keyup', this.hideWhenPressEscape)
    document.addEventListener('keyup', this.navigateBetweenItems)
    document.addEventListener('keyup', this.whenClickEnter)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideWhenClickOutside)
    document.removeEventListener('keyup', this.hideWhenPressEscape)
    document.removeEventListener('keyup', this.navigateBetweenItems)
    document.removeEventListener('keyup', this.whenClickEnter)
  },
  updated () {
    this.setMaxHeight()
  },
  methods: {
    ...mapMutations({
      setHoveredItemIndex: 'SET_HOVERED_ITEM_INDEX'
    }),
    selectItem (item) {
      this.$store.commit('SELECT_ITEM', item)

      if (!this.isMultiple) {
        this.$emit('hide')
      }
    },
    isSelected (item) {
      return this.$store.getters.isSelected(item)
    },
    setMaxHeight () {
      // set max height is from current position to the bottom of the screen
      let elTopPosition = this.$refs.listGroup.getBoundingClientRect().top
      let maxHeight = window.innerHeight - elTopPosition

      console.log({ maxHeight })
      this.$refs.listGroup.style.maxHeight = `${maxHeight}px`
    },
    getItemClasses (item) {
      return {
        'list-group-item-primary': this.isSelected(item),
        'hover': this.$store.getters.isHovered(item)
      }
    },
    hideWhenClickOutside (e) {
      if (!this.container.contains(e.target)) {
        this.$emit('hide')
      }
    },
    hideWhenPressEscape (e) {
      if (e.key === 'Escape') {
        this.$emit('hide')
      }
    },
    whenClickEnter (e) {
      if (e.key === 'Enter') {
        this.selectItem(this.hoveredItem)
      }
    },
    navigateBetweenItems (e) {
      if (e.key === 'ArrowUp') {
        if (this.hoveredItem === null) {
          this.setHoveredItemIndex(this.items.length - 1)
        } else if (this.hoveredItemIndex > 0) {
          this.setHoveredItemIndex(this.hoveredItemIndex - 1)
        }
      } else if (e.key === 'ArrowDown') {
        if (this.hoveredItem === null) {
          this.setHoveredItemIndex(this.items.length ? 0 : null)
        } else if (this.hoveredItemIndex < this.items.length - 1) {
          this.setHoveredItemIndex(this.hoveredItemIndex + 1)
        }
      }
    }
  },
  watch: {
    items (items) {
      // when items are change, set the hovered item to null
      if (this.hoveredItem) {
        this.setHoveredItemIndex(null)
      }
    }
  }
}
</script>


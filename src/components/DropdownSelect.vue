<template>
  <div class="dropdown-select bg-white shadow">
    <div class="p-2">
      <input ref="input" type="text" class="form-control" placeholder="Search" v-model="keyword">
    </div>
    <ul class="list-group mt-0" ref="listGroup">
      <li
        class="list-group-item d-flex flex-row justify-content-between p-2 rounded-0"
        :class="{ 'list-group-item-info': isSelected(item) }"
        v-for="(item, i) of items"
        :key="i"
        @click="selectItem(item)"
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
    ...mapGetters(['items']),
    ...mapState(['isMultiple']),
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
    this.$el.focus()
    document.addEventListener('click', this.hideWhenClickOutside)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.hideWhenClickOutside)
  },
  updated () {
    this.setMaxHeight()
  },
  methods: {
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
    hideWhenClickOutside (e) {
      if (!this.container.contains(e.target)) {
        this.$emit('hide')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dropdown-select {
  position: absolute;
  z-index: 3;
  border: 1px solid rgba(220, 220, 220, 0.8);
  outline: none;
  left: 0;
  right: 0;

  &:focus {
    outline: none;
  }

  ul {
    overflow-y: auto;
    li {
      cursor: pointer;
      border-left: none;
      border-right: none;

      &:not(.list-group-item-info):hover {
        background-color: rgba(200, 200, 200, 0.3);
      }
    }
  }
}
</style>


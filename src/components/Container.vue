<template>
  <div ref="container" class="multiple-select-container">
    <div>
      <span class="badge badge-primary mr-1 mb-2" v-for="item in selectedItems" :key="item.value">
        {{ item.label }} <i @click="selectItem(item)" class="fa fa-times ml-2" style="cursor: pointer"></i>
      </span>
    </div>

    <button class="form-control d-flex justify-content-between" type="button" @click="toggleDropdown">
      {{ buttonText }} <i class="fa" :class="caretClass"></i>
    </button>
    <dropdown-select v-if="dropdownShow" :container="$refs.container" @hide="hidden"></dropdown-select>
  </div>
</template>

<script>
import DropdownSelect from '@/components/DropdownSelect'
import { mapState, mapMutations } from 'vuex';

export default {
  data: () => ({
    dropdownShow: false
  }),
  computed: {
    caretClass () {
      return {
        [this.dropdownShow ? 'fa-caret-up' : 'fa-caret-down']: true
      }
    },
    ...mapState(['options', 'selectedItem', 'selectedItems', 'isMultiple']),
    buttonText () {
      if (this.isMultiple && this.selectedItems.length) {
        if (this.selectedItems.length > 1) {
          return `${this.selectedItems.length} items selected`
        }

        return '1 item selected'
      } else if (!this.isMultiple && this.selectedItem) {
        return this.selectedItem.label
      }

      return this.options.placeholder || 'Select'
    }
  },
  mounted () {
    console.log('Container mounted()')
  },
  methods: {
    toggleDropdown () {
      this.dropdownShow = !this.dropdownShow
    },
    hidden () {
      this.dropdownShow = false
    },
    selectItem (item) {
      this.$store.commit('SELECT_ITEM', item)
      this.hidden()
    }
  },
  components: { DropdownSelect }
}
</script>

<style lang="scss">
  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    i {
      margin-left: 0.5rem;
    }
  }

  .multiple-select-container {
    position: relative;
  }
</style>

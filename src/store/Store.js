import EventEmitter from 'events'

class Store extends EventEmitter {
  
  get isMultiple () {
    return this._isMultiple || false
  }

  set isMultiple (isMultiple) {
    this._isMultiple = isMultiple
  }

  get isOpened () {
    return this._isOpened || false
  }

  set isOpened (isOpened) {
    this._isOpened = isOpened
    this.emit('isOpenedChange', isOpened)
  }

  get items () {
    return this._items || []
  }

  set items (items) {
    this._items = items
    this.emit('itemsChange', items)
  }

  get selectedItems () {
    return this._selectedItems || []
  }

  set selectedItems (selectedItems) {
    this._selectedItems = selectedItems
    this.emit('selectedItemsChange', selectedItems)
  }

  /**
   * Keyword for filtering purpose
   *
   * @memberof Store
   */
  get keyword () {
    return this._keyword || null
  }

  set keyword (keyword) {
    this._keyword = keyword
    this._hoveredItemIndex = null
    this.emit('keywordChange', keyword)
  }

  /**
   * Hovered item. Working by pressing arrow up and down
   *
   * @memberof Store
   */
  get hoveredItemIndex () {
    if (!this._hoveredItemIndex && this._hoveredItemIndex !== 0) {
      return null
    }

    return this._hoveredItemIndex
  }

  set hoveredItemIndex (index) {
    this._hoveredItemIndex = index
    this.emit('hoveredItemIndexChange', index)
  }
}

export default Store
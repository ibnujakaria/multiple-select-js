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
    this.emit('keywordChange', keyword)
  }
}

export default Store
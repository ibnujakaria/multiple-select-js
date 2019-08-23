class SelectButton {
  constructor ({ root }) {
    this.$root = root
    this.render()
  }

  _build () {
    this._button = document.createElement('button')
    this._button.classList.add(
      'form-control', 'd-flex', 'justify-content-between', 'align-items-center'
    )
    this._button.setAttribute('type', 'button')

    let content = document.createElement('span')
    content.setAttribute('class', 'content')
    content.innerText = this.$root.$options.placeholder || 'Select'

    let caret = document.createElement('span')
    caret.classList.add('caret')
    caret.innerHTML = '&#9662;'
    caret.style.fontSize = '70%'

    this._button.addEventListener('click', (e) => {
      this.$root.$store.isOpened = !this.$root.$store.isOpened
    })

    this._button.appendChild(content)
    this._button.appendChild(caret)
  }

  /**
   * Return button dom
   *
   * @readonly
   * @memberof SelectButton
   */
  get el () {
    return this._button
  }

  /**
   * Render button dom. Determining its content and its styling
   */
  render () {
    if (!this._button) {
      this._build()
    }

    let selectedItems = this.$root.$store.selectedItems
    let buttonText = null

    if (this.$root.$store.isMultiple && selectedItems.length) {
      buttonText = `${selectedItems.length} selected`
    } else {
      buttonText = selectedItems.length ?
        selectedItems[0].label : (this.$root.$options.placeholder || 'Select')
    }

    this._button
      .querySelector('span.content')
      .innerText = buttonText

    if (this.$root.$store.isOpened) {
      this._button
        .querySelector('span.caret')
        .innerHTML = '&#9652;'
    } else {
      this._button
        .querySelector('span.caret')
        .innerHTML = '&#9662;'
    }
  }
}

export default SelectButton
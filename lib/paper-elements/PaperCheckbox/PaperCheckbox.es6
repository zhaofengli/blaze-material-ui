class PaperCheckbox extends BlazeComponent {

  /**
   * set defaults
   */
  onCreated () {
    this.focused = new ReactiveVar(false);
    this.pressed = new ReactiveVar(false);
    let checked = this.data().checked;
    let hidden;
    if (!this.data().checked) {
        hidden = 'hidden'
    }
    this.checked = new ReactiveVar(checked);
    this.hidden = new ReactiveVar(hidden);
  }

  /**
   * Handle the click of the checkbox
   */
  handleClick(){
    let checked = this.checked.get()
    if (checked) {
        this.checked.set(false);
        this.hidden.set('hidden');
    } else {
        this.checked.set('checked');
        this.hidden.set(false);
    }
  }

  /**
   * after render
   */
  onRendered () {

    // find the ripples container
    this.ripple = this.componentChildrenWith('rippleElements')[0];
  }

  /**
   * get the focused state of the button
   * @return {Boolean}  Returns the focused state
   */
  getFocused () {
    return this.focused.get();
  }

  /**
   * handle the focus event
   * 1. not focused while pressed
   * 2. elevated
   */
  onFocus () {
    if (!this.pressed.get()) {
      this.focused.set('');
    }
    this.ripple.onDown(event);
  };

  /**
   * handle the blur event
   * 1. not focused
   * 2. not elevated
   */
  onBlur () {
    this.focused.set(false);
  }

  /**
   * handle the mousedown event
   * 1. send event to ripple
   * @param  {Event}
   */
  onDown(event) {
    this.ripple.onDown(event);
  }

  /**
   * handle the mouseup event
   * 1. send event to ripple
   * @param  {Event}
   */
  onUp(event) {
    this.ripple.onUp(event);
  }

  /**
   * @return {Object}  The events
   */
  events() {
    return [{
      'mousedown [data-id=checkboxContainer]': this.onDown,
      'mouseleave [data-id=checkboxContainer]': this.onUp,
      'mouseup [data-id=checkboxContainer]': this.onUp,
      'blur': this.onBlur,
      'focus [data-id=checkboxContainer]': this.onFocus,
      'click': this.handleClick
    }]
  }
}

PaperCheckbox.register('PaperCheckbox');
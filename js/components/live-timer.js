export class LiveTimer extends HTMLElement {
  render() {
    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
        <time-formatted id="time" hour="numeric" minute="numeric" second="numeric" />
        `

    const linkEl = document.createElement('link')
    linkEl.setAttribute('rel', 'stylesheet')
    linkEl.setAttribute('href', 'css/live-timer.css')
    shadow.appendChild(linkEl)
    this.timerEl = shadow.firstElementChild
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
    this.timer = setInterval(() => this.updateDate(), 1000)
  }

  updateDate() {
    this.date = new Date()
    this.timerEl.setAttribute('date-time', this.date)
    this.dispatchEvent(new CustomEvent('tick', { detail: this.date }))
  }

  disconnectedCallback() {
    clearInterval(this.timer)
  }
}

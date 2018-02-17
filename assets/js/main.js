(function (global) {
  var ANALYTICS_URL = '//www.google-analytics.com/ga.js'
  var ADS_URL = '//engine.carbonads.com/z/24598/azcarbon_2_1_0_HORIZ'
  var CODEPEN_URL = '//codepen.io/assets/embed/ei.js'
  var SASSMEISTER_URL = '//static.sassmeister.com/js/embed.js'
  var ANALYTICS_OPTIONS = [
    ['_setAccount','UA-30333387-2'],
    ['_trackPageview']
  ]
  var TOC_SELECTOR = '.article h2[id]'
  var CONTAINER_SELECTOR = '.container'
  var ARTICLE_PAGE_SELECTOR = '.article'
  var TOC_ANCHOR_SELECTOR = '.post-date'

  function $ (selector, context) {
    var nodes = (context || document).querySelectorAll(selector)
    if (!nodes.length) return null
    if (nodes.length === 1) return nodes[0]
    return Array.prototype.slice.call(nodes)
  }

  function isArticlePage () {
    return document.querySelector(ARTICLE_PAGE_SELECTOR)
  }

  function insertAfter(node, anchor) {
    if (anchor && anchor.nextSibling) {
      anchor.parentNode.insertBefore(node, anchor.nextSibling)
    } else {
      anchor.parentNode.appendChild(node)
    }
  }

  function generateHeadingLink (heading) {
    var content = heading.innerText
    var href = '#' + heading.id
    var text = content.substr(0, content.length)

    return '<a href="' + href + '">' + text + '</a>'
  }

  function getToCMarkup () {
    var headings = $(TOC_SELECTOR)

    if (headings.length === 0) {
      return ''
    }

    return '<ol>'
      + '<li>'
      + headings.map(generateHeadingLink).join('</li><li>')
      + '</li>'
      + '</ol>'
  }

  function createToC () {
    var anchor = $(TOC_ANCHOR_SELECTOR),
        nav  = document.createElement('nav'),
        frag = document.createDocumentFragment()

    nav.setAttribute('role', 'navigation')
    nav.innerHTML = getToCMarkup()
    frag.appendChild(nav)

    insertAfter(frag, anchor)
  }

  function loadAnalytics (callback) {
    global._gaq = ANALYTICS_OPTIONS
    loadJS(ANALYTICS_URL, callback)
  }

  function loadAds (callback) {
    loadJS(ADS_URL, callback)
  }

  function loadCodePen (callback) {
    $('.codepen') && loadJS(CODEPEN_URL, callback)
  }

  function loadSassMeister (callback) {
    $('.sassmeister') && loadJS(SASSMEISTER_URL, callback)
  }

  function App (options) {
    var shouldCreateToC = (isArticlePage() && options.createToC) || false

    loadAnalytics()
    loadAds()
    loadSassMeister()
    loadCodePen()

    shouldCreateToC && createToC()
  }

  global.App = App;
}(window));

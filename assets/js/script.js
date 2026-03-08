'use strict'

/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback)
    }
  } else {
    elem.addEventListener(type, callback)
  }
}

/**
 * navbar toggle
 */

const navbar = document.querySelector('[data-navbar]')
const navToggler = document.querySelector('[data-nav-toggler]')
const navLinks = document.querySelectorAll('[data-nav-link]')

const toggleNavbar = () => navbar.classList.toggle('active')

addEventOnElem(navToggler, 'click', toggleNavbar)

const closeNavbar = () => navbar.classList.remove('active')

addEventOnElem(navLinks, 'click', closeNavbar)

/**
 * header & back top btn active when scroll down to 100px
 */

const header = document.querySelector('[data-header]')
const backTopBtn = document.querySelector('[data-back-top-btn]')

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add('active')
    backTopBtn.classList.add('active')
  } else {
    header.classList.remove('active')
    backTopBtn.classList.remove('active')
  }
}

addEventOnElem(window, 'scroll', headerActive)

/**
 * filter function
 */

const filterBtns = document.querySelectorAll('[data-filter-btn]')
const filterItems = document.querySelectorAll('[data-filter]')

let lastClickedFilterBtn = filterBtns[0]

const filter = function () {
  lastClickedFilterBtn.classList.remove('active')
  this.classList.add('active')
  lastClickedFilterBtn = this

  for (let i = 0; i < filterItems.length; i++) {
    if (
      this.dataset.filterBtn === filterItems[i].dataset.filter ||
      this.dataset.filterBtn === 'all'
    ) {
      filterItems[i].style.display = 'block'
      filterItems[i].classList.add('active')
    } else {
      filterItems[i].style.display = 'none'
      filterItems[i].classList.remove('active')
    }
  }
}

addEventOnElem(filterBtns, 'click', filter)

/**
 * section reveal on scroll
 */

const animatedSections = document.querySelectorAll('[data-animate]')

const activateSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
      observer.unobserve(entry.target)
    }
  })
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(activateSection, {
    threshold: 0.12,
    rootMargin: '0px 0px -10% 0px',
  })

  animatedSections.forEach((section) => observer.observe(section))
} else {
  animatedSections.forEach((section) => section.classList.add('in-view'))
}

/**
 * news slider
 */

function initNewsSlider() {
  const newsSlider = document.querySelector('[data-news-slider]')
  if (!newsSlider) return
  const track = newsSlider.querySelector('[data-news-track]')
  const cards = track.querySelectorAll('.blog-card')
  const dotsContainer = document.querySelector('[data-news-dots]')
  let currentIndex = 0
  let autoSlideTimer = null

  function getVisibleCount() {
    if (window.innerWidth >= 768) return 3
    if (window.innerWidth >= 575) return 2
    return 1
  }

  function getTotalPages() {
    const visible = getVisibleCount()
    return Math.max(1, cards.length - visible + 1)
  }

  function buildDots() {
    dotsContainer.innerHTML = ''
    const pages = getTotalPages()
    if (pages <= 1) return
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement('button')
      dot.classList.add('dot')
      dot.setAttribute('aria-label', 'Slide ' + (i + 1))
      if (i === 0) dot.classList.add('active')
      dot.addEventListener('click', () => goToSlide(i))
      dotsContainer.appendChild(dot)
    }
  }

  function goToSlide(index) {
    const pages = getTotalPages()
    if (pages <= 1) {
      index = 0
    }
    currentIndex = index
    const visible = getVisibleCount()
    const gap = 20
    const cardWidth = (track.offsetWidth - gap * (visible - 1)) / visible
    const offset = currentIndex * (cardWidth + gap)
    track.style.transform = 'translateX(-' + offset + 'px)'

    const dots = dotsContainer.querySelectorAll('.dot')
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex)
    })
  }

  function startAutoSlide() {
    stopAutoSlide()
    const pages = getTotalPages()
    if (pages <= 1) return
    autoSlideTimer = setInterval(() => {
      goToSlide((currentIndex + 1) % pages)
    }, 4000)
  }

  function stopAutoSlide() {
    if (autoSlideTimer) clearInterval(autoSlideTimer)
  }

  buildDots()
  startAutoSlide()

  window.addEventListener('resize', () => {
    buildDots()
    goToSlide(0)
    startAutoSlide()
  })
}
window.initNewsSlider = initNewsSlider
initNewsSlider()

/**
 * Footer service links — scroll to pricing and activate the matching filter
 */

const serviceLinks = document.querySelectorAll('[data-service-link]')

serviceLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const category = link.dataset.serviceLink
    const targetBtn = document.querySelector(`[data-filter-btn="${category}"]`)
    if (targetBtn) {
      targetBtn.click()
    }
  })
})

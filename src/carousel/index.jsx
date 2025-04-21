import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'

const OPTIONS = { direction: 'rtl', loop: true }
const SLIDE_COUNT = 27
const SLIDES = [
    'images\carousel photos\viking-winter-epic.jpg',
    'images\carousel photos\roman-epic.jpg',
    'images\carousel photos\rat-embroidery.jpg',
    'images\carousel photos\harald-lantern.jpg',
    'images\carousel photos\gambeson-sleeve.jpg',
    'images\carousel photos\knight-epic.jpg',
    'images\carousel photos\viking-stand-ready.png',
    'images\carousel photos\rus-pants.jpg',
    'images\carousel photos\shield-front-bare.jpg',
    'images\carousel photos\ludwig-attack.jpg',
    'images\carousel photos\harald-menacing.jpg',
    'images\carousel photos\dyed-wool.jpg',
    'images\carousel photos\viking-sitting.jpg',
    'images\carousel photos\roman-waiting.jpg',
    'images\carousel photos\ludwig-guard.jpg',
    'images\carousel photos\knight-proud.jpg',
    'images\carousel photos\coif-unmade.jpg',
    'images\carousel photos\viking-post-with-shield.png',
    'images\carousel photos\shield-rear.jpg',
    'images\carousel photos\lion-embroidery.jpg',
    'images\carousel photos\linen-tunic.jpg',
    'images\carousel photos\knight-sad.jpg',
    'images\carousel photos\coif.jpg',
    'images\carousel photos\viking-contemplate.png',
    'images\carousel photos\roman-contemplate.jpg',
    'images\carousel photos\harald-stare.jpg',
    'images\carousel photos\shield-front.jpg',
]

const App = () => (
  <>
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

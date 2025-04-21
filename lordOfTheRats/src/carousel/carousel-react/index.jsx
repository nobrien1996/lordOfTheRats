import React from 'react'
import ReactDOM from 'react-dom/client'
import EmblaCarousel from './EmblaCarousel'
import '../carousel-css/base.css'
import '../carousel-css/embla.css'
import '../carousel-css/sandbox.css'

const OPTIONS = { direction: 'rtl', loop: true }
const SLIDE_COUNT = 27
const SLIDES = [
    'lordOfTheRats\src\carousel\carousel photos\viking-winter-epic.jpg',
    'lordOfTheRats\src\carousel\carousel photos\rat-embroidery.jpg',
    'lordOfTheRats\src\carousel\carousel photos\harald-lantern.jpg',
    'lordOfTheRats\src\carousel\carousel photos\gambeson-sleeve.jpg',
    'lordOfTheRats\src\carousel\carousel photos\knight-epic.jpg',
    'lordOfTheRats\src\carousel\carousel photos\viking-stand-ready.png',
    'lordOfTheRats\src\carousel\carousel photos\rus-pants.jpg',
    'lordOfTheRats\src\carousel\carousel photos\shield-front-bare.jpg',
    'lordOfTheRats\src\carousel\carousel photos\ludwig-attack.jpg',
    'lordOfTheRats\src\carousel\carousel photos\harald-menacing.jpg',
    'lordOfTheRats\src\carousel\carousel photos\dyed-wool.jpg',
    'lordOfTheRats\src\carousel\carousel photos\viking-sitting.jpg',
    'lordOfTheRats\src\carousel\carousel photos\roman-waiting.jpg',
    'lordOfTheRats\src\carousel\carousel photos\ludwig-guard.jpg',
    'lordOfTheRats\src\carousel\carousel photos\knight-proud.jpg',
    'lordOfTheRats\src\carousel\carousel photos\coif-unmade.jpg',
    'lordOfTheRats\src\carousel\carousel photos\viking-post-with-shield.png',
    'lordOfTheRats\src\carousel\carousel photos\shield-rear.jpg',
    'lordOfTheRats\src\carousel\carousel photos\lion-embroidery.jpg',
    'lordOfTheRats\src\carousel\carousel photos\linen-tunic.jpg',
    'lordOfTheRats\src\carousel\carousel photos\knight-sad.jpg',
    'lordOfTheRats\src\carousel\carousel photos\coif.jpg',
    'lordOfTheRats\src\carousel\carousel photos\viking-contemplate.png',
    'lordOfTheRats\src\carousel\carousel photos\roman-contemplate.jpg',
    'lordOfTheRats\src\carousel\carousel photos\harald-stare.jpg',
    'lordOfTheRats\src\carousel\carousel photos\shield-front.jpg',
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

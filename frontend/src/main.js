import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faHome, faCamera,
         faImages, faBook, faFileAlt,
         faReply, faCheck, faHeart,
         faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faWeibo, faInstagram} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCompass, faHeart as faHeartO} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faGithub, faWeibo, faInstagram, faEnvelope,
            faArrowRight, faHome, faCamera, faImages,
            faBook, faFileAlt, faCompass, faReply, faHeartO,
            faCheck, faHeart, faArrowLeft)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

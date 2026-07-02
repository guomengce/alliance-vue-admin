import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './styles/theme.css';
import './styles/index.css';
import './views/auth/components/auth-form.scss';
import App from './App.vue';
import router from './router';

createApp(App).use(router).use(ElementPlus).mount('#app');

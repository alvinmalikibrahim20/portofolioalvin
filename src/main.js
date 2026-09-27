import { createApp, createSSRApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

const root = document.getElementById('app')
const mount = root.dataset.prerendered ? createSSRApp : createApp
// Static navigation keeps deep links, back/forward, and no-JS visits simple.
mount(App, { path: window.location.pathname }).mount(root)

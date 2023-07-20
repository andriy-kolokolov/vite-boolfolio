import {createRouter, createWebHistory} from "vue-router";
import AppHome from "./pages/AppHome.vue";
import AppMyProjects from "./pages/AppMyProjects.vue";
import AppContactMe from "./pages/AppContactMe.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/contact-me',
            name: 'contact-me',
            component: AppContactMe
        },
        {
            path: '/projects',
            name: 'projects',
            component: AppMyProjects
        },

    ]
});

export { router };
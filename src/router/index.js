import { createWebHistory, createRouter } from 'vue-router';

/* Components */
const users = () => import('/src/components/Users.vue');
const create_update = () => import('/src/components/CreateUpdate.vue');


const routes = [
    {
        path: "",
        component: users
    },
    {
        name: "users",
        path: "/users",
        component: users
    },
    {
        name: "create_update",
        path: "/user/:user",
        component: create_update
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

<template>
    <div id="app">
        <div class="content">
            <aside class="left-sidebar" :class="{'mobile-sidebar' :!showSideBar}">
                <div class="left-sidebar__header">
                    <router-link class="left-sidebar__logo" tag="span" :to="{ name: 'Home'}">
                        <i class="far fa-square fa-2x"></i>
                        <span>LOGO</span>
                    </router-link>
                    <i class="fas fa-times left-sidebar__close" @click="showSideBar = !showSideBar"></i>
                </div>
                <div class="left-sidebar__menu">
                    <router-link :to="{ name: 'Home'}">
                        <i class="fas fa-home"></i>
                        <span>Home</span>
                    </router-link>
                    <router-link :to="{ name: 'Dashboard'}">
                        <i class="fas fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </router-link>
                    <router-link :to="{ name: 'DataTable', params:{'table_name':'SampleTable'}}">
                        <i class="fas fa-table"></i>
                        <span>Datatable</span>
                    </router-link>
                </div>
            </aside>
            <aside class="content-mask" v-if="!showSideBar" @click="showSideBar = !showSideBar">
            </aside>
            <main class="main">
                <div class="main_header">
                    <div class="main__links">
                        <span @click="showSideBar = !showSideBar">
                            <i class="fas fa-bars"></i>
                            <span>{{$route.name}}</span>
                        </span>
                        <span v-for="(name, index) in $route.params" :key="index">/ {{name}}</span>
                    </div>
                </div>
                <div class="main_content">
                    <router-view></router-view>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            showSideBar: true
        };
    }
};
</script>
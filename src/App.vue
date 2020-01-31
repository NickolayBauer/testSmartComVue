<template>
    <div id="app">
        <div class="content">
            <aside class="left-sidebar">
                <div class="left-sidebar__header">
                    <router-link class="left-sidebar__logo" tag="span" :to="{ name: 'Home'}">
                        <i class="far fa-square fa-2x"></i>
                        <span>LOGO</span>
                    </router-link>
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
                    <router-link :to="{ name: 'DataTable', params:{'table_name':'sample table'}}">
                        <i class="fas fa-table"></i>
                        <span>Data_table</span>
                    </router-link>
                </div>
            </aside>
            <main class="main">
                <div class="main_header">
                    <div class="main__links">
                        <router-link :to="{ name: 'Home'}">
                          <i class="fas fa-bars"></i>
                          <span>Home</span>
                        </router-link>
                        <router-link :to="{ name: 'Dashboard'}">Dashboard</router-link>
                        <router-link
                            :to="{ name: 'DataTable', params:{'table_name':'sample table'}}"
                        >Sample data table</router-link>
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
    components: {}
};
</script>
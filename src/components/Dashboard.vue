<template>
    <div>
        <DashGraph class="graph-dash" v-if="getItems.length > 0" :graph="getItems"></DashGraph>
    </div>
</template>
<script>
import DashGraph from "@/components/DashGraph.js";
export default {
    components: {
        DashGraph
    },
    mounted() {
        this.$store.dispatch("getItems");
    },
    computed: {
        getItems() {
            return this.$store.getters.getItems;
        }
    }
};
</script>
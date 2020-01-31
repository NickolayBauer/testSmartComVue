
<template>
    <div>
        <button type="button" class="btn btn-primary mb-2" @click="showModalAdd = true">Add new</button>
        <Modal v-if="showModalAdd" @send="addItem" @close="showModalAdd = false">
            <h3 slot="header">New Item</h3>
        </Modal>
        <Modal v-if="showModalEdit" @send="editItem" @close="showModalEdit = false">
            <h3 slot="header">Edit Item</h3>
        </Modal>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in getItems" :key="item.id">
                    <th scope="row">{{item.id}}</th>
                    <td>{{item.date}}</td>
                    <td>{{item.title}}</td>
                    <td>
                        <button
                            type="button"
                            class="btn btn-primary mr-2"
                            @click="showModalEdit = true, editableItem = item"
                            data-toggle="modal"
                            data-target="#exampleModalCenter"
                        >Edit</button>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="deleteItem(item.id)"
                        >Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Modal from "@/components/Modal";
export default {
    name: "DataTable",
    components: {
        Modal
    },
    data() {
        return {
            showModalAdd: false,
            showModalEdit: false,
            editableItem: {}
        };
    },
    mounted() {
        this.$store.dispatch("getItems");
    },
    methods: {
        addItem(title) {
            let item = {
                date: new Date(),
                title: title
            };
            this.$store.dispatch("addItem", item);
            this.title = "";
            this.showModalAdd = false;
        },
        editItem(title) {
            let item = {
                id: this.editableItem.id,
                date: new Date(),
                title: title
            };
            this.title = "";
            this.editableItem = {};
            this.$store.dispatch("editItem", item);
            this.showModalEdit = false
        },
        deleteItem(item_id) {
            this.$store.dispatch("deleteItem", item_id);
        },
        sortById(items) {
            return items.sort(function(a, b) {
                return a.id - b.id;
            });
        }
    },
    computed: {
        getItems() {
            return this.sortById(this.$store.getters.getItems);
        }
    }
};
</script>
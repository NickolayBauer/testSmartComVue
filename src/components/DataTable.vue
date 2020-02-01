
<template>
    <div>
        <button type="button" class="btn btn-primary mb-2" @click="showModalAdd = true">Add new</button>
        <Modal v-if="showModalAdd" @send="addItem" @close="showModalAdd = false">
            <h3 slot="header">New Item</h3>
        </Modal>
        <Modal v-if="showModalEdit" @send="editItem" @close="showModalEdit = false">
            <h3 slot="header">Edit Item</h3>
        </Modal>
        <div class="table-container">
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
                    <tr v-for="item in pagesOnTable" :key="item.id">
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
        <div class="d-flex justify-content-center mt-3 py-1 pagination">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="el-input">el:</span>
                </div>
                <input
                    v-model="compElemsOnPage"
                    type="number"
                    class="form-control"
                    aria-describedby="el-input"
                />
            </div>
            <div class="col-md-6 col-12 d-flex justify-content-center">
                <div>
                    <button
                        class="btn btn-primary toPage"
                        :disabled="!(toPage-elemsOnPage >= 0)"
                        @click="toPage-=elemsOnPage"
                    >
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <div
                        class="toPage d-inline"
                        v-for="pageNumber in allowedPages"
                        :key="pageNumber"
                    >
                        <button
                            class="btn"
                            :class="[pageNumber == pageElems+1 ? 'btn-info' : 'btn-secondary']"
                            @click="toPage = (elemsOnPage*(pageNumber-1))"
                        >{{pageNumber}}</button>
                    </div>

                    <button
                        class="btn btn-primary toPage"
                        :disabled="toPage+elemsOnPage > getItems.length"
                        @click="toPage+=elemsOnPage"
                    >
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="page-input">page:</span>
                </div>
                <input
                    v-model="compCurPage"
                    type="number"
                    class="form-control"
                    aria-describedby="page-input"
                />
            </div>
        </div>
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
            editableItem: {},
            toPage: 0,
            elemsOnPage: 5,
            numPage: 1
        };
    },
    mounted() {
        this.$store.dispatch("getItems");
    },
    methods: {
        DataTime() {
            let today = new Date();
            let d = `${today.getDate()}/`;
            let mo = `${today.getMonth()}/`;
            let y = `${today.getFullYear()}  `;
            let h = `${today.getHours()}`.padStart(2, "0");
            let mi = `${today.getMinutes()}`.padStart(2, "0");
            let s = `${today.getSeconds()}`.padStart(2, "0");
            return d + mo + y + h + ":" + mi + ":" + s;
        },
        addItem(title) {
            let item = {
                date: this.DataTime(),
                title: title
            };
            this.$store.dispatch("addItem", item);
            this.title = "";
            this.showModalAdd = false;
        },
        editItem(title) {
            let item = {
                id: this.editableItem.id,
                date: this.DataTime(),
                title: title
            };
            this.title = "";
            this.editableItem = {};
            this.$store.dispatch("editItem", item);
            this.showModalEdit = false;
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
        },
        pagesOnTable() {
            return this.getItems.slice(
                this.toPage * this.numPage,
                this.toPage + this.elemsOnPage
            );
        },
        compCurPage: {
            get() {
                return this.pageElems + 1;
            },
            set(data) {
                if (
                    data > 0 &&
                    data <= Math.ceil(this.getItems.length / this.elemsOnPage)
                ) {
                    this.toPage = (data - 1) * this.elemsOnPage;
                }
            }
        },
        compElemsOnPage: {
            get() {
                return this.elemsOnPage;
            },
            set(data) {
                if (data > 0 && data <= this.getItems.length) {
                    this.elemsOnPage = data;
                }
            }
        },
        allowedPages() {
            let allPages = Math.ceil(this.getItems.length / this.elemsOnPage);
            let start = this.pageElems - 1;
            let end = this.pageElems + 3;
            let arr = [];
            for (let i = start; i <= end; i++) {
                if (i <= allPages && i > 0) {
                    arr.push(i);
                }
            }
            return arr;
        },
        pageElems() {
            return Math.floor(this.toPage / this.elemsOnPage);
        }
    }
};
</script>
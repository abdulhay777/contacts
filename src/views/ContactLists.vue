<template>
  <el-table :data="filterContacts" style="width: 100%">
    <el-table-column label="Fullname" prop="fullname" />
    <el-table-column label="Email" prop="email" v-if="window_width >= 500" />
    <el-table-column label="Phone number" prop="phone_number" v-if="window_width >= 1000" />
    <el-table-column label="Tags" prop="tags" v-if="window_width >= 800">
      <template #default="scope">
        <el-tag
          v-for="tag of scope.row.tags"
          type="success"
          disable-transitions
          >{{ tag }}</el-tag
        >
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <div class="filter">
          <el-input v-model="search" placeholder="Type to search" />
        </div>
      </template>
      <template #default="scope">
        <el-button size="small" @click="routerSinglePage(scope.row)">Detail</el-button>
        <el-button
          size="small"
          type="danger"
          @click="showDialog(scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="show_alert"
    width="30%"
    align-center
  >
    <span>You want to delete contact "{{ contact_data.fullname }}"</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="show_alert = false">Cancel</el-button>
        <el-button type="danger" @click.prevent="deleteContact">Delete</el-button>
      </span>
    </template>
  </el-dialog>
  <el-button class="btn_add" type="success" circle @click="show_drawer = true">+</el-button>
  <el-drawer v-model="show_drawer" title="I am the title" :with-header="false">
    <ContactAdd></ContactAdd>
  </el-drawer>
</template>

<script setup>

  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  import ContactAdd from '../components/ContactAdd.vue'

  const search = ref()
  const show_alert = ref(false)
  const show_drawer = ref(false)
  const contact_data = ref()
  const window_width = ref(window.innerWidth)
  const store = useStore()
  const router = useRouter()

  const contacts = computed(() => store.state.contacts)

  const filterContacts = computed(() =>
    contacts.value.filter(
      (data) => !search.value || (
        data.fullname.toLowerCase().includes(search.value.toLowerCase()) || 
        data.email.toLowerCase().includes(search.value.toLowerCase()) ||
        data.phone_number.toLowerCase().includes(search.value.toLowerCase()) || 
        data.tags.find(e => e.toLowerCase().includes(search.value.toLowerCase()))
      )
    )
  )

  window.onresize = () => {
    window_width.value = window.innerWidth
  }

  const showDialog = (row) => {
    show_alert.value = true
    contact_data.value = row
  }
  const deleteContact = () => {
    store.dispatch('DeleteContact', contact_data.value._id)
    contact_data.value = ''
    show_alert.value = false
  }
  const routerSinglePage = (contact) => {
    router.push({ name: 'contact-single', params: { id: contact._id } })
  }

</script>

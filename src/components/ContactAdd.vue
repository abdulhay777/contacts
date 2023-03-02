<template>
  <el-form
    ref="formRef"
    :model="formFields"
    class="demo-dynamic"
  >
    <el-form-item prop="fullname" :rules="text_rule('fullname', 3)">
      <el-input v-model="formFields.fullname" placeholder="Fullname" />
    </el-form-item>
    <el-form-item prop="email" :rules="email_rule" :error="email_error">
      <el-input v-model="formFields.email" placeholder="Email" />
    </el-form-item>
    <el-form-item prop="phone_number" :error="phone_number_error">
      <el-input v-model="formFields.phone_number" placeholder="Phone" @input="acceptNumber" />
    </el-form-item>
    <el-form-item prop="tags">
      <el-select
        v-model="formFields.tags"
        multiple
        filterable
        allow-create
        default-first-option
        :reserve-keyword="false"
        placeholder="Tags"
      >
        <el-option
          v-for="(tag, i) in tags"
          :key="i"
          :label="tag"
          :value="tag"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(formRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>

  import { reactive, ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import { email_rule, text_rule } from '../utils/rules.js'

  const store = useStore()
  const formRef = ref()
  const phone_number_error = ref()
  const email_error = ref()
  let formFields = reactive({
    fullname: '',
    email: '',
    phone_number: '',
    tags: []
  })

  const tags = computed(() => {
    let tag_array = []
    store.state.contacts.forEach(contact => {
      tag_array = tag_array.concat(contact.tags)
    })
    return tag_array.filter(function(a, b) {
      return tag_array.indexOf(a) == b
    })
  })

  const acceptNumber = () => {
    var x = formFields.phone_number.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,4})/);
    formFields.phone_number = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
  }

  const validPhoneNumber = () => {
    var re = /^[\+]?[(]?[0-9]{2}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    return re.test(String(formFields.phone_number).toLowerCase())
  }

  const submitForm = (formEl) => {
    if (!formEl) return
    formEl.validate(async (valid) => {

      phone_number_error.value = ''
      email_error.value = ''

      if (!validPhoneNumber()) return phone_number_error.value = 'No valid'
      if (await store.dispatch('CheckPhone', formFields)) return phone_number_error.value = 'This phone already exists'
      if (await store.dispatch('CheckEmail', formFields)) return email_error.value = 'This email already exists'

      if (valid) {
        store.dispatch('AddContact', formFields)
        formFields = {
          fullname: '',
          email: '',
          phone_number: '',
          tags: []
        }
      } else {
        console.log('error submit!')
        return false
      }
    })
  }

</script>

<template>
  <el-table :data="productTable" style="width: 100%">
    <el-table-column>
      <template #default>
        <el-checkbox v-model="checked">For Sale</el-checkbox>
      </template>
    </el-table-column>
    <el-table-column fixed prop="product" label="Product" width="150" />
    <el-table-column>
      <template #default >
        <el-input-number v-model="price" @change="handleChange" ></el-input-number>
      </template>
    </el-table-column>
  </el-table>
</template>

<script >
export default {
  data() {
    return {
      price: 10,
      productTable: [
        {
          checked: 'true',
          product: 'apple',
          price: '20',
        },
        {
          checked: 'true',
          product: 'orange',
          price: '25',
        },
        {
          checked: 'true',
          product: 'banna',
          price: '40',
        },
        {
          checked: 'true',
          product: 'dick',
          price: '1999'
        },
      ],
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    },
  },
}
</script>
<style lang="">
  
</style>
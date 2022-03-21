<template>
  <div class="n_table">
    <el-table :data="data" border style="width: 100%">
      <el-table-column 
        v-for="item in columns"
        :prop="item.key"
        :label="item.label"
        :width="item.width"
      />
    </el-table>
  </div>
</template>

<script>
export default ({
  props: {
    columns: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="less">
.n_table {
  width: 100%;
}
</style>
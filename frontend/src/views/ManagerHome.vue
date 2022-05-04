<template lang="">
    <div>
        <el-header style="font-size: 30px; text-align: left">
        <ManagerHeader></ManagerHeader>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </div>
</template>
<script>
import ManagerHeader from '../components/ManagerHeader.vue'
export default {
    components :{
        ManagerHeader
    }
}
</script>
<style lang="">
    
</style>
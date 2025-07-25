<template>
    <div class="tags">
        <el-tag
            v-for="(tag,index) in tags"
            :key="tag.name"
            :closable="tag.name !=='home'"
            :effect="route.name===tag.name?'dark':'plain'"
            @click="handleMenu(tag)"
            @close="handleClose(tag,index)"
        >
        {{ tag.label }}
        </el-tag>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import{useRoute, useRouter} from 'vue-router'
import{useAllDataStore} from '@/stores'
const store=useAllDataStore()
const tags=computed(()=>store.state.tags)
const route=useRoute()
const router=useRouter()
const handleMenu=(tag)=>{//标签跳转
    router.push(tag.name)
    //store.addTag(tag)//没用
}
const handleClose=(tag,index)=>{
    //通过pinia管理的
    store.undateTags(tag)
    
    if(tag.name!==route.name) return//如果点击关闭的tag不是对应的当前页面,就不用执行下面的

    if(index==store.state.tags.length){//是最后一个被关闭就跳到前一个，否则跳到自己后面的
        store.addTag(tags.value[index-1])
        router.push(tags.value[index-1].name)
    }else{
        store.addTag(tags.value[index])
        router.push(tags.value[index].name)
    }
}
</script>
       
<style lang="less" scoped>
.tags{
    margin: 20px 0 0 20px;
}
.el-tag{
    margin-right: 10px;
}
</style>
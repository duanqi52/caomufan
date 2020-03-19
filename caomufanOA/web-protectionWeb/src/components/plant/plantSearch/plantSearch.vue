<template>
  <div class="showListDataBox">
    <el-scrollbar style="height: 100%">
      <div class="searchListShow">
        <div v-for="(item,index) in searchList" :key="index" class="searchItem"  @click="getSearchDetail(item.plantID)">
          <div class="searchImg">
            <img v-if="item.img!=''&&item.img!=undefined" :src="item.img" alt="图片">
            <img v-else src="@/assets/img/other/bird_Rectangle.png" alt="">
          </div>
          <div class="searchDataShow">
            <div class="searchItemName" :title="item.plantName">{{item.plantName}}</div>
            <div class="searchItemEnName" :title="item.scientificName">{{item.scientificName}}</div>
            <div class="searchItemText" :title="item.anotherName">{{item.anotherName}}</div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
    import {postPlantSearch} from '@/api/components/plant/plantSearch.js'
    export default {
        name: "plantSearch",
        props:{
            searchVal:{
                type: String,
                default:''
            },
            unitID:{
                type: String,
                default:''
            }
        },
        data(){
            return{
                dataId:1,
                searchShowStatus:false,
                searchList:[]
            }
        },
        created() {

        },
        mounted() {
            // console.log(this.searchVal)
        },
        methods:{
            // 获取搜索数据
          getShowList()
          {
              var that=this
              postPlantSearch(
                  {
                      unitID:that.unitID,
                      KeyWord:that.searchVal
                  }
              ).then(res=>{
                  that.searchList=res.result
              })
          },
            // 获取详情
            getSearchDetail(id)
            {
                var that=this
                that.dataId=id
              this.$emit('searchShowStatus',{
                  id:this.dataId,
                  searchShowStatus:this.searchShowStatus,
                  pageStatus:2,
                  returnPageStatus:2
              })
            }
        }

    }
</script>

<style scoped lang="scss">
  @import "./plantSearch.scss";

</style>

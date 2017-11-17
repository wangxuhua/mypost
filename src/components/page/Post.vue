<template>
  <div class="post-box">
    <el-row>
      <!--点单区域总区域-->
      <el-col :span="7" class="post-goods" id="goods-list">
        <el-tabs>
          <!--点餐区域-->
          <el-tab-pane label="点餐">
            <el-table border style="width: 100%" :data="tableData">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="70"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click = "removeonegoods(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addgoods(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--点击按钮区域-->
            <div class="btnlist">
              <el-button type="info">挂单</el-button>
              <el-button type="warning" @click="removeallgoods">删除</el-button>
              <el-button type="danger" @click="jiezhang">结账</el-button>
            </div>
            <!--计算点餐商品的数量和金额-->
            <div>
                <span>商品数量：{{goodsnumber}}</span>
                <span>商品总价格：{{goodsprice}}</span>
            </div>
          </el-tab-pane>
          <!--挂单区域-->
          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <!--外卖区域-->
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <!--常用商品总区域-->
      <el-col :span="16">
        <!--常用商品-->
        <div class="need-goods">
          <p>常用商品</p>
          <div class="need-goods-main">
            <ul>
              <li v-for="item in needgoods" :key="item.id" @click="addgoods(item)">
                <span>{{item.goodsName}}</span>
                <span class="price">￥{{item.price}}元</span>
              </li>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
        <!--商品分类-->
        <div class="goods-feilei">
          <div>
            <el-tabs>
              <el-tab-pane label="汉堡" name="first">
                 <div>
                   <ul>
                     <li v-for="item in goodsfeielei1" :key="item.goodsId" @click="addgoods(item)">
                       <div class="shangpinjieshao">
                         <img :src="item.goodsImg" alt="">
                         <span>{{item.goodsName}}</span>
                         <span class="price">￥{{item.price}}元</span>
                       </div>
                     </li>
                   </ul>
                 </div>
              </el-tab-pane>
              <el-tab-pane label="饮料" name="second">
                <div>
                  <ul>
                    <li v-for="item in goodsfeielei2" :key="item.goodsId" @click="addgoods(item)">
                      <div class="shangpinjieshao">
                        <img :src="item.goodsImg" alt="">
                        <span>{{item.goodsName}}</span>
                        <span class="price">￥{{item.price}}元</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="零食" name="third">
                <div>
                  <ul>
                    <li v-for="item in goodsfeielei3" :key="item.goodsId" @click="addgoods(item)">
                      <div class="shangpinjieshao">
                        <img :src="item.goodsImg" alt="">
                        <span>{{item.goodsName}}</span>
                        <span class="price">￥{{item.price}}元</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
              <el-tab-pane label="套餐" name="fourth">
                <div>
                  <ul>
                    <li v-for="item in goodsfeielei4" :key="item.goodsId" @click="addgoods(item)">
                      <div class="shangpinjieshao">
                        <img :src="item.goodsImg" alt="">
                        <span>{{item.goodsName}}</span>
                        <span class="price">￥{{item.price}}元</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//  <!--引入axios-->
import axios from "axios"
  export default {
    name: "pos",
//    存放数据
    data() {
      return {
//        放置点餐商品数据
        tableData: [],
//        放置常用商品数据
        needgoods: [],
//        放置商品分类数据
        goodsfeielei1:[],
        goodsfeielei2:[],
        goodsfeielei3:[],
        goodsfeielei4:[],
//       点餐商品总数量
        goodsnumber:0,
//       点餐商品总价格
        goodsprice:0
      }
    },
//    获取数据
    created:function(){
//      获取常用商品数据
      axios.get("http://jspang.com/DemoApi/oftenGoods.php").then(res=>{
         this.needgoods = res.data;
      })
//      获取商品分类数据
      axios.get("http://jspang.com/DemoApi/typeGoods.php").then(res=>{
        this.goodsfeielei1 = res.data[0];
        this.goodsfeielei2 = res.data[1];
        this.goodsfeielei3 = res.data[2];
        this.goodsfeielei4 = res.data[3];
      })
    },
//    设置样式
    mounted: function () {
      var height = document.body.clientHeight;
      document.getElementById("goods-list").style.height = height + "px";
    },
//    设置方法
    methods:{
//       添加商品事件
      addgoods:function(goods){
        this.goodsnumber=0;
        this.goodsprice=0;
        let bool = false;
          //    判断订单列表是否有商品
        for(var i = 0;i < this.tableData.length;i++){
            if(this.tableData[i].goodsId == goods.goodsId){
               bool = true;
            }
        }
          //    根据判断写逻辑代码
        if(bool){
           let arr = this.tableData.filter(o=>o.goodsId == goods.goodsId);
           arr[0].count++;
//          this.tableData[0].count++;
        }else{
           let newgoos = {
             goodsId:goods.goodsId,
             goodsName:goods.goodsName,
             price:goods.price,
             count:1
           }
           this.tableData.push(newgoos)
        };
       //   循环点餐数据，获取商品总数和价格
       this.tableData.forEach(item=>{
         this.goodsnumber += item.count;
         this.goodsprice = this.goodsprice+ (item.count*item.price)
       })
      },
//      删除单个商品事件
      removeonegoods(goods){
        this.goodsnumber=0;
        this.goodsprice=0;
        for(var i = 0; i <this.tableData.length;i++){
           if(goods.goodsId == this.tableData[i].goodsId) {
             this.tableData.splice(i, 1)
           }
        }
        //   循环点餐数据，获取商品总数和价格
        this.tableData.forEach(item=>{
          this.goodsnumber += item.count;
          this.goodsprice = this.goodsprice+ (item.count*item.price)
        })
      },
//      删除全部商品事件
      removeallgoods(){
        this.goodsnumber = 0;
        this.goodsprice = 0;
        this.tableData = [];
      },
//      点击结账事件
      jiezhang(){
        if(this.goodsnumber){
          this.goodsnumber = 0;
          this.goodsprice = 0;
          this.tableData = [];
          this.$message({
            message:"结账成功",
            type:"success"
          })
        }else{
          this.$message.error("不能空姐")
        }
      }
    }
  }
</script>

<style>
 .clear{
   clear:both
 }
  /*.clearfix:after,.clearfix:before {*/
    /*　　　　　　content: "";*/
    /*　　　　　　height: 0;*/
    /*　　　　　　line-height: 0;*/
    /*　　　　　　display: block;*/
    /*　　　　　　visibility: hidden;*/
    /*　　　　　　clear: both 　　　　　*/
  /*}*/

  .post-box {
    width: 95%;
    text-align: center;
  }

  .post-goods {
    border-right: 1px solid #ccc;
    text-align: center;
    box-sizing: border-box;
  }

  .btnlist {
    margin-top: 10px;
  }

  .need-goods {
    background-color: azure;
  }
  ul li {
    list-style: none;
  }

  .need-goods p {
    font-size: 20px;
    background-color: #fff;
    text-align: left;
    padding-left: 5px;
    border-bottom: 1px solid #000;
    color: brown;
  }

  .need-goods ul {
    margin-top: 10px;
    width: 100%;
  }

  .need-goods li {
    float: left;
    padding: 5px;
    height: 30px;
    background-color: #ccc;
    line-height: 30px;
    border-radius: 5px;
    margin: 5px;
  }

  .need-goods li .price {
    color: red;
  }
  .goods-feilei{
    border-top: 1px solid red;
  }
 .goods-feilei li{
   float: left;
   border: 1px solid red;
   margin: 20px;
 }
 .shangpinjieshao{

 }
 .shangpinjieshao img{
     float: left;
   width: 50px;
   height: 50px;
  }
 .shangpinjieshao span{
   float: left;
 }
 .shangpinjieshao .price{
   margin-top: 20px;
   margin-left: -50px;
 }
</style>


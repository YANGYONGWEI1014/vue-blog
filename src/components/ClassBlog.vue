<template>
    <el-container>
        <!-- 头部 -->
        <!-- <BlogHeader></BlogHeader> -->
        <el-container>
            <!-- 左侧边栏 -->
            <Sidebar></Sidebar>
            <el-container>
            <!-- 内容 -->
            <el-main id="content">
                <el-tabs type="border-card" >
                    <el-tab-pane label="分类管理" >
                        <form action="">
                            <label for="">名称：</label>
                            <el-input v-model="input"  class="class-top" placeholder="请输入名称"></el-input>
                            <el-button type="primary">搜索</el-button>
                            <el-button type="success">重置</el-button>
                        </form>
                    <!-- 表单 -->
                        <el-table
                            :data="tableData"
                            style="width: 100%"
                            :row-class-name="tableRowClassName">
                            <el-table-column
                                type="selection"
                                width="75">
                            </el-table-column>
                            <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="名称"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="description"
                            label="描述"
                            width="180">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态"
                             width="170">
                            </el-table-column>
                            <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                size="mini"
                                type="success"
                                @click="handleDelete(scope.$index, scope.row)">隐藏</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                      <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            @prev-click="handlePrevClick"
                            @next-click="handleNextClick"
                            :current-page="page"
                            :page-size="pagesize"
                            layout="total, prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane label="分类添加" class="class-blog">
                        <form action="">                
                            <label for="">上级分类：</label>
                            <el-select v-model="value" class="class-add" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select><br>
                            <label for="">类别名称：</label>
                            <el-input v-model="input1" class="class-add" placeholder="请输入名称"></el-input><br>
                            <label for="">是否开启：</label>
                            <el-switch
                                v-model="value2"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch><br>
                            <label for="">描述：</label>
                                 <quill-editor
                                    class="editor"
                                    v-model="content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)"
                                ></quill-editor>
                            <el-row>
                                <el-button type="primary">提交</el-button>
                                <el-button type="info">取消</el-button>
                            </el-row>
                        </form>
                    </el-tab-pane>
                </el-tabs>
                <!-- 搜索 -->
            </el-main>
        </el-container>
    </el-container>
    <!-- 底部 -->
    <el-footer>Footer</el-footer>
    </el-container>
</template>
<script>
import Sidebar from '@/components/Sidebar'
export default {
    components : {
        Sidebar
    },
    data(){
        return{
            page: 1, //分页页数
            pagesize: 10, // 每页条数
            total:36,
            input:"",//标题
            time:"",//日期
            //类别
            options: [{
                value: '选项1',
                label: '黄金糕'
            }],
            //表单
            tableData: [{
            date: '2016-05-02',
            name: 'PHP',
            description: '编程语言',
            status:'启用'
            }, {
            date: '2016-05-04',
            name: 'Ubuntu',
            description: '系统',
            status:'启用'
            }, {
            date: '2016-05-01',
            name: 'Laravel',
            description: '框架',
            status:'启用'
            }, {
            date: '2016-05-03',
            name: 'Mysql',
            description: '数据库',
            status:'启用'
            }],
            //添加
            input1:'',
            value1: true,
            value2: true,//是否开启
            //富文本编辑器
            content:null,
            editorOption:{}
            };
        },
    methods:{
        tableRowClassName({row, rowIndex}) {
       if (rowIndex %4 === 0) {
          return 'warning-row';
        } else if (rowIndex %4 === 1) {
          return 'danger-row';
        }else if (rowIndex %4 === 2){
          return 'success-row'
        }
        return '';
        },
        //添加
        // 文件上传
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm('确定移除 ${ file.name }？');
        },
        // 标签
        handleDel(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
            this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    }
}
</script>

<style sopsed>
.el-main{
    padding: 0;
}
#content{
    color:#303133;
    position: relative;
}
#pane-0 {
    height:730px;
    background: none;
}
.el-tabs--border-card{
    background: none;
}

.class-top {
     width: 200px;
     margin-right: 20px;
     margin-bottom: 25px;
 }
.el-table{
    margin-top: 0px;
}
.el-table .warning-row {
background: oldlace;
}
.el-table .success-row {
background: #f0f9eb;
}

.cell{
    text-align: center;
}
.el-main{
    position:relative;
}
.el-pagination{
    position:absolute;
    bottom: 20px;
    margin-left: 700px;
}
/* 添加 */
.class-blog{
  padding: 10px 20px 20px 20px;
  height: 700px;
  color:#303133;
  position: relative;
}
.class-blog label{
    display:inline-block;
    width: 80px;
    text-align: right;
    margin: 20px 0 0 -25px;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
.class-add {
     width: 300px;
     margin: 20px 0 0 0;
 }

 /* 中心模块 */
 .el-main {
    max-width:"820px";
    color: #333;
  }
#pane-1{
    height: 760px;
    background: none;
    margin-left: 30px;
}
 /* 附件 */
 .upload-demo{
    position: relative;
    display: inline-block;
    width: 800px;
    margin-top: 20px;
 }
 div .el-upload__tip{
     display: inline-block;
     margin-left:20px;
 }
/* 标签 */
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
 /* 按钮 */
 .el-row{
     width: 500px;
     left: 50px;
     bottom: -260px; 
 }
/* .el-footer {
    border: 1px dotted #aaa;
    color: #333;
    text-align: center;
    line-height: 150px;
  } */

</style>

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
                    <el-tab-pane label="文章管理" >
                        <form :model="formFilter">
                            <label for="">标题：</label>
                            <el-input v-model="formFilter.title" class="top" placeholder="请输入标题"  clearable></el-input>
                            <label for="">类别：</label>
                             <el-select v-model="formFilter.category_id"  placeholder="请选择" class="top" clearable>
                               <el-option label="未发布"></el-option>
                            </el-select>
                            <label for="">时间：</label>
                            <el-date-picker
                                v-model="formFilter.time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                            <el-button 
                            class="but"
                            size="medium"
                            @click="handleClick(formFilter)"
                            type="primary">搜索</el-button>
                        </form>
                        <!-- 表单 -->
                        <div style="margin:-20px 0 5px 928px;">                            
                            <el-button 
                            size="small"
                            type="danger"
                            @click="toggleSelection([article[1], article[2]])">
                            <i class="el-icon-minus"></i>
                            <span>批量删除</span>
                            </el-button>
                        </div>
                        <el-table
                            ref="multipleTable"
                            :data="article"
                            tooltip-effect="dark"
                            style="width: 100%"
                            :row-class-name="tableRowClassName"
                            @selection-change="handleSelectionChange">
                             <el-table-column
                                type="selection"
                                width="65">
                            </el-table-column>
                            <el-table-column 
                            prop="c_time"
                            label="日期"
                            width="160">
                            </el-table-column>
                            <el-table-column prop="title" label="标题" width="180">
                                <template slot-scope="scope">
                                    {{scope.row.title|snippet}}
                                </template>
                            </el-table-column>
                             <el-table-column
                            prop="category"
                            label="类别"
                            width="140">
                            </el-table-column>
                            <el-table-column
                            prop="status"
                            label="状态"
                            width="70">
                            </el-table-column>
                            <el-table-column
                            prop="is_top"
                            label="是否置顶"
                            width="90">
                            </el-table-column>
                            <el-table-column
                            prop="click_time"
                            label="浏览量"
                            width="70">
                            </el-table-column>
                            <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                @click="dialogFormVisible = true" >编辑</el-button>
                                <el-button
                                size="mini"
                                type="success"
                                @click="handleTop(scope.$index, scope.row)">置顶</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handledelete(scope.$index, scope.row)">删除</el-button>                               
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
                    <el-tab-pane label="添加文章" class="add-blog">
                       <form  :model="form">
                            <label>标题：</label>
                            <el-input v-model="form.title" class="add-top" placeholder="请输入标题"></el-input><br>
                            <label>类别：</label>
                           <el-select v-model="form.class" clearable placeholder="请选择">
                            <el-option ></el-option>
                            </el-select><br>
                            <label>是否置顶：</label>
                            <el-switch
                                v-model="form.isTop"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch><br>
                            <label>缩略图：</label>
                            <el-upload
                            class="thumbnail"
                            :action="imgAction"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handlePictureSuccess"
                            :on-exceed="handleExceed"
                            :before-upload="beforePictureUpload">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog> <br>
                            <label>定时发送：</label>
                            <el-date-picker
                                v-model="form.time"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker><br>
                            <label>标签：</label>
                           <el-tag
                                :key="tag"
                                v-for="tag in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @close="handleClose(tag)">
                                {{tag}}
                                </el-tag>
                                <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="form.label"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                                >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button><br>
                            <label>内容：</label>
                                <quill-editor
                                    class="editor"
                                    v-model="form.content"
                                    ref="myQuillEditor"
                                    :options="editorOption"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @change="onEditorChange($event)"
                                ></quill-editor>
                            <el-row>
                                <el-button type="primary" @click="save">发布</el-button>
                                <el-button type="info">取消</el-button>
                            </el-row>
                        </form>  
                    </el-tab-pane>
                        <el-dialog title="编辑文章" :visible.sync="dialogFormVisible" class="ups"> 
                        <el-form :model="form">
                            <label>标题：</label>
                            <el-input v-model="upd.title" class="add-top" placeholder="请输入标题" clearable></el-input><br>
                            <label>类别：</label>
                            <el-select v-model="upd.class" class="add-top" placeholder="请选择">
                                <el-option></el-option>
                            </el-select><br>
                             <label for="">是否置顶：</label>
                            <el-switch
                                v-model="upd.isTop"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch><br>
                            <label for="">附件：</label>
                            <el-upload
                                class="upload-ups"
                                action="#"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">上传文件，且不超过2M</div>
                            </el-upload><br>
                            <label for="">定时发送：</label>
                            <el-date-picker
                                class="add-top"
                                v-model="upd.time"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker><br>
                             <label for="" >标签：</label>
                            <el-tag
                            :key="tag"
                            v-for="tag in dynamicTags"
                            closable
                            :disable-transitions="false"
                            @close="handleClose(tag)">
                            {{tag}}
                            </el-tag>
                            <el-input
                            class="input-new-tag"
                            v-if="inputVisible"
                            v-model="upd.label"
                            ref="saveTagInput"
                            size="small"
                            @keyup.enter.native="handleInputConfirm"
                            @blur="handleInputConfirm"
                            >
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            <br>
                            <label for="">内容：</label>
                                <quill-editor
                                    class="editor"
                                    v-model="upd.content"
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
                            </el-form-item> 
                        </el-form>       
                    </el-dialog>              
                </el-tabs>              
            </el-main>
        </el-container>
    </el-container>
    <!-- 底部 -->
    <el-footer height="150px" class="footer">Footer</el-footer>
    </el-container>
</template>
<script>

import Sidebar from '@/components/Sidebar'
import{
    getArticleList,
    addArticleSave,
    ArticleImage} from '@/api/article'
export default {
    components : {
        Sidebar
    },
    data(){
        return{ 
            //表单列表
            article:[],
            imgAction: process.env.BASE_API +'/api/admin/upload', // 附件上传地址
             //分页
            page: 1, //分页页数
            pagesize: 10, // 每页条数
            total:this.total,
            //缩略图
            fileList: [{ name: '', url: '' }],
            //图片列表
            fileList: [],
            dialogVisible: false,
            formFilter: {
                title: null,
                category_id: null,
                time: null
            },
            editorOption: {},
            // 添加
            form:{
                title:'',
                class:'',
                isTop:true,
                time:'',
                label:'',
                thumbnail: '',
                content:''

            },        
            //编辑
            dialogFormVisible: false, //弹窗状态默认关闭
           upd:{
               time:'',
               class:'',
               title:'',
               isTop:true,
               label:''
           },
            dynamicTags: ['标签一', '标签二', '标签三'],
            inputVisible: false,
            };
        },
    created(){
        this.getArticle();
    },
    filters: {
        snippet: function(value) {
            return value.slice(0, 10) + "...";
        }
    },
    methods:{
        //表单背景色
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
        //复选框
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /*
        *  富文本相关
        */
        handleRemove(file, fileList) {
        console.log(file, fileList)
        },
        handlePreview(file) {
        console.log(file)
        },
        // 富文本图片上传
        uploadSuccess(res, file, fileList) {
            this.editor_image_path = res.data.imgUrl
            this.showImage('myQuillEditor')
        },
        uploadImage() {
        const img = document.getElementById('uploadImage')
        img.click()
        },
      
        //搜索
        handleClick(formFilter) {
             if (formFilter.time) {
                var sdate = formFilter.time[0]
                var d = new Date(sdate)
                var resStartDate =
                d.getFullYear() +
                '-' +
                (d.getMonth() + 1) +
                '-' +
                d.getDate() +
                ' ' +
                d.getHours() +
                ':' +
                d.getMinutes() +
                ':' +
                d.getSeconds()
                var edate = formFilter.time[1]
                var e = new Date(edate)
                var resEndDate =
                e.getFullYear() +
                '-' +
                (e.getMonth() + 1) +
                '-' +
                e.getDate() +
                ' ' +
                e.getHours() +
                ':' +
                e.getMinutes() +
                ':' +
                e.getSeconds() 
                }
                console.log(resStartDate, resEndDate, '打印筛选时间')
                const param = {
                    page:this.page,
                    pagesize:this.pagesize,
                    title: formFilter.title,
                    start: resStartDate,
                    end: resEndDate,
                    category_id:formFilter.category_id
                }
                getArticleList(param).then(res => {
                    this.total = res.data.total
                    this.article = res.data.data
                    console.log(res.data.data)       
                })
           
         },
           //图片上传
       handlePictureRemove(file, fileList) {
        console.log(file, fileList);
        },
        handleExceed(files, fileList) {
            this.$message({
                message: '只能上传一张图片',
                type: 'info',
                time: 1500,
                showClose: true
            })
        },
        handlePictureSuccess: function(res, file, fileList) {
        // 图片上传
        // this.courseMsg.banner = res.data.imgUrl
        // this.courseMsg.thumbnail = res.data.thumbnail
        console.log( 'photorrrrrrrrreeeeeeeeeesssssss')
        console.log(this.thumbnail)
        },
        //限制图片大小
        beforePictureUpload: function(imgFile) {
        // 图片大小校验
        const isJPG = !!(
            imgFile.type === 'image/jpeg' || imgFile.type === 'image/png'
        )
        const isLt2M = imgFile.size / 1024 / 1024 < 2
        if (!isJPG) {
            this.$message.error('上传的图片只能是JPG或PNG格式！')
        }
        if (!isLt2M) {
            this.$message.error('上传的图片大小不能超过2M！')
        }
        return isJPG && isLt2M
        },
        //图片地址
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //列表
        getArticle() {
            const param = {
                page:this.page,
                pagesize:this.pagesize,
            }
            getArticleList(param).then(res => {
                this.article = res.data.data
                this.total = res.data.total
                // console.log(res.data.total)
            })
        },
        //分页
        handleCurrentChange(val) {
            this.page = val
            console.log(this.page)
            this.getArticle()
        },
        handlePrevClick(val) {
            this.page = val
            this.getArticle()
        },
        handleNextClick(val) {
            this.page = val
            this.getArticle()
        },
       //添加
        save(){
            if (this.form.time) {
             var d = new Date(this.form.time)
                var timing =
                d.getFullYear() +
                '-' +
                (d.getMonth() + 1) +
                '-' +
                d.getDate() +
                ' ' +
                d.getHours() +
                ':' +
                d.getMinutes() +
                ':' +
                d.getSeconds()
            }
            console.log(this.form.title)
            console.log(this.form.isTop)
            console.log(timing)
            console.log(this.form.content)
            console.log(this.form.thumbnail)
            // const param = {
            //     title: this.form.title,
            //     c_time:timing,
            //     is_top:this.form.isTop,
            //     content:this.form.content,
            //     thumbnail:this.form.thumbnail
            // }
            // addArticleSave(param).then(res => {
            //     this.$message({
            //         message: '发布成功',
            //         type: 'success',
            //     });
            //     this.form={brand_right:0}
            // })
           
        },
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
        // 删除数据
        handledelete(tag) {
            // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 删除标签
        handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let label = this.label;
        if (label) {
          this.dynamicTags.push(label);
        }
        this.inputVisible = false;
        this.label = '';
      }
    }
}
</script>

<style sopsed>
.el-main{
    padding: 0;
}
#content{
    margin-left: 10px;
    color:#303133;
    position: relative;
    /* width: 1200px; */
}
#pane-0 {
    height: 720px;  
    background: none;
}
.el-table__body{
    overflow:auto;
}
.el-tabs--border-card{
    background: none;
}
.top {
     width: 180px;
     margin-right: 20px;
     margin-bottom: 25px;
     position: relative;
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
.but{
    margin-left: 10px;
}
.el-pagination{
    position:absolute;
    bottom:0px;
    height: 50px;
    margin-left:700px;
}
/* 添加 */
.add-blog{
  padding: 10px 20px 20px 20px;
  height: 750px;
  color:#303133;
  position: relative;
}
.add-blog label{
    display:inline-block;
    width: 80px;
    text-align: right;
    margin: 20px 0 0 -25px;
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
}
/* 缩略图 */
.thumbnail{
    margin:-20px 0 -20px 60px;
    display:block;
    position: relative;
}
.el-upload-list--picture-card .el-upload-list__item-status-label{
    position: absolute;
    right: -15px;
    top: -26px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
}
.add-top {
     width: 300px;
     margin-top: 20px;
 }

 /* 中心模块 */
 .el-main {
    max-width:"820px";
    color: #333;
  }
#pane-1{
    height: 800px;
    background: none;
    margin:-10px 0 0 30px;
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
 /* 弹窗 */
 .ups{
   margin-top: -100px;
 }
 .el-dialog{
     width: 800px;
 }
 .el-form{
    margin:-30px 0 0 30px;
    height: 650px;
    color:#303133;
    position: relative;
 }
 .el-form label{
    display:inline-block;
    width: 80px;
    text-align: right;
    margin: 20px 0 0 -25px;
}
.upload-ups{
    display: inline-block;
    margin-top: 20px;
}
/*富文本*/
.editor {
  position: absolute;
  display: inline-block;
  margin-top: 20px;
  height: 200px;
  width: 650px;
}
/* 底部 */
.el-footer {
    /* border: 1px dotted #aaa; */
    color: #333;
    text-align: center;
    line-height: 150px;
  }

</style>

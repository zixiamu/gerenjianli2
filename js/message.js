!function(){
    var view = document.querySelector('section.message')

    var model = {
        //获取数据
        init(){
            var APP_ID = 'rKc40jWLGAgrirwvIv4RQs0B-gzGzoHsz';
            var APP_KEY = 'l2PpHJVWJRgKcXyS67gECWQ4';
            
            AV.init({
              appId: APP_ID,
              appKey: APP_KEY
            });
        },
        fetch:function(){
            var query = new AV.Query('Message');
            return query.find()//Promise对象
        },
        save:function(name,content){
            //创建数据
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({ //promise对象
                'name':name,
                'content': content
              })
        }
    }

    var controller ={
        view:null,
        messageList:null,
        model:null,
        init:function(view){
            this.view =view
            this.messageList=view.querySelector('#messageList')
            this.form =view.querySelector('form')
            this.model=model
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        
        loadMessages:function(){
            this.model.fetch().then( (messages)=> {
                let array = messages.map((item)=>item.attributes)
                array.forEach((item)=>{
                    let li =document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.appendChild(li)
                })
            })
        },
        bindEvents:function(){
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault()
               this.saveMessage()
            })
        },
        saveMessage:function(){
            let myForm=this.form
            let content=myForm.querySelector('input[name=content]').value
            let name=myForm.querySelector('input[name=name]').value
            this.model.save(name,content).then(function(object) {
                let li =document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                myForm.querySelector('input[name=content]').value=''
                console.log(object)
              })
        }
    }
   
    
   controller.init(view)
    
    

}.call()




/*
//创建TestObject表
var jun = AV.Object.extend('jun');
//在表中创建一行数据
var testObject = new jun();
//数据内容是words:'Hello Word!'保存
//如果保存成功，则运行alert('')
testObject.save({
  words: 'Hello World!'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
*/
 const fs = require('fs');
 const os = require('os');

 class Document{

  
   constructor(dir){
     this.dir =dir;
     this.issaved = false;
     this.content ='';
     this.filename ='';


   }

           exists(name){
               return fs.existsSync(this.dir+'\\'+ name);
           }

           getpath(name){

               return this.dir+'\\'+ name;

           }

       append(text){
        this.content += os.EOL+text;
        this.isSaved = false;


       }

       saveAs(name){
        fs.writeFileSync(this.dir+'\\'+ name,this.content);
        //fs.writeFileSync(name,this.content);
        console.log(this.dir+'\\'+name);
        //console.log(this.content);
        
         this.isSaved = true;
         this.filename = name;


       }

       Saves(){
        fs.writeFileSync(this.dir+'\\'+this.filename,this.content)
        this.isSaved = true;
        this.filename = this.filename;
       }
   

      getContent(){
        return this.content;
      }

     hasName(){
     if(this.filename!='')
       return true;
       return false;

     }

     getName(){
         return this.filename;
     }
     IsSaved(){
         return this.isSaved;
     }

     opend(name){
         this.content = fs.readFileSync(this.dir+'\\'+name, 'utf-8');
         this.filename =name;
         this.isSaved = true;
         return this.content;

     }


     
 }

 module.exports = Document;
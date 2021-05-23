const Document = require('./document');
const Messages = require('./messages');
const Directory = require('./directory');
const readline = require('readline');




const dir = new Directory();


let interface = readline.createInterface(process.stdin, process.stdout);



const tool ="Comandos : :q= Salir, :sa = Guardar Como,   :s= Guardar \n"+
"------------------------------------------------------------"
 
const pantalla = " "+

                         "=====================\n "+
                          "Editor de Texto.\n" +
                         "=======================\n"+
                         "Elige una Opcion:\n" +
                          "1 Crear un nuevo documento\n" +
                          "2 Abrir documento\n" +
                          "3 Cerrar el editor\n";

mainScreen();

 function mainScreen(){
  process.stdout.write('\033c');
  interface.question(pantalla, res =>{
      switch(res.trim()){
       case '1':
       
        let file = new Document(dir.getPath());

       renderInterface(file);
        readCommands(file);
        break;
        case '2':
       OpenFileInterface();
        break;



        case '3':
             interface.close();
        break;
        default:

      }
       });
      }

             mainScreen();

    



        function OpenFileInterface(){
          let file = new Document(dir.getPath());
            dir.getfilesInDir();

            interface.question(Messages.requestFileName,name =>{
             if(file.exists(name)){
               OpenFile(file,name);
             }else{
                console.log(Messages.fileNotFound);
                setTimeout(() =>{
                interface.removeAllListeners('line');
                mainScreen();
                },2000);
               
               
                
             }

            });
        }
 
         function OpenFile(file,name){
                file.opend(name) ;
                 renderInterface(file);
                 readCommands(file);


         }
       
         function renderInterface(file,mensaje){
            process.stdout.write('\033c');
           if(file.getName()=='')
              console.log('Vacio')
              else
               console.log(file.getName());
             
        console.log(tool);
          if(mensaje !=null)
            console.log(mensaje);
            console.log( file.getContent());
               



         } 

         


        function readCommands(file){
          interface.on('line', input =>{
          switch(input.trim()){
           case ':sa':
            GuardarComo(file);
             break;

             case ':q':
                    interface.removeAllListeners('line');
                    mainScreen();
             break;

             case ':s':
              Guardar(file);
             break;

            default:
                file.append(input.trim());


          }

          });

        }
            

           function GuardarComo(file){
                interface.question(Messages.requestFileName, name =>{
                 // console.log(name);
                    if(file.exists(name)){
                     console.log(Messages.fileExists);
                     interface.question(Messages.replaceFile, confirm =>{
                      if(confirm =='y' ){
                           file.saveAs(name);
                           renderInterface(file,Messages.fileSaved +'\n');
                      }
                        else{
                          renderInterface(file, Messages.fileNotSaved+'\n');

                        }

                     });

                    } else{
                          file.saveAs(name);
                      renderInterface(file, Messages.fileSaved+'\n');
                    }
                
                });
           }

    
         function Guardar(file){
            if(file.hasName()){
              file.Saves();
               renderInterface(file,Messages.fileSaved + '\n');
             

            } else{
              GuardarComo(file);
            }     

         }
           

  
/**
 * @description a headless script that will trim layer in and out points to first and last keyframes
 * @name km-km-trim-layer-to-keyframes
 * @author Kyle Harter <kylenmotion@gmail.com>
 * @version 1.0.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 
 * 
*/




(function(){

    try {
        app.beginUndoGroup("trim-layer-to-keyframes");
        var activeComp = app.project.activeItem;

        hello(activeComp)
      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);

      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
      

    function hello(comp){
      if(!(comp && comp instanceof CompItem)){
        return alert("Open up a comp first")
      }
    }

}())

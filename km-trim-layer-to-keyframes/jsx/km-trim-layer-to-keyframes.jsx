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
        var proj = getProj();
        var comp = getComp(proj);
        var selLayers = getSelLayers(comp);
        

        trimLayersToKeyframes(selLayers, comp)
      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);

      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
      function getProj(){
        var proj = app.project;
        if(!proj){
          alert("Whoops!\rYou don't have a project open currently. Open or create a new project and try again.")
          return null;
        } 

        return proj
      }

      function getComp(proj){
        if(!proj) return null;
        var activeComp = proj.activeItem;

        if(!(activeComp && activeComp instanceof CompItem)){
          alert("Whoops!\rYou don't have an active comp open. Open or create a new comp and try again.");
          return
        }

        return activeComp
      }

      function getSelLayers(comp){
        if(!comp) return null
        var selLayers = comp.selectedLayers;

        if(selLayers.length < 1){
          alert("Whoops!\rYou don't have any layers selected in your comp. Select atleast 1 layer and try again.");
          return
        }

        return selLayers

      }


      function traverseProperties(propGroup, keys, start, end){
        
        for(var i = 1; i<=propGroup.numProperties; i++){
          var prop = propGroup.property(i);
          if(prop instanceof PropertyGroup || prop instanceof MaskPropertyGroup){
            traverseProperties(prop,keys, start, end)
          } else if(prop instanceof Property) {
            if(isAnimated(prop) && prop.numKeys > 0){
                for(var b = 1; b<=prop.numKeys; b++){
                  var keyTime = prop.keyTime(b);
                  if(keyTime >= start && keyTime <= end){
                    keys.push(keyTime);
                  }
                }
            }
          }
        }
      }

      function isAnimated(prop){
        var animatedProp = prop.isTimeVarying && !prop.expressionEnabled;
        return animatedProp
      }

      function trimLayersToKeyframes(layers,comp){
        if(!comp) return;
        if(!layers) return;
        var found = false;
        var compStart = comp.displayStartTime;
        var compEnd = compStart + comp.duration;
        for(var i = 0; i<layers.length; i++){
          var layer = layers[i];
          var keyTimes = [];
          traverseProperties(layer, keyTimes,compStart, compEnd);
          if(keyTimes.length > 1){
            found = true;
            var minTime = Math.min.apply(null,keyTimes);
            var maxTime = Math.max.apply(null,keyTimes);
            layer.inPoint = minTime;
            layer.outPoint = maxTime;
          }
        }

      if(!found){
        alert("Whoops!\rYou don't have enough keyframes on your selected layers. Select your layer(s) with atleast 2 keyframes enabled and try again.");
        return
      }

      return
    }

}())

status="";
object = [];
song ="";
function preload(){
    // not needed, actually it is needed ere though it was not needed in  the class webapp
    song = loadSound("alert.mp3"); 
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status : detecting objects';
}

function draw(){
    image(video, 0, 0, 380, 380);

    r = random(255);
    g = random(255);
    b = random(255);

    if(status != ""){
        // != represents not equal to 
        object_detector.detect(video, gotResults);
     
        for(i = 0; i < object.length; i++){
           
        if(object[i].label =='person'){
            // = USED TO ASSIGN VALUES
            // == USED TO COMPARE
            //boolean OPERATORS USED FOR COMPARISON LIKE == < > <= >= !=
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Baby is found";
            song.stop()
        }
        else{
            document.getElementById("status").innerHTML = "Status : Object Not Detected";  
            document.getElementById("no_of_objects").innerHTML = "Baby is not found";
            song.Volume(0);
            song.play()
            
                }
            }
            if(object.length < 0){
            document.getElementById("status").innerHTML = "Status : Object not Detected";  
            document.getElementById("no_of_objects").innerHTML = "Baby is not found";
            song.Volume(0);
            song.play()
            
        }
    }
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
    object_detector.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}
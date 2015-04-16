// Data stream
float dataStream;
//------------

float g;
int savedTime;
int totalTime = 10;
float strokeT = 1;

void setup() {
    size(w, h);
    smooth();
    colorMode(RGB);
    //frameRate();
    background(20);
    strokeCap(ROUND);

    savedTime = millis();

    // Data stream
    dataStream=.0;
    //------------
    socialcast=0;

    var host = location.origin.replace(/^file/, 'ws');
    var ws = new WebSocket("ws://localhost:8013/");
    ws.onmessage = function(event) {
        console.log(JSON.parse(event.data));
        document.querySelector('#socialcast').firstChild.nodeValue = Math.min(Math.floor(event.data*100.),100);
        document.querySelector('#socialcast-bar').style.width = Math.min(Math.floor(event.data*100.),100);
        socialcast = float(event.data);
        redraw();
    };

    noLoop();

    g=0;
}

void draw() {
    translate(0, h/2);
    theLine();
}

void theLine() {

    // Data stream
    dataStream=dataStream+.01;
    //------------

    int passedTime = millis() - savedTime;

    noiseSeed(13120);
    float noiseVal = map(socialcast, 0, 1, 0, h/3);

    noiseSeed(10130);
    float noiseVal2 = map(noise(dataStream), 0, 1, 0, h/2);

    noiseSeed(152);
    float noiseVal3 = map(noise(dataStream), 0, 1, 0, h/2);

    if (passedTime > totalTime) {

// Thin line   
    stroke(100, 100, 100, 255); // GRÅ
    strokeWeight(strokeT);
    line(g, noiseVal2/1.5, g, -noiseVal2/1.5);

    //Dot grid
    strokeWeight(strokeT);   
    stroke(100, 100, 100, 255); // GRÅ
    for (int i=0; i<noiseVal2/1.5; i=i+5) {
      point(g-3, -i);
      point(g+3, -i);
      point(g-3, i+2);
      point(g+3, i+2);
    }

    // Cricles  
    stroke(244, 76, 89, 100+(noiseVal/2)); // RØD
    noFill();
    strokeWeight(strokeT);
    ellipse(g, -noiseVal3/1.5-3, 8, 8);
    ellipse(g, noiseVal3/1.5+3, 8, 8);
    ellipse(g, -noiseVal3/1.5-3, 4, 4);
    ellipse(g, noiseVal3/1.5+3, 4, 4);
    point(g, -noiseVal3/1.5-3);
    point(g, noiseVal3/1.5+3);

    //Small cricles
    stroke(244, 76, 89, 100+(noiseVal/2)); // RØD
    ellipse(g, -noiseVal2/1.5-3, 2, 2);
    ellipse(g, noiseVal2/1.5+3, 2, 2);

    //Fat line
    strokeWeight(7);
    if (noiseVal < 200) {
      stroke(254, 86, 99, 200+(noiseVal/2)); // RØD
    }
    if (noiseVal > 200) {
      stroke(254, 86, 99, 200+(noiseVal/2)); // RØD
    }
    line(g, noiseVal/2, g, -noiseVal/2);

    //Thin black line
    strokeWeight(1);
    stroke(30);
    line(g, noiseVal3/2, g, -noiseVal3/2);


        savedTime = millis();
    }
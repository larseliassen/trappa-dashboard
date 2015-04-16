// Data stream
float dataStream;
float socialcast=0.;
float distance=0.;
float sound=0.;
//------------

float g;
int savedTime;
int totalTime = 10;
float strokeT = 1;

void setup() {
    size(w, h / 1.5);
    smooth();
    colorMode(RGB);
    //frameRate();
    background(20);
    strokeCap(ROUND);

    savedTime = millis();

    // Data stream
    dataStream=.0;
    //------------
    //socialcast=0.;

    // var host = location.origin.replace(/^file/, 'ws');
    // var ws = new WebSocket("ws://localhost:8013/");
    // ws.onmessage = function(event) {
    //     console.log(JSON.parse(event.data));
    //     socialcast = float(event.data);
    //     redraw();
    // };

    noLoop();

    g=0;
}

void draw() {
    translate(0, h/3);
    theLine();
}

void setSocialcast(value) {
    socialcast = value;
}

void setDistance(value) {
    distance = value;
}
void setDec(value) {
    sound = value;
}
void theLine() {

    // Data stream
    dataStream=dataStream+.01;
    //------------

    int passedTime = millis() - savedTime;

    noiseSeed(13120);
    float noiseVal = map(distance, 0, 1, 0, h/3);

    noiseSeed(10130);
    float noiseVal2 = map(sound, 0, 1, 0, h/3);

    noiseSeed(152);
    float noiseVal3 = map(socialcast, 0, 1, 0, h/3);

    if (passedTime > totalTime) {

        //Time-Warp
        strokeWeight(12);
        stroke(20,20,20,100);
        line(g+10, h/2, g+10, -h/2);

        if (g<w) {
            g=g+12;
        } else {
            g=0;
        }

        // Thin line
        stroke(79, 191, 178); // GRØNN
        strokeWeight(strokeT);
        line(g, noiseVal2/1.5, g, -noiseVal2/1.5);

        //Dot grid
        strokeWeight(strokeT);
        stroke(79, 191, 178); // GRØNN
        for (int i=0; i<noiseVal2/1.5; i=i+5) {
            point(g-3, -i);
            point(g+3, -i);
            point(g-3, i+2);
            point(g+3, i+2);
        }

        // Cricles
        stroke(244, 76, 89); // GUL
        noFill();
        strokeWeight(strokeT);
        ellipse(g, -noiseVal3/1.5-3, 8, 8);
        ellipse(g, noiseVal3/1.5+3, 8, 8);
        ellipse(g, -noiseVal3/1.5-3, 4, 4);
        ellipse(g, noiseVal3/1.5+3, 4, 4);
        point(g, -noiseVal3/1.5-3);
        point(g, noiseVal3/1.5+3);

        //Small cricles
        stroke(279, 191, 178); // GUL
        ellipse(g, -noiseVal2/1.5-3, 2, 2);
        ellipse(g, noiseVal2/1.5+3, 2, 2);

        //Fat line
        strokeWeight(2);
        stroke(253, 253, 170); // RØD
        line(g, noiseVal/2, g, -noiseVal/2);

        //Thin black line
        strokeWeight(1);
        stroke(100);
        line(g, noiseVal3/2, g, -noiseVal3/2);

        savedTime = millis();
    }
}
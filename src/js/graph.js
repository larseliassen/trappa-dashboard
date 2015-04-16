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

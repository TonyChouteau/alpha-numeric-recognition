
PVector lastPoint = null;
int i = 0;

public void setup(){
  size(400,400); 
  background(0);
  println("Nombre : "+i%10);
}

public void mouseClicked(){
  if (mouseButton != 0){
    background(0);
    lastPoint = null;
  }
}

public void mouseDragged(){
  if (lastPoint == null){
    lastPoint = new PVector(mouseX, mouseY);
  }
  
  PVector currentPoint = new PVector(mouseX, mouseY);
  
  stroke(255);
  strokeWeight(10);
  line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
  
  lastPoint = currentPoint;
}

public void keyPressed(){
  lastPoint = null;
  
  saveFrame("out/"+(i%10)+"_"+year()+"-"+month()+"-"+day()+"-"+hour()+"-"+minute()+"-"+second()+"-"+millis()+".png");
  
  background(0);
  i++;
  println("Nombre : "+i%10);
}

public void draw(){
  // Nothing
}

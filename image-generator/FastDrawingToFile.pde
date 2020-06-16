
PVector lastPoint = null;
int i = 0;

PGraphics pg = null;

int size = 20;
int[][] board = new int[size][size];
boolean mode = false;

public void setup(){
  size(400, 400);
  pg = createGraphics(400, 400);
  pg.beginDraw();
  resetScreen();
  
  println("Nombre : "+i%10);
}

public void resetScreen(){
  pg.background(0);
  for (int i=0; i<size; i++){
    for (int j=0; j<size; j++){
      board[i][j] = 0;
    }
  }
}

public void mouseClicked(){
  if (mouseButton != 0){
    resetScreen();
    lastPoint = null;
  }
}

public void mouseDragged(){
  if (lastPoint == null){
    lastPoint = new PVector(mouseX, mouseY);
  }
  
  int y = mouseY/(height/size);
  int x = mouseX/(width/size);
  
  if (x>=0 && x<size && y>=0 && y<size){
    board[y][x] = 1;
  }
  if (x+1<size && x>=0 && y>=0 && y<size){
    board[y][x+1] = 1;
  }
  if (x-1>=0 && x<size && y>=0 && y<size){
    board[y][x-1] = 1; 
  }
  if (y+1<size && x>=0 && x<size && y>=0){
    board[y+1][x] = 1;
  }
  if (y-1>=0 && x>=0 && x<size && y<size){
    board[y-1][x] = 1; 
  }
  
  PVector currentPoint = new PVector(mouseX, mouseY);
  
  pg.stroke(255);
  pg.strokeWeight(40);
  pg.line(lastPoint.x, lastPoint.y, currentPoint.x, currentPoint.y);
  
  lastPoint = currentPoint;
}

public void mouseReleased(){
    lastPoint = null;
}

public void keyPressed(){
  if (keyCode==77){
    mode = !mode;
    return;
  }
  lastPoint = null;
  
  saveFrame("out/"+(i%10)+"_"+year()+"-"+month()+"-"+day()+"-"+hour()+"-"+minute()+"-"+second()+"-"+millis()+".png");
  
  resetScreen();
  i++;
  println("Nombre : "+i%10);
}

public void draw(){
  if (mode){
    pg.endDraw();
    image(pg, 0, 0, width, height);
    pg.beginDraw();
  } else {
    for (int i=0; i<size; i++){
      for (int j=0; j<size; j++){
        int c = 0;
        if (board[i][j] == 1){
          c = 255;
        }
        fill(c);
        rect(j*width/size, i*height/size, width/size, height/size);
      }
    }
  }
}
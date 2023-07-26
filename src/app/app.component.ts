import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegionVideoImage';
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    const image = new Image();
    image.src = '../assets/images/road.png';
    image.onload = () => this.drawImageAndLines(image);
  }

  drawImageAndLines(image: HTMLImageElement): void {
    const context = this.canvas.nativeElement.getContext('2d');
    if(context) {
    context.drawImage(image, 0, 0);}

    // координаты линий из вашего JSON массива:
    const coords = [
      { "x": 100, "y": 140 },
      { "x": 80, "y": 120 },
      { "x": 30, "y": 120 },
      { "x": 60, "y": 80 },
      { "x": 120, "y": 80 },
      { "x": 160, "y": 90 },
      { "x": 200, "y": 100 },
      { "x": 100, "y": 140 },
    ];

    // рисование линий между заданными точками:
    if(context){
    context.beginPath();
    context.moveTo(coords[0].x, coords[0].y);

    for (let i = 1; i < coords.length; i++) {
      context.lineTo(coords[i].x, coords[i].y);
    }

    context.strokeStyle="red";
    context.lineWidth = 5;
    context.stroke();
  }}
}

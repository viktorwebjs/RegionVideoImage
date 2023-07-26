import { Component, ElementRef, ViewChild } from '@angular/core';

interface Polygon {
  coords: { x: number; y: number }[];
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RegionVideoImage';
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  // координаты линий из JSON массива:
  public polygons: Polygon[] = [
    {
      coords: [
        { x: 607, y: 405 },
        { x: 610, y: 566 },
        { x: 712, y: 566 },
        { x: 661, y: 496 },
        { x: 625, y: 496 },
        { x: 618, y: 405 },
        { x: 607, y: 405 },
      ],
      color: 'red'
    },
    {
      coords: [
        { x: 277, y: 367 },
        { x: 272, y: 379 },
        { x: 330, y: 380 },
        { x: 340, y: 365 },
        { x: 277, y: 367 },
      ],
      color: 'blue'
    }
  ];

  ngAfterViewInit(): void {
    const image = new Image();
    image.src = '../assets/images/road.png';
    image.onload = () => this.drawImageAndLines(image);
  }

  drawImageAndLines(image: HTMLImageElement): void {
    const context = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = image.width;
    this.canvas.nativeElement.height = image.height;

    if (context) {
      context.drawImage(image, 0, 0);
    }

    // рисование линий между заданными точками:
    this.polygons.forEach(polygon => {
      if (context) {
        context.beginPath();
        context.moveTo(polygon.coords[0].x, polygon.coords[0].y);

        for (let i = 1; i < polygon.coords.length; i++) {
          context.lineTo(polygon.coords[i].x, polygon.coords[i].y);
        }

        context.fillStyle = polygon.color;
        context.strokeStyle = polygon.color;
        context.lineWidth = 5;
        // context.fill();
        context.stroke();
      }
    });
  }
}

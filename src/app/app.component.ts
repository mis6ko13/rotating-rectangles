import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {StorageService} from './_services/storage.service';
import {HorizontalRectangleCoordinates, MediateRectangleCoordinates} from './_models/rectangelCoordinates.model';
import {HelperService} from './_services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('horizontal') horizontalField: ElementRef;
  @ViewChild('vertical') verticalField: ElementRef;
  rangeVal = 3;
  minRangeVal = 3;
  maxRangeVal = 30;
  marks = Array(30);

  constructor(private storage: StorageService,
              private helper: HelperService) {
  }

  doTheJob() {
    this.helper.clearField(this.horizontalField.nativeElement);
    this.helper.clearField(this.verticalField.nativeElement);
    this.storage.set('horizontalRectangleShapes', this.generateHorizontalRects());
    const rectsForDisplay = this.helper.shuffleArray(this.storage.get('horizontalRectangleShapes'));
    const nodes = this.displayHorizontalRects(rectsForDisplay);
    const horizontalRectsCoords = this.calcHorizontalRectsCoordinates(nodes);
    const veticalRectsCoords = this.generateVerticalRects(horizontalRectsCoords);
    this.storage.set('horizontalRectangleCoordinates', horizontalRectsCoords);
    this.storage.set('verticalRectangleCoordinates', veticalRectsCoords);
    this.displayVerticalRects(veticalRectsCoords);
  }

  generateHorizontalRects(): Array<HorizontalRectangleCoordinates> {
    let sum = 0;
    const arr = [];
    for (let width, i = this.rangeVal; i > 0; i--) {
      const rect: any = {index: `horizontalRectangleShape-${arr.length}`};
      rect.height = this.helper.getRandomArbitrary(1, 100);
      width = this.helper.getRandomArbitrary(1, i === this.rangeVal ? 25 : 100 - --sum);
      sum += +width;
      rect.width = width;
      arr.push(rect);
    }
    return arr;
  }

  displayHorizontalRects(rectsArr): Array<HTMLElement> {
    const arr = [];
    rectsArr.forEach(el => {
      const rect = document.createElement('div');
      rect.classList.add('rectangle');
      rect.style.height = `${el.height}%`;
      rect.style.width = `${el.width}%`;
      this.horizontalField.nativeElement.appendChild(rect);
      arr.push(rect);
    });
    return arr;
  }

  calcHorizontalRectsCoordinates(nodesArr): Array<MediateRectangleCoordinates> {
    const arr = [];
    nodesArr.forEach((el: HTMLElement, index) => {
      arr.push({
        index: `rectangleShape-${index}`,
        topLeft: {x: el.offsetLeft, y: el.offsetHeight},
        topRight: {x: el.offsetLeft + el.offsetWidth, y: el.offsetHeight},
        bottomRight: {x: el.offsetLeft + el.offsetWidth, y: 0},
        bottomLeft: {x: el.offsetLeft, y: 0},
        currentMaxY: false,
        processed: false
      });
    });
    return arr;
  }

  generateVerticalRects(coords) {
    const arr = [];
    const coordsCopy = [...coords];
    let leftSearchProcessed = false;
    let maxY = 0;
    coordsCopy.sort((a, b) => a.topLeft.y - b.topLeft.y);
    coordsCopy.forEach((elFromSorted, i) => {
      const index = coords.findIndex(el => el.index === elFromSorted.index);
      const verticalRect: any = {
        index: `rectangleShape-${arr.length}`,
        topLeft: {},
        topRight: {},
        bottomRight: {},
        bottomLeft: {}
      };
      verticalRect.topLeft.y = verticalRect.topRight.y = elFromSorted.topLeft.y;
      verticalRect.bottomLeft.y = verticalRect.bottomRight.y = elFromSorted.bottomLeft.y;
      verticalRect.topLeft.x = verticalRect.bottomLeft.x = coords[0].bottomLeft.x;
      verticalRect.topRight.x = verticalRect.bottomRight.x = coords[coords.length - 1].bottomRight.x;
      for (let i = index; i > 0; i--) {
        if (coords[i - 1].processed) {
          verticalRect.topLeft.x = verticalRect.bottomLeft.x = coords[i].bottomLeft.x;
          verticalRect.bottomLeft.y = verticalRect.bottomRight.y = maxY = coords[i - 1].topLeft.y;
          break;
        }
      }
      for (let i = index; i < coords.length - 1; i++) {
        if (coords[i + 1].processed) {
          verticalRect.topRight.x = verticalRect.bottomRight.x = coords[i].bottomRight.x;
          verticalRect.bottomLeft.y = verticalRect.bottomRight.y = coords[i + 1].topLeft.y;
          break;
        }
      }
      coords[index].processed = true;
      leftSearchProcessed = false;
      arr.push(verticalRect);
    });
    return arr;
  }

  displayVerticalRects(coords) {
    coords.forEach(el => {
      const rect = document.createElement('div');
      rect.classList.add('rectangle');
      rect.style.position = 'absolute';
      rect.style.left = `${el.bottomLeft.x}px`;
      rect.style.bottom = `${el.bottomLeft.y}px`;
      rect.style.width = `${el.bottomRight.x - el.bottomLeft.x}px`;
      rect.style.height = `${el.topLeft.y - el.bottomLeft.y}px`;
      this.verticalField.nativeElement.appendChild(rect);
    });
  }
}

import {Component, input} from '@angular/core';

@Component({
  selector: 'lib-section-heading',
  imports: [],
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.css',
})
export class SectionHeading {
  heading = input("")
  subheading = input("")
}

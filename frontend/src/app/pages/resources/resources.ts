import { Component } from '@angular/core';
import {ButtonToggle, ResourceGrid, SectionHeading} from "components";

@Component({
  selector: 'app-resources',
  imports: [
    SectionHeading,
    ButtonToggle,
    ResourceGrid
  ],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class Resources {

}

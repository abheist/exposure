import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceGrid } from './resource-grid';

describe('ResourceGrid', () => {
  let component: ResourceGrid;
  let fixture: ComponentFixture<ResourceGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

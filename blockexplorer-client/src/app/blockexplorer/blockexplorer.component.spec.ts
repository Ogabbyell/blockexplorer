import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockexplorerComponent } from './blockexplorer.component';

describe('BlockexplorerComponent', () => {
  let component: BlockexplorerComponent;
  let fixture: ComponentFixture<BlockexplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockexplorerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockexplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionHistoryDialogComponent } from './revision-history-dialog.component';

describe('RevisionHistoryDialogComponent', () => {
  let component: RevisionHistoryDialogComponent;
  let fixture: ComponentFixture<RevisionHistoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevisionHistoryDialogComponent]
    });
    fixture = TestBed.createComponent(RevisionHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

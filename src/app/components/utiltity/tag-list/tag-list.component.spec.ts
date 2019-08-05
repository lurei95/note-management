import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { nullOrEmpty } from 'src/app/util/utility';
import { TagListComponent } from './tag-list.component';
import { MatChipsModule, MatChipInputEvent, MatChip } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { DebugElement } from '@angular/core';

describe('TagListComponent', () =>
{
  let component: TagListComponent;
  let fixture: ComponentFixture<TagListComponent>;
  let field: HTMLInputElement;

  beforeEach(async(() => 
  { 
    TestBed.configureTestingModule({ 
      declarations: [ TagListComponent ],
      imports: [ MatChipsModule, MatIconModule ]
    }).compileComponents(); 
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(TagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    field = fixture.debugElement.query(By.css("#tagInput")).nativeElement;
    field.value = "tag1";
  });

  it('should create', () => expect(component).toBeTruthy());

  it("adding a tag should raise the tags changed event", () => 
  {
    let spy = spyOn(component.tagsChanged, "emit");

    component.handleAddNewTag({ input: field, value: field.value});
    
    expect(component.tags).toContain("tag1");
    let tags: string[] = spy.calls.mostRecent().args[0]
    expect(tags.length).toBe(1);
    expect(tags[0]).toBe("tag1");
    expect(nullOrEmpty(field.value)).toBe(true);
  });

  it("cannot add same tag", () => 
  {
    let spy = spyOn(component.tagsChanged, "emit");

    component.handleAddNewTag({ input: field, value: field.value});
    component.handleAddNewTag({ input: field, value: field.value});
    
    expect(component.tags.length).toBe(1);
    expect(spy.calls.count()).toBe(1);
  });

  it("input is removed when maximum count of tags reached", () => 
  {
    component.maxTagCount = 1;
    
    component.handleAddNewTag({ input: field, value: field.value});
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css("#tagInput"))).toBeNull();
  });

  it("removing a tag should raise the tags changed event", () => 
  {
    component.tags = ["tag1", "tag2"];
    let spy = spyOn(component.tagsChanged, "emit");

    component.handleRemoveTag("tag1");
    
    expect(component.tags.length).toBe(1);
    expect(component.tags[0]).toBe("tag2");
    let tags: string[] = spy.calls.mostRecent().args[0];
    expect(tags.length).toBe(1);
    expect(tags[0]).toBe("tag2");
  });

  it("changing the tags updates the tag list", () => 
  {
    component.tags = ["tag1", "tag2"];

    fixture.detectChanges();

    let tags: DebugElement[] = fixture.debugElement.queryAll(By.css("mat-chip"));
    expect(tags.length).toBe(2);
    let tag1: string = tags[0].nativeElement.innerHTML;
    expect(tag1).toContain("tag1");
    let tag2: string = tags[1].nativeElement.innerHTML;
    expect(tag2).toContain("tag2");
  });
});
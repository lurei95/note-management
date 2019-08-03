import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationListComponent } from './notification-list.component';
import { StoreMock } from 'src/app/services/mocks/storeMock';
import { NotificationModel } from 'src/app/models/notificationModel';
import { NotificationKind } from 'src/app/models/notificationKind';
import { getNotifications } from 'src/app/redux/state';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationAction } from 'src/app/redux/actions/notification/notificationAction';
import { NotificationActionKind } from 'src/app/redux/actions/notification/notificationActionKind';

describe('NotificationListComponent', () =>
{
  let component: NotificationListComponent;
  let fixture: ComponentFixture<NotificationListComponent>;
  let storeMock: StoreMock
  let notifications: NotificationModel[];

  beforeEach(() => 
  { 
    notifications = [
      new NotificationModel("1", NotificationKind.Success, "message1"),
      new NotificationModel("2", NotificationKind.Warning, "message2"),
      new NotificationModel("3", NotificationKind.Error, "message3"),
    ];
    storeMock = new StoreMock();
    storeMock.resultSelector = (selector) =>
    {
      if (selector == getNotifications)
        return of(notifications);
      return null;
    }
  });

  beforeEach(async(() => 
  { 
    TestBed.configureTestingModule({ 
      declarations: [ NotificationListComponent],
      providers: [ { provide: Store, useValue: storeMock } ],
      imports: [ BrowserAnimationsModule ]
    }).compileComponents(); 
  }));

  beforeEach(() => 
  {
    fixture = TestBed.createComponent(NotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function testNotification(index: number, notificationKind: NotificationKind, text: string,
     listItems: DebugElement[])
  {
    let className = notificationKind == NotificationKind.Error ? "error" 
      : notificationKind == NotificationKind.Success ? "success" : "warning";
    expect(listItems[index].nativeElement.className).toContain(className);
    expect(listItems[index].nativeElement.innerHTML).toContain(text);
    expect(component.notifications[index].notificationKind).toBe(notificationKind);
    expect(component.notifications[index].message).toBe(text);
  }

  it('should create', () => expect(component).toBeTruthy());

  it("calculateClass returns the right class", () => 
  {
    let model = new NotificationModel("1", NotificationKind.Error);
    expect(component.calculateClass(model)).toBe("list-item error");

    model.notificationKind = NotificationKind.Warning;
    expect(component.calculateClass(model)).toBe("list-item warning");

    model.notificationKind = NotificationKind.Success;
    expect(component.calculateClass(model)).toBe("list-item success");
  });

  it("notifications are displayed correctly", () => 
  {
    let listItems: DebugElement[] = fixture.debugElement.queryAll(By.css(".list-item"));   
    expect(listItems.length).toBe(3);
    expect(component.notifications.length).toBe(3);
    testNotification(0, NotificationKind.Success, "message1", listItems);
    testNotification(1, NotificationKind.Warning, "message2", listItems);
    testNotification(2, NotificationKind.Error, "message3", listItems);
  });

  it("newly added notifications are displayed", () => 
  {
    notifications.push(new NotificationModel("4", NotificationKind.Warning, "message4"));

    fixture.detectChanges();

    let listItems: DebugElement[] = fixture.debugElement.queryAll(By.css(".list-item"));   
    expect(listItems.length).toBe(4);
    testNotification(3, NotificationKind.Warning, "message4", listItems);
  });

  it("handleRemoveButtonClicked removes the notification", () => 
  {
    component.handleRemoveButtonClicked(notifications[0]);
    fixture.detectChanges();

    let listItems: DebugElement[] = fixture.debugElement.queryAll(By.css(".list-item"));  
    let action: NotificationAction = (storeMock.dispatchedActions[0] as NotificationAction); 
    expect(action.type).toBe(NotificationActionKind.NotificationRemove);
    expect(action.payload.id).toBe("1");
    expect(action.payload.notificationKind).toBe(NotificationKind.Success);
    expect(action.payload.message).toBe("message1");
    expect(listItems.length).toBe(2);
    testNotification(0, NotificationKind.Warning, "message2", listItems);
    testNotification(1, NotificationKind.Error, "message3", listItems);
  });
});

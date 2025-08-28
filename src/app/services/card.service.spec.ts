import { TestBed } from '@angular/core/testing';

import { CardService } from './card.service';
import { TemplateRef } from '@angular/core';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // INITIAL SIGNALS (visible, title, data)
  it('should start with visible=false and an empty title & data', () => {
    expect(service.visible()).toBeFalse();
    expect(service.title()).toBe('');
    expect(service.data()).toEqual({
      template: {} as TemplateRef<any>,
      context: '',
    });
  });

  // SHOW CARD
  it('should show card with recieved "title" & "data"', () => {
    const mockTemplate = {} as TemplateRef<any>;
    const mockContext = { cardData: 'card content' };

    service.showCard('Test Card Title', {
      template: mockTemplate,
      context: mockContext,
    });
    expect(service.visible()).toBeTrue;
    expect(service.title()).toBe('Test Card Title');
    expect(service.data()).toEqual({
      template: mockTemplate,
      context: mockContext,
    });
    expect(service.dataValue).toEqual({
      template: mockTemplate,
      context: mockContext,
    });
  });

  // HIDE CARD
  it('should hide card', () => {
    const mockTemplate = {} as TemplateRef<any>;
    service.showCard('Visible', {
      template: mockTemplate,
      context: { cardData: 'card content' },
    });

    service.hideCard();
    expect(service.visible()).toBeFalse();
    expect(service.title()).toBe('');
    expect(service.data()).toEqual({ template: mockTemplate, context: '' });
  });

  //TOGGLE CARD
  it('should toggle the visibility of card', () => {
    expect(service.visible()).toBeFalse();

    service.toggleCard();
    expect(service.visible()).toBeTrue();

    service.toggleCard();
    expect(service.visible()).toBeFalse();
  });
});

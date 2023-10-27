import { TestBed } from '@angular/core/testing';

import { MenuApiParserService } from './menu-api-parser.service';

describe('MenuApiParserService', () => {
  let service: MenuApiParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuApiParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

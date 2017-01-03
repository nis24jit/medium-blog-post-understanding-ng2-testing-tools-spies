import { By } from "@angular/platform-browser";
import { TestBed } from "@angular/core/testing";
import { DataDisplayComponent } from "./data-display.component";
import { RouterTestingModule } from "@angular/router/testing";
import { DataService } from "./services";

describe("DataDisplayComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataDisplayComponent],
      providers: [DataService],
    });
  });

  it("should successfuly be able to create a DataDisplayComponent", () => {
    let fixture = TestBed.createComponent(DataDisplayComponent);
    expect(fixture.componentInstance instanceof DataDisplayComponent).toBe(true, "should create DataDisplayComponent");
  });

  /**
   * In the test cases below we test that the DataDisplayComponent display the correct
   * number of data records that it should displayed to the user as we (described in the requirements for the DataDisplayComponent)
   * In order to do this we had to spy its dataService dependency (override what values it will return) in order
   * to simulate different amounts of data returned by the dataService. If we did not do this we would have to
   * explicitly make http calls to a live server and setup the data in the server to fit the needs of these test requirements
   * but instead we can just spy the DataService's method inorder for us to simulate the different cases the code
   * would run into in the real world.
   */
  it("DataDisplayComponent html template should display (0) data record to the user", () => {
    let fixture = TestBed.createComponent(DataDisplayComponent);
    let dataService: DataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, "getData").and.returnValue([]);

    fixture.detectChanges();

    let debugUlElement = fixture.debugElement.query(By.css("ul"));
    let nativeUlElement: HTMLUListElement = debugUlElement.nativeElement;

    // TODO: update gist and blog with new code. Continue writing blog. Then continue learning ovserables so i can continue to teset my flip-it component.

    expect(nativeUlElement.childElementCount).toEqual(0);
  });

  it("DataDisplayComponent html template should display (1) data record to the user", () => {
    let fixture = TestBed.createComponent(DataDisplayComponent);
    let dataService: DataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, "getData").and.returnValue(["1dataRecord"]);

    fixture.detectChanges();

    let debugUlElement = fixture.debugElement.query(By.css("ul"));
    let nativeUlElement: HTMLUListElement = debugUlElement.nativeElement;

    expect(nativeUlElement.childElementCount).toEqual(1);
  });

  it("DataDisplayComponent html template should display (2) data record to the user", () => {
    let fixture = TestBed.createComponent(DataDisplayComponent);
    let dataService: DataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, "getData").and.returnValue(["1dataRecord", "2dataRecord"]);

    fixture.detectChanges();

    let debugUlElement = fixture.debugElement.query(By.css("ul"));
    let nativeUlElement: HTMLUListElement = debugUlElement.nativeElement;

    expect(nativeUlElement.childElementCount).toEqual(2);
  });

  it("DataDisplayComponent html template should display (3) data record to the user", () => {
    let fixture = TestBed.createComponent(DataDisplayComponent);
    let dataService: DataService = fixture.debugElement.injector.get(DataService);
    spyOn(dataService, "getData").and.returnValue(["1dataRecord", "2dataRecord", "3dataRecord"]);

    fixture.detectChanges();

    let debugUlElement = fixture.debugElement.query(By.css("ul"));
    let nativeUlElement: HTMLUListElement = debugUlElement.nativeElement;

    expect(nativeUlElement.childElementCount).toEqual(3);
  });

  /**
   * In the test cases below we test that the DataDisplayComponent correctly uses the dataService as intended
   * by checking to make sure it calls the correct DataService method, calls it the correct number of times, and
   * call is with the expected parameters.
   */
  describe("DataService Provider", () => {
    /**
     * Example: Spying on a component's service provider to test that the class is using the service/provider
     * as designed.
     */
    it(".getData() method should be called during the ngOnInit life cycle hook", () => {
      let fixture = TestBed.createComponent(DataDisplayComponent);
      let dataService: DataService = fixture.debugElement.injector.get(DataService);
      spyOn(dataService, "getData");

      fixture.detectChanges();
      expect(dataService.getData).toHaveBeenCalled();
    });

    it(".getData() method should be called only 1 time during the ngOnInit life cycle hook", () => {
      let fixture = TestBed.createComponent(DataDisplayComponent);
      let dataService: DataService = fixture.debugElement.injector.get(DataService);
      spyOn(dataService, "getData");

      fixture.detectChanges();
      expect(dataService.getData).toHaveBeenCalledTimes(1);
    });

    it(".getData() method should be called with the parameters (0,'dataOption1') during the ngOnInit life cycle hook", () => {
      let fixture = TestBed.createComponent(DataDisplayComponent);
      let dataService: DataService = fixture.debugElement.injector.get(DataService);
      spyOn(dataService, "getData");

      fixture.detectChanges();
      expect(dataService.getData).toHaveBeenCalledWith(0, "dataOption1");
    });
  });

});

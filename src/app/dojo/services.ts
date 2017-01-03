export class DataService {
  public getData(dataParameter: number, dataParameter2: string): Array<string> {
    // Stub data recieve from http call to a data service with supplied parameters
    // EX: Http.get("api.dataserver/{dataParameter}/{dataParameter2}");
    let dataRecieved = ["moreDataRecieved1", "moreDataRecieved2", "moreDataRecieved3" ];
    return dataRecieved;
    }
}

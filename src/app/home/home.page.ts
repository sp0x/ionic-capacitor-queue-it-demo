import { Component } from '@angular/core';

declare var cordova: any;
declare module QueueIt.Javascript {
  interface IQueueITEngine {
      run(): void;
  }
  class QueuePassedInfo {
  }
  interface IQueueListener {
      onQueuePassed: (info: QueuePassedInfo) => void;
      onQueueViewWillOpen: () => void;
      onQueueDisabled: () => void;
      onQueueItUnavailable: () => void;
      onError: (error: Error, message: string) => void;
  }
  class QueueITEngine implements IQueueITEngine {
      private customerId;
      private eventOrAliasId;
      private layoutName;
      private language;
      private listner;
      constructor(customerId: string, eventOrAliasId: string, layoutName: string, language: string, listner: IQueueListener);
      private browserRef;
      run(): void;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    var listner = {
      onQueuePassed: () => alert('Queue passed'),
      onQueueViewWillOpen: () => alert('In app browser is opening'),
      onQueueDisabled: () => alert('Queue disabled'),
      onQueueItUnavailable: () => alert('Queue-it not in service'),
      onError: (error, message) => {
        console.warn(error);
        debugger;
        //Issue:
        //i.browserRef = window.cordova.InAppBrowser.open(n, "_blank", "location=no,toolbar=no,hardwareback=no");
        alert('Error: ' + message);
      },
      onBrowserExit: () => alert('browser exit')    
    }
    var language = 'en-US';
    var layout = null;
    alert("Running");
    setTimeout(()=>{

      const engine = new QueueIt.Javascript.QueueITEngine('ticketania', 'ionicdemoapp', language, layout, listner);
      //cordova.plugin.http.get("https://postman-echo.com/get?foo1=bar1&foo2=bar2").then(r=> console.log(r)).catch(e=>console.log(e));
      engine.run();
    }, 1000 * 4)

  }

}

import axios from "axios";

class RequestPool {
  requests = [];
  timeout;

  constructor(initialTimout) {
    this.timeout = initialTimout;
    return this;
  }

  addRequest(url) {
    if (!url) return;
    console.log("one in pool");
    this.execute(url);
    return new Promise((resolve) => {
      this.requests.push({
        url,
        resolve,
        tryNumber: 0,
      });
    });
  }

  release(req, res) {
    const idx = this.requests.findIndex((r) => (r.url = req.url));

    this.requests = [
      ...this.requests.slice(0, idx),
      ...this.requests.slice(idx + 1),
    ];
    req.resolve(res);
  }

  execute(url) {
    setTimeout(async () => {
      const req = this.requests.find((req) => req.url === url);
      if (!req) return;

      try {
        const res = await axios(req.url);

        this.release(req, res);
      } catch (e) {
        if (req.tryNumber < 3) {
          req.tryNumber++;
          return this.execute(req.url);
        }

        this.release(req, {});
      }
    }, this.timeout);
  }
}

export default (initialTimout) => new RequestPool(initialTimout);

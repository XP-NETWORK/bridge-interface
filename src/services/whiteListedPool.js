class WhitelistedPool {
  whitelisted = {};
  pool = [];

  check(contract) {
    return this.whitelisted[contract] != undefined;
  }

  add(cb) {
    return async (...args) => {
      const contract = args[1]?.native?.contract;

      if (this.check(contract)) {
        return this.whitelisted[contract];
      }

      const pendingPromise = this.pool.find(
        (item) => item.contract === contract
      );

      const wl = pendingPromise
        ? pendingPromise.prom.then(() => this.whitelisted[contract])
        : await new Promise(async (resolve, reject) => {
            this.pool.push({
              contract,
              prom: cb(...args)
                .then((res) => {
                  this.whitelisted[contract] = res;
                  this.release(contract);
                  resolve(res);
                })
                .catch(() => reject(undefined)),
            });
          });

      return wl;
    };
  }

  release(contract) {
    const idx = this.pool.findIndex((item) => item.contract === contract);
    if (idx && idx > -1) {
      this.pool.splice(idx, 1);
    }
  }
}

export default () => new WhitelistedPool();

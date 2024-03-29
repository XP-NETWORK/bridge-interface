class WhitelistedPool {
    whitelisted = new Set();
    pool = new Map();

    check = (contract) => this.whitelisted.has(contract);

    whitelistContract = (contract) => this.whitelisted.add(contract);

    add = (cb) => async (...args) => {
        const contract = args[1]?.native?.contract || args[1].contract;

        if (!contract || this.check(contract)) return true;

        const alreadyPending = this.pool.get(contract);

        return alreadyPending
            ? alreadyPending.then(() => this.check(contract))
            : new Promise((resolve, reject) => {
                  const prom = cb(...args)
                      .then((res) => {
                          res && this.whitelistContract(contract);
                          this.release(contract);
                          resolve(res);
                      })
                      .catch(() => reject(undefined));

                  this.pool.set(contract, prom);
              });
    };

    release = (contract) => this.pool.delete(contract);
}

export default () => new WhitelistedPool();

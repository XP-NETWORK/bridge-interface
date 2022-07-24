class WhitelistedPool {
  whitelisted = {};

  check(contract) {
    return this.whitelisted[contract];
  }

  add(contract, wl) {
    this.whitelisted[contract] = wl;
  }

  remove(contract) {
    delete this.whitelisted[contract];
  }
}

export default () => new WhitelistedPool();

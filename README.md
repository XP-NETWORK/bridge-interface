# Bridge UI

to install deps - _yarn_ <br>
to start - _yarn start_ <br>
to build - _yarn build_

main branch is **develop**<br>
widget branch is **widget**<br>
To merge **develop** changes to **widget** - _git merge develop_ (when on **widget** branch). then - _yarn install_<br>

main dependancy is **xp.network(xpjs)** (_yarn upgrade xp.network_ before build)

If you upgrade xp.network dependancy by building(or editing) directly in /node_modules/xp.network/dist (this is fast way to do upgrade), do not forget to delete node_modules/.cache folder before restarting

**_ Config constants _** are located in src/components/values.js (don't forget to update it when adding new chains)

**_ To show/hide chains from UI - edit config file _**

# Main concepts

Bridge UI can talk to 3 different sets of validators and services:<br>
/testnet - for testnet validators and services<br>
/staging - for staging validators and services(mainnet)<br>
/ - for mainnet production validators and services

To active v3 bridge toggle flag in config file (currenly workig only for BSC, Multiversx, Polygon in testnet)

To look at someone's nfts - add ?checkWallet=[address] parameter to url string for example _https://staging.bridge.xp.network/staging?checkWallet=0x6449b68cc5675f6011e8DB681B142773A3157cb9_

All main buisness logic (transaction sending functions, approval functions, check balance functions, fee estimation functions) is inside xp.network(xpjs) library in corresponding chain helpers.

UI buissness logic adaptors for every chain helper inside src/models/chains.js file
Adaptors factory in src/models/bridge.js

To use chain adaptor in React component wrap it with (withServices) higher order component. See example in src/components/TransferBoard/Approval.jsx
This will allow to use same interface for any chain:

```
     //factory creates chain adaptor
     const fromChain = await bridge.getChain(from.nonce);
     //regarless of current chain same method
     await fromChain.preTransfer(...args)
```

For easy conditional rendering that depends on current departure chain - _src/components/NFTsBoard/hocs/index.jsx_.
Wrap your component with _withChains_ higher order component and it will know what to render. Or you can just use if statement for that.

**To find a component where fix is needed use VScode _Find in Folder_ and serach by class name**

# Possible errors after yarn upgrade xp.network and solution:

    Error:  "Invalid encrypted text received. " on click Hashpack wallet connectib button<br>
    Solution: need to go to yarn.lock and replace:

    ```
        crypto-js@4.1.1:
            version "4.1.1"
            resolved "https://registry.yarnpkg.com/crypto-js/-/crypto-js-4.1.1.tgz#9e485bcf03521041bd85844786b83fb7619736cf"
            integrity sha512-o2JlM7ydqd3Qk9CA0L4NL6mTzU2sdx96a+oOfPu8Mkl/PK51vSyoi8/rQ8NknZtk44vq15lmhAj9CIAGwgeWKw==

            crypto-js@^4.1.1:
            version "4.2.0"
            resolved "https://registry.yarnpkg.com/crypto-js/-/crypto-js-4.2.0.tgz#4d931639ecdfd12ff80e8186dba6af2c2e856631"
            integrity sha512-KALDyEYgpY+Rlob/iriUtjV6d5Eq+Y191A5g4UqLAi8CyGP9N1+FdVbkc1SxKc2r4YAYqG8JzO2KGL+AizD70Q==

    ```

    with :

```
crypto-js@4.1.1, crypto-js@^4.1.1:
    version "4.1.1"
    resolved "https://registry.yarnpkg.com/crypto-js/-/crypto-js-4.1.1.tgz#9e485bcf03521041bd85844786b83fb7619736cf"
    integrity sha512-o2JlM7ydqd3Qk9CA0L4NL6mTzU2sdx96a+oOfPu8Mkl/PK51vSyoi8/rQ8NknZtk44vq15lmhAj9CIAGwgeWKw==

```

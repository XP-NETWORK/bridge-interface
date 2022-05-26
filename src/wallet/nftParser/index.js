import {
    ADIVCATEAM_599068,
    ADIVCCTEAM_9ea546,
    ALETTLTEAM_8b4b7f,
    defaultMethod,
    tezosMethod,
    _8BITHEROES_d3022d,
} from "./parser";

// class NFT {
//     constructor(uri, native, collectionIdent, metaData) {
//         collectionIdent = this.collectionIdent;
//         native = this.native;
//         uri = this.uri;
//         metaData = this.metaData;
//     }
// }

export const returnParsedNFTObject = async (nft, index) => {
    // debugger;
    const { uri, native, collectionIdent } = nft;
    let metadata;
    let parsedNFT;
    switch (collectionIdent) {
        case "8BITHEROES-d3022d":
            metadata = await _8BITHEROES_d3022d(nft);
            parsedNFT =
                typeof metadata !== "string"
                    ? { uri, native, collectionIdent, ...metadata }
                    : { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADIVCATEAM-599068":
            metadata = await ADIVCATEAM_599068(nft);
            parsedNFT =
                typeof metadata !== "string"
                    ? { uri, native, collectionIdent, ...metadata }
                    : { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "KT1NEx6MX2GUEKMTX9ydyu8mn9WBNEz3QPEp":
            return tezosMethod(nft);
        case "ADIVCCTEAM-9ea546":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADRDCCTEAM-be19dc":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADRSCCTEAM-9ea546":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALETCCTEAM-c0cd06":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALEICCTEAM-c0cd06":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "AERMES-ac9886":
            metadata = { animation_url: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALETTLTEAM-8b4b7f":
            metadata = await ALETTLTEAM_8b4b7f(nft);
            parsedNFT =
                typeof metadata !== "string"
                    ? { uri, native, collectionIdent, ...metadata }
                    : { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADRDCATEAM-599068":
            metadata = { animation_url: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADRDMMTEAM-b35ff0":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ADRSTLTEAM-8b4b7f":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALEITLTEAM-8b4b7f":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALETCATEAM-599068":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ALEXCCLEGE-3ab35a":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDACCTEAM-c0cd06":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDACATEAM-599068":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDMCCTEAM-be19dc":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDAMMTEAM-b35ff0":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDATLTEAM-8b4b7f":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDMMTEAM-b35ff0":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDPCATEAM-599068":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDPCCTEAM-c0cd06":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        case "ANDTLTEAM-8b4b7f":
            metadata = { image: nft.uri };
            parsedNFT = { uri, native, collectionIdent, metadata };
            return parsedNFT;
        default:
            metadata = await defaultMethod(nft);
            parsedNFT =
                typeof metadata !== "string"
                    ? { uri, native, collectionIdent, ...metadata }
                    : { uri, native, collectionIdent, metadata };
            return parsedNFT;
    }
};

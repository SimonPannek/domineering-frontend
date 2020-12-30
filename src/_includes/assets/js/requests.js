async function groupInfo(groupId = 1) {
    return await request("getGroupInfo", {
        tumKennung: authObj.kennung,
        authenticationToken: authObj.token,
        groupId: groupId
    });
}

async function competitorInfo() {
    return await request("getCompetitorInfo", {
        tumKennung: authObj.kennung,
        authenticationToken: authObj.token
    });
}

async function boardInfoOwnGames(numPlaygrounds = 20) {
    return await request("getBoardInfoForOwnGames", {
        tumKennung: authObj.kennung,
        authenticationToken: authObj.token,
        numPlaygrounds: numPlaygrounds
    });
}

async function boardInfoTwoPlayer(numPlaygrounds = 20, againstKennung = "") {
    return await request("getBoardInfoForTwoPlayer", {
        tumKennung: authObj.kennung,
        authenticationToken: authObj.token,
        numPlaygrounds: numPlaygrounds,
        againstCompetitor: againstKennung
    });
}

import { usersRepository } from "../repositories/usersRepository.js";

export async function getUserId(req, res) {
  const userId = req.params.id;
  // const {userId} = res.locals.userId;
  try {
    const userInfoSearch = await usersRepository.getUser(userId)
    if (!userInfoSearch.rows[0]) return res.sendStatus(404)
    const userInfo = userInfoSearch.rows[0].json_build_object;

    //if the user has not created any urls, return empty array
    if (!userInfo.shortenedUrls[0][0].id) {
      userInfo.shortenedUrls = [];
    } else {
      userInfo.shortenedUrls = userInfo.shortenedUrls[0];
    }
    return res.status(200).send(userInfo);
  } catch (e) {
    console.log(e, "Erro no getUserId");
    return res.sendStatus(500);
  }
}

export async function getUsersRanking(req, res) {
  try {
    const usersInfoSearch = await usersRepository.getUsersRanking()
    return res.status(200).send(usersInfoSearch.rows);
  } catch (e) {
    console.log(e, "Erro no getUsersRanking");
    return res.sendStatus(500);
  }
}
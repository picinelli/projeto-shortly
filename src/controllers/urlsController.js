import { nanoid } from "nanoid";

import { urlsRepository } from "../repositories/urlsRepository.js";

export async function postUrl(req, res) {
  const user = res.locals.userId;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.postUrl(user.userId, url, shortUrl);
    return res.status(201).send({ shortUrl });
  } catch (e) {
    console.log(e, "Erro no postUrl");
    return res.sendStatus(500);
  }
}

export async function getUrl(req, res) {
  const urlId = req.params.id;
  try {
    const searchUrl = await urlsRepository.getUrl(urlId);
    const url = searchUrl.rows[0];

    if (!url) return res.sendStatus(404);
    return res.status(200).send(url);
  } catch (e) {
    console.log(e, "Erro no getUrl");
    return res.sendStatus(500);
  }
}

export async function openUrl(req, res) {
  const shortUrl = req.params.shortUrl;
  try {
    const urlSearchAndUpdate = await urlsRepository.getAndUpdateUrl(shortUrl);
    const urlData = urlSearchAndUpdate.rows[0];

    if (!urlData) return res.sendStatus(404);
    return res.redirect(200, urlData.url);
  } catch (e) {
    console.log(e, "Erro no openUrl");
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const urlId = req.params.id;
  const userData = res.locals.userId;
  try {
    const userSearch = await urlsRepository.getUrlOwner(userData.userId, urlId);
    const urlData = userSearch.rows[0];

    if (!urlData) return res.sendStatus(404)
    if (urlData.userId !== urlData.id) return res.sendStatus(401)

    await urlsRepository.deleteUrl(urlData.urlId)
    return res.sendStatus(204);
  } catch (e) {
    console.log(e, "Erro no deleteUrl");
    return res.sendStatus(500);
  }
}
